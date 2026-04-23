import json
import os
import hashlib
import time
import base64
import boto3
import uuid
import psycopg2

def get_db():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def check_auth(event):
    token = event.get('headers', {}).get('X-Authorization', '').replace('Bearer ', '')
    admin_password = os.environ.get('ADMIN_PASSWORD', '')
    valid_token = hashlib.sha256(f"{admin_password}{int(time.time() // 86400)}".encode()).hexdigest()
    return token == valid_token

def handler(event: dict, context) -> dict:
    """Настройки сайта, загрузка изображений и управление галереями материалов"""
    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Authorization',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    params = event.get('queryStringParameters') or {}
    action = params.get('action', 'settings')

    # GET настройки (публично)
    if event.get('httpMethod') == 'GET' and action == 'settings':
        conn = get_db()
        cur = conn.cursor()
        cur.execute("SELECT key, value FROM site_settings")
        rows = cur.fetchall()
        conn.close()
        settings = {r[0]: r[1] for r in rows}
        return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps(settings)}

    # GET фото материала (публично)
    if event.get('httpMethod') == 'GET' and action == 'material_photos':
        slug = params.get('slug', '')
        conn = get_db()
        cur = conn.cursor()
        cur.execute(
            "SELECT id, url, caption, sort_order, price, description FROM material_photos WHERE material_slug = %s ORDER BY sort_order, id",
            (slug,)
        )
        rows = cur.fetchall()
        conn.close()
        photos = [{'id': r[0], 'url': r[1], 'caption': r[2], 'sort_order': r[3], 'price': r[4] or 0, 'description': r[5] or ''} for r in rows]
        return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps(photos)}

    if not check_auth(event):
        return {'statusCode': 401, 'headers': cors_headers, 'body': json.dumps({'error': 'Нет доступа'})}

    body = json.loads(event.get('body') or '{}')

    # POST настройки
    if event.get('httpMethod') == 'POST' and action == 'settings':
        conn = get_db()
        cur = conn.cursor()
        for key, value in body.items():
            cur.execute("INSERT INTO site_settings (key, value) VALUES (%s,%s) ON CONFLICT (key) DO UPDATE SET value=%s", (key, value, value))
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps({'ok': True})}

    # POST загрузка изображения
    if event.get('httpMethod') == 'POST' and action == 'upload':
        image_data = body.get('image')
        content_type = body.get('content_type', 'image/jpeg')
        folder = body.get('folder', 'products')

        if not image_data:
            return {'statusCode': 400, 'headers': cors_headers, 'body': json.dumps({'error': 'Нет изображения'})}

        if ',' in image_data:
            image_data = image_data.split(',')[1]

        image_bytes = base64.b64decode(image_data)
        ext = content_type.split('/')[-1]
        if ext in ('jpeg', 'jpg'):
            ext = 'jpg'
        filename = f"{folder}/{uuid.uuid4()}.{ext}"

        s3 = boto3.client(
            's3',
            endpoint_url='https://bucket.poehali.dev',
            aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
            aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
        )
        s3.put_object(Bucket='files', Key=filename, Body=image_bytes, ContentType=content_type)
        cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{filename}"

        return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps({'ok': True, 'url': cdn_url})}

    # POST добавить фото материала
    if event.get('httpMethod') == 'POST' and action == 'add_material_photo':
        slug = body.get('slug')
        image_data = body.get('image')
        content_type = body.get('content_type', 'image/jpeg')
        caption = body.get('caption', '')
        price = body.get('price', 0) or 0
        description = body.get('description', '') or ''

        if not slug or not image_data:
            return {'statusCode': 400, 'headers': cors_headers, 'body': json.dumps({'error': 'Нет slug или изображения'})}

        if ',' in image_data:
            image_data = image_data.split(',')[1]

        image_bytes = base64.b64decode(image_data)
        ext = content_type.split('/')[-1]
        if ext in ('jpeg',):
            ext = 'jpg'
        filename = f"materials/{slug}/{uuid.uuid4()}.{ext}"

        s3 = boto3.client(
            's3',
            endpoint_url='https://bucket.poehali.dev',
            aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
            aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
        )
        s3.put_object(Bucket='files', Key=filename, Body=image_bytes, ContentType=content_type)
        cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{filename}"

        conn = get_db()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO material_photos (material_slug, url, caption, price, description) VALUES (%s, %s, %s, %s, %s) RETURNING id",
            (slug, cdn_url, caption, price, description)
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        conn.close()

        return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps({'ok': True, 'id': new_id, 'url': cdn_url})}

    # PUT обновить поля фото материала (цена, описание, подпись)
    if event.get('httpMethod') == 'PUT' and action == 'material_photo':
        photo_id = params.get('id')
        if not photo_id:
            return {'statusCode': 400, 'headers': cors_headers, 'body': json.dumps({'error': 'Нет id'})}

        caption = body.get('caption', '')
        price = body.get('price', 0) or 0
        description = body.get('description', '') or ''

        conn = get_db()
        cur = conn.cursor()
        cur.execute(
            "UPDATE material_photos SET caption=%s, price=%s, description=%s WHERE id=%s",
            (caption, price, description, photo_id)
        )
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps({'ok': True})}

    # DELETE удалить фото материала
    if event.get('httpMethod') == 'DELETE' and action == 'material_photo':
        photo_id = params.get('id')
        if not photo_id:
            return {'statusCode': 400, 'headers': cors_headers, 'body': json.dumps({'error': 'Нет id'})}

        conn = get_db()
        cur = conn.cursor()
        cur.execute("DELETE FROM material_photos WHERE id = %s", (photo_id,))
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps({'ok': True})}

    return {'statusCode': 405, 'headers': cors_headers, 'body': ''}
