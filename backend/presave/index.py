"""Сохранение email пресейва для трека Batrai"""
import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    if event.get("httpMethod") == "GET":
        conn = psycopg2.connect(os.environ["DATABASE_URL"])
        cur = conn.cursor()
        cur.execute("SELECT COUNT(*) FROM presaves WHERE track = 'Пускай'")
        count = cur.fetchone()[0]
        cur.close()
        conn.close()
        return {"statusCode": 200, "headers": headers, "body": json.dumps({"count": count})}

    if event.get("httpMethod") == "POST":
        body = json.loads(event.get("body") or "{}")
        email = body.get("email", "").strip().lower()

        if not email or "@" not in email:
            return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Некорректный email"})}

        conn = psycopg2.connect(os.environ["DATABASE_URL"])
        cur = conn.cursor()
        try:
            cur.execute(
                "INSERT INTO presaves (email, track) VALUES (%s, %s)",
                (email, "Пускай")
            )
            conn.commit()
            message = "success"
        except psycopg2.errors.UniqueViolation:
            conn.rollback()
            message = "already"
        finally:
            cur.close()
            conn.close()

        return {"statusCode": 200, "headers": headers, "body": json.dumps({"status": message})}

    return {"statusCode": 405, "headers": headers, "body": ""}
