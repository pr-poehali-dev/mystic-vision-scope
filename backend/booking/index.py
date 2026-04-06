import json
import os
import urllib.request

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
}

def send_telegram(text: str):
    token = os.environ['TELEGRAM_BOT_TOKEN']
    chat_id = os.environ['TELEGRAM_CHAT_ID']
    url = f'https://api.telegram.org/bot{token}/sendMessage'
    data = json.dumps({'chat_id': chat_id, 'text': text, 'parse_mode': 'HTML'}).encode()
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
    urllib.request.urlopen(req)

def handler(event: dict, context) -> dict:
    """Приём заявок на корпоративы и частные мероприятия BATRAI"""

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    if event.get('httpMethod') != 'POST':
        return {'statusCode': 405, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Method not allowed'})}

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    city = body.get('city', '').strip()
    date = body.get('date', '').strip()
    event_type = body.get('event_type', '').strip()
    comment = body.get('comment', '').strip()

    if not name or not phone:
        return {'statusCode': 400, 'headers': CORS_HEADERS, 'body': json.dumps({'error': 'Заполните имя и телефон'})}

    text = (
        f'🎤 <b>Новая заявка на мероприятие</b>\n\n'
        f'👤 <b>Имя:</b> {name}\n'
        f'📞 <b>Телефон:</b> {phone}\n'
        f'🏙 <b>Город:</b> {city or "—"}\n'
        f'📅 <b>Дата:</b> {date or "—"}\n'
        f'🎉 <b>Тип:</b> {event_type or "—"}\n'
        f'💬 <b>Комментарий:</b> {comment or "—"}'
    )

    send_telegram(text)
    return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': json.dumps({'ok': True})}
