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
    """CRUD управление товарами каталога"""
    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Authorization',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers, 'body': ''}

    method = event.get('httpMethod')
    params = event.get('queryStringParameters') or {}

    # GET — список товаров (публичный) или один товар
    if method == 'GET':
        conn = get_db()
        cur = conn.cursor()
        product_id = params.get('id')
        if product_id:
            cur.execute("SELECT id, title, description, price, material, style, image_url, is_visible, created_at FROM products WHERE id = %s", (product_id,))
            row = cur.fetchone()
            conn.close()
            if not row:
                return {'statusCode': 404, 'headers': cors_headers, 'body': json.dumps({'error': 'Не найдено'})}
            product = {'id': row[0], 'title': row[1], 'description': row[2], 'price': row[3], 'material': row[4], 'style': row[5], 'image_url': row[6], 'is_visible': row[7], 'created_at': str(row[8])}
            return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps(product)}
        
        is_admin = check_auth(event)
        if is_admin:
            cur.execute("SELECT id, title, description, price, material, style, image_url, is_visible, created_at FROM products ORDER BY created_at DESC")
        else:
            cur.execute("SELECT id, title, description, price, material, style, image_url, is_visible, created_at FROM products WHERE is_visible = true ORDER BY created_at DESC")
        rows = cur.fetchall()
        conn.close()
        products = [{'id': r[0], 'title': r[1], 'description': r[2], 'price': r[3], 'material': r[4], 'style': r[5], 'image_url': r[6], 'is_visible': r[7], 'created_at': str(r[8])} for r in rows]
        return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps(products)}

    if not check_auth(event):
        return {'statusCode': 401, 'headers': cors_headers, 'body': json.dumps({'error': 'Нет доступа'})}

    body = json.loads(event.get('body') or '{}')

    # POST — создать товар
    if method == 'POST':
        conn = get_db()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO products (title, description, price, material, style, image_url, is_visible) VALUES (%s,%s,%s,%s,%s,%s,%s) RETURNING id",
            (body.get('title'), body.get('description'), body.get('price'), body.get('material'), body.get('style'), body.get('image_url'), body.get('is_visible', True))
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps({'ok': True, 'id': new_id})}

    # PUT — обновить товар
    if method == 'PUT':
        product_id = params.get('id') or body.get('id')
        conn = get_db()
        cur = conn.cursor()
        cur.execute(
            "UPDATE products SET title=%s, description=%s, price=%s, material=%s, style=%s, image_url=%s, is_visible=%s WHERE id=%s",
            (body.get('title'), body.get('description'), body.get('price'), body.get('material'), body.get('style'), body.get('image_url'), body.get('is_visible', True), product_id)
        )
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps({'ok': True})}

    # DELETE — удалить товар
    if method == 'DELETE':
        product_id = params.get('id')
        conn = get_db()
        cur = conn.cursor()
        cur.execute("DELETE FROM products WHERE id=%s", (product_id,))
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': cors_headers, 'body': json.dumps({'ok': True})}

    return {'statusCode': 405, 'headers': cors_headers, 'body': ''}
