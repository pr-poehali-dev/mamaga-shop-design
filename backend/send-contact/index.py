import json
import smtplib

import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки с сайта VKORNE на почту владельца"""
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    email = body.get("email", "").strip()
    message = body.get("message", "").strip()

    if not name and not phone and not email:
        return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Заполните хотя бы одно поле"})}

    smtp_user = "anisim4ik-10@yandex.ru"
    smtp_password = os.environ["SMTP_PASSWORD"]

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Новая заявка с сайта VKORNE — {name or 'Без имени'}"
    msg["From"] = smtp_user
    msg["To"] = smtp_user

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0d0b08; color: #f5f0e8; padding: 32px; border-radius: 4px;">
      <h2 style="color: #c9a84c; font-size: 22px; margin-bottom: 24px;">Новая заявка с сайта VKORNE</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 10px 0; color: #c9a84c; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; width: 140px;">Имя</td><td style="padding: 10px 0; font-size: 15px;">{name or '—'}</td></tr>
        <tr><td style="padding: 10px 0; color: #c9a84c; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Телефон</td><td style="padding: 10px 0; font-size: 15px;">{phone or '—'}</td></tr>
        <tr><td style="padding: 10px 0; color: #c9a84c; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">E-mail</td><td style="padding: 10px 0; font-size: 15px;">{email or '—'}</td></tr>
        <tr><td style="padding: 10px 0; color: #c9a84c; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; vertical-align: top;">Сообщение</td><td style="padding: 10px 0; font-size: 15px;">{message or '—'}</td></tr>
      </table>
    </div>
    """

    msg.attach(MIMEText(html, "html"))

    with smtplib.SMTP_SSL("smtp.yandex.ru", 465) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, smtp_user, msg.as_string())

    return {"statusCode": 200, "headers": headers, "body": json.dumps({"ok": True})}