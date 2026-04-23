import json
import os
import hashlib
import time
import psycopg2

def get_db():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def check_auth(event):
    token = event.get('headers', {}).get('X-Authorization', '').replace('Bearer ', '')
    admin_password = os.environ.get('ADMIN_PASSWORD', '')
    valid_token = hashlib.sha256(f"{admin_password}{int(time.time() // 86400)}".encode()).hexdigest()
    return token == valid_token

def handler(event: dict, context) -> dict:
    """CRUD управление постами блога"""
    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Authorization',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    method = event.get('httpMethod')
    params = event.get('queryStringParameters') or {}

    if method == 'GET':
        conn = get_db()
        cur = conn.cursor()
        post_id = params.get('id')
        if post_id:
            cur.execute("SELECT id, title, content, excerpt, image_url, is_published, created_at FROM blog_posts WHERE id = %s", (post_id,))
            row = cur.fetchone()
            conn.close()
            if not row:
                return {'statusCode': 404, 'headers': cors_headers, 'body': json.dumps({'error': 'Не найдено'})}
            post = {'id': row[0], 'title': row[1], 'content': row[2], 'excerpt': row[3], 'image_url': row[4], 'is_published': row[5], 'created_at': str(row[6])}
            return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps(post)}

        is_admin = check_auth(event)
        if is_admin:
            cur.execute("SELECT id, title, content, excerpt, image_url, is_published, created_at FROM blog_posts ORDER BY created_at DESC")
        else:
            cur.execute("SELECT id, title, content, excerpt, image_url, is_published, created_at FROM blog_posts WHERE is_published = true ORDER BY created_at DESC")
        rows = cur.fetchall()
        conn.close()
        posts = [{'id': r[0], 'title': r[1], 'content': r[2], 'excerpt': r[3], 'image_url': r[4], 'is_published': r[5], 'created_at': str(r[6])} for r in rows]
        return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps(posts)}

    if not check_auth(event):
        return {'statusCode': 401, 'headers': cors_headers, 'body': json.dumps({'error': 'Нет доступа'})}

    body = json.loads(event.get('body') or '{}')

    if method == 'POST':
        conn = get_db()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO blog_posts (title, content, excerpt, image_url, is_published) VALUES (%s,%s,%s,%s,%s) RETURNING id",
            (body.get('title'), body.get('content'), body.get('excerpt'), body.get('image_url'), body.get('is_published', False))
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps({'ok': True, 'id': new_id})}

    if method == 'PUT':
        post_id = params.get('id') or body.get('id')
        conn = get_db()
        cur = conn.cursor()
        cur.execute(
            "UPDATE blog_posts SET title=%s, content=%s, excerpt=%s, image_url=%s, is_published=%s WHERE id=%s",
            (body.get('title'), body.get('content'), body.get('excerpt'), body.get('image_url'), body.get('is_published', False), post_id)
        )
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps({'ok': True})}

    if method == 'DELETE':
        post_id = params.get('id')
        conn = get_db()
        cur = conn.cursor()
        cur.execute("DELETE FROM blog_posts WHERE id=%s", (post_id,))
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps({'ok': True})}

    return {'statusCode': 405, 'headers': cors_headers, 'body': ''}
