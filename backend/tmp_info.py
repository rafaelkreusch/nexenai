import sqlite3
conn=sqlite3.connect("data/chat.db")
cur=conn.cursor()
print(cur.execute("PRAGMA table_info('organization')").fetchall())
