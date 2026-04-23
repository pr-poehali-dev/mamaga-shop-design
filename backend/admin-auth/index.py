import json
import os
import hashlib
import time

def handler(event: dict, context) -> dict:
    """Авторизация администратора сайта"""
    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Authorization',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    if event.get('httpMethod') == 'POST':
        body = json.loads(event.get('body') or '{}')
        password = body.get('password', '')
        admin_password = os.environ.get('ADMIN_PASSWORD', '')

        if password == admin_password:
            token = hashlib.sha256(f"{admin_password}{int(time.time() // 86400)}".encode()).hexdigest()
            return {
                'statusCode': 200,
                'headers': cors_headers,
                'body': json.dumps({'ok': True, 'token': token})
            }
        return {
            'statusCode': 401,
            'headers': cors_headers,
            'body': json.dumps({'ok': False, 'error': 'Неверный пароль'})
        }

    if event.get('httpMethod') == 'GET':
        token = event.get('headers', {}).get('X-Authorization', '').replace('Bearer ', '')
        admin_password = os.environ.get('ADMIN_PASSWORD', '')
        valid_token = hashlib.sha256(f"{admin_password}{int(time.time() // 86400)}".encode()).hexdigest()
        if token == valid_token:
            return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps({'ok': True})}
        return {'statusCode': 401, 'headers': cors_headers, 'body': json.dumps({'ok': False})}

    return {'statusCode': 405, 'headers': cors_headers, 'body': ''}
