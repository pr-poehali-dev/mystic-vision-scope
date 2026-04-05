import json
import os
import psycopg2

SCHEMA = os.environ.get('MAIN_DB_SCHEMA', 't_p78741689_mystic_vision_scope')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', '')

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
    'Content-Type': 'application/json',
}

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def check_auth(event):
    token = event.get('headers', {}).get('X-Admin-Token', '')
    return token == ADMIN_PASSWORD

def handler(event: dict, context) -> dict:
    """Админ API для управления концертами и настройками сайта BATRAI"""

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    method = event.get('httpMethod', 'GET')
    params = event.get('queryStringParameters') or {}
    action = params.get('action', '')
    body = {}
    if event.get('body'):
        body = json.loads(event['body'])

    # action=login
    if action == 'login' and method == 'POST':
        password = body.get('password', '')
        if password == ADMIN_PASSWORD and ADMIN_PASSWORD != '':
            return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'ok': True})}
        return {'statusCode': 401, 'headers': CORS_HEADERS, 'body': json.dumps({'ok': False, 'error': 'Неверный пароль'})}

    # action=data — получить все данные (публичный)
    if action == 'data' and method == 'GET':
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f'SELECT id, date_text, day_text, city, venue, ticket_url, sold, sort_order, time_text FROM {SCHEMA}.concerts ORDER BY sort_order')
        rows = cur.fetchall()
        concerts = [
            {'id': r[0], 'date': r[1], 'day': r[2], 'city': r[3], 'venue': r[4], 'ticketUrl': r[5], 'sold': r[6], 'sort_order': r[7], 'time': r[8]}
            for r in rows
        ]
        cur.execute(f'SELECT key, value FROM {SCHEMA}.site_settings')
        settings_rows = cur.fetchall()
        settings = {r[0]: r[1] for r in settings_rows}
        conn.close()
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'concerts': concerts, 'settings': settings})}

    if not check_auth(event):
        return {'statusCode': 401, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Unauthorized'})}

    # action=concerts POST — создать концерт
    if action == 'concerts' and method == 'POST':
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f'SELECT COALESCE(MAX(sort_order),0)+1 FROM {SCHEMA}.concerts')
        next_order = cur.fetchone()[0]
        cur.execute(
            f'INSERT INTO {SCHEMA}.concerts (date_text, day_text, city, venue, ticket_url, sold, sort_order, time_text) VALUES (%s,%s,%s,%s,%s,%s,%s,%s) RETURNING id',
            (body['date'], body['day'], body['city'], body['venue'], body['ticketUrl'], body.get('sold', False), next_order, body.get('time', ''))
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'ok': True, 'id': new_id})}

    # action=concerts PUT — обновить концерт
    if action == 'concerts' and method == 'PUT':
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f'UPDATE {SCHEMA}.concerts SET date_text=%s, day_text=%s, city=%s, venue=%s, ticket_url=%s, sold=%s, time_text=%s, updated_at=NOW() WHERE id=%s',
            (body['date'], body['day'], body['city'], body['venue'], body['ticketUrl'], body.get('sold', False), body.get('time', ''), body['id'])
        )
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'ok': True})}

    # action=concerts DELETE — удалить концерт
    if action == 'concerts' and method == 'DELETE':
        concert_id = params.get('id')
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f'DELETE FROM {SCHEMA}.concerts WHERE id=%s', (concert_id,))
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'ok': True})}

    # action=settings PUT — обновить настройки
    if action == 'settings' and method == 'PUT':
        conn = get_conn()
        cur = conn.cursor()
        for key, value in body.items():
            cur.execute(
                f'INSERT INTO {SCHEMA}.site_settings (key, value, updated_at) VALUES (%s,%s,NOW()) ON CONFLICT (key) DO UPDATE SET value=EXCLUDED.value, updated_at=NOW()',
                (key, value)
            )
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'ok': True})}

    return {'statusCode': 404, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Not found'})}