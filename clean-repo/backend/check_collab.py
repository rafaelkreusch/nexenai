import sqlite3
conn=sqlite3.connect('data/chat.db')
cur=conn.cursor()
cur.execute("SELECT username, organization_id, password_hash FROM user WHERE username='colaborador'")
print(cur.fetchall())
