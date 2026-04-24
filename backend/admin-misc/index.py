import json
import os
import hashlib
import time
import base64
import boto3
import uuid
import psycopg2
import urllib.request
import urllib.parse
import urllib.error
import re


def get_db():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def check_auth(event):
    token = event.get('headers', {}).get('X-Authorization', '').replace('Bearer ', '')
    admin_password = os.environ.get('ADMIN_PASSWORD', '')
    valid_token = hashlib.sha256(f"{admin_password}{int(time.time() // 86400)}".encode()).hexdigest()
    return token == valid_token


# ── AUTOPOST ──────────────────────────────────────────────────────────────────

def post_to_telegram(text: str, image_url: str | None) -> dict:
    """Публикует пост в Telegram-канал через бота."""
    bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
    channel_id = os.environ.get('TELEGRAM_CHANNEL_ID', '')
    if not bot_token or not channel_id:
        return {'ok': False, 'error': 'Telegram не настроен'}

    base = f"https://api.telegram.org/bot{bot_token}"
    if image_url:
        url = f"{base}/sendPhoto"
        payload = {'chat_id': channel_id, 'photo': image_url, 'caption': text, 'parse_mode': 'HTML'}
    else:
        url = f"{base}/sendMessage"
        payload = {'chat_id': channel_id, 'text': text, 'parse_mode': 'HTML'}

    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            result = json.loads(resp.read())
            return {'ok': result.get('ok', False)}
    except urllib.error.HTTPError as e:
        return {'ok': False, 'error': e.read().decode('utf-8')}
    except Exception as e:
        return {'ok': False, 'error': str(e)}


def upload_photo_to_vk(image_url: str, group_id: str, token: str) -> str | None:
    """Загружает фото по URL на серверы ВК и возвращает attachment-строку."""
    params = urllib.parse.urlencode({'group_id': group_id, 'access_token': token, 'v': '5.131'})
    with urllib.request.urlopen(f"https://api.vk.com/method/photos.getWallUploadServer?{params}", timeout=10) as r:
        data = json.loads(r.read())
    upload_url = data.get('response', {}).get('upload_url')
    if not upload_url:
        return None

    with urllib.request.urlopen(image_url, timeout=15) as img_resp:
        img_bytes = img_resp.read()
        content_type = img_resp.headers.get('Content-Type', 'image/jpeg')

    boundary = '----VKBoundary' + hashlib.md5(img_bytes[:64]).hexdigest()
    ext = content_type.split('/')[-1].replace('jpeg', 'jpg')
    body = (
        f'--{boundary}\r\nContent-Disposition: form-data; name="photo"; filename="photo.{ext}"\r\n'
        f'Content-Type: {content_type}\r\n\r\n'
    ).encode() + img_bytes + f'\r\n--{boundary}--\r\n'.encode()

    req2 = urllib.request.Request(upload_url, data=body,
                                  headers={'Content-Type': f'multipart/form-data; boundary={boundary}'})
    with urllib.request.urlopen(req2, timeout=20) as r2:
        upload_result = json.loads(r2.read())

    save_params = urllib.parse.urlencode({
        'group_id': group_id,
        'photo': upload_result.get('photo', ''),
        'server': upload_result.get('server', ''),
        'hash': upload_result.get('hash', ''),
        'access_token': token,
        'v': '5.131',
    })
    with urllib.request.urlopen(f"https://api.vk.com/method/photos.saveWallPhoto?{save_params}", timeout=10) as r3:
        save_result = json.loads(r3.read())

    photos = save_result.get('response', [])
    if not photos:
        return None
    p = photos[0]
    return f"photo{p['owner_id']}_{p['id']}"


def post_to_vk(text: str, image_url: str | None) -> dict:
    """Публикует пост в группу ВКонтакте."""
    token = os.environ.get('VK_ACCESS_TOKEN', '')
    group_id = os.environ.get('VK_GROUP_ID', '')
    if not token or not group_id:
        return {'ok': False, 'error': 'ВКонтакте не настроен'}

    attachments = ''
    if image_url:
        try:
            attachment = upload_photo_to_vk(image_url, group_id, token)
            if attachment:
                attachments = attachment
        except Exception:
            pass

    params_dict = {
        'owner_id': f'-{group_id}',
        'from_group': '1',
        'message': text,
        'access_token': token,
        'v': '5.131',
    }
    if attachments:
        params_dict['attachments'] = attachments

    req = urllib.request.Request(
        f"https://api.vk.com/method/wall.post?{urllib.parse.urlencode(params_dict)}"
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            result = json.loads(resp.read())
            if 'error' in result:
                return {'ok': False, 'error': result['error'].get('error_msg', 'VK error')}
            return {'ok': True, 'post_id': result.get('response', {}).get('post_id')}
    except Exception as e:
        return {'ok': False, 'error': str(e)}


def handle_autopost(body: dict) -> dict:
    """Формирует текст поста и рассылает в Telegram + ВК."""
    title = body.get('title', '').strip()
    description = body.get('description', '').strip()
    price = body.get('price')
    material = body.get('material', '').strip()
    style = body.get('style', '').strip()
    image_url = body.get('image_url', '').strip() or None
    caption = body.get('caption', '').strip()
    site_url = body.get('site_url', 'https://vkorne.space').strip()

    if title:
        lines = [f'<b>{title}</b>']
        if description:
            lines.append(description)
        if material or style:
            lines.append(f'<i>{" · ".join(filter(None, [material, style]))}</i>')
        if price:
            lines.append(f'💰 {int(price):,} ₽'.replace(',', '\u00a0'))
        lines.append(f'\n🌿 <a href="{site_url}">vkorne.space</a>')
        text_html = '\n'.join(lines)
    elif caption:
        lines = [f'<b>{caption}</b>']
        if description:
            lines.append(description)
        if price:
            lines.append(f'💰 {int(price):,} ₽'.replace(',', '\u00a0'))
        lines.append(f'\n🌿 <a href="{site_url}">vkorne.space</a>')
        text_html = '\n'.join(lines)
    else:
        return {'ok': False, 'error': 'Нет данных для поста'}

    # plain text для ВК (без HTML-тегов)
    text_plain = re.sub(r'<[^>]+>', '', text_html)

    results = {
        'telegram': post_to_telegram(text_html, image_url),
        'vk': post_to_vk(text_plain, image_url),
    }
    all_ok = all(r.get('ok') for r in results.values())
    return {'ok': all_ok, 'results': results}


# ── MAIN HANDLER ──────────────────────────────────────────────────────────────

def handler(event: dict, context) -> dict:
    """Настройки сайта, загрузка изображений, галереи материалов и автопостинг в соцсети."""
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

    # POST автопостинг в соцсети
    if event.get('httpMethod') == 'POST' and action == 'autopost':
        result = handle_autopost(body)
        return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps(result)}

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

    # PUT обновить поля фото материала
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
