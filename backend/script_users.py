import sqlite3
conn=sqlite3.connect('data/chat.db')
cur=conn.cursor()
for row in cur.execute("SELECT username, password_hash, organization_id, is_active FROM user"):
    print(row)
for row in cur.execute("SELECT id, slug FROM organization"):
    print(row)
