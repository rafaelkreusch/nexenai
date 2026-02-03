conn = sqlite3.connect('data/chat.db'
cur = conn.cursor() 
cur.execute('SELECT id, name, slug, uazapi_server_url, uazapi_admin_token, webhook_url FROM organization') 
print(cur.fetchall()) 
conn.close() 
