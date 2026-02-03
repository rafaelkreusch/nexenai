import sqlite3
conn=sqlite3.connect('data/chat.db')
cur=conn.cursor()
print(cur.execute("SELECT name FROM sqlite_master WHERE type='table';").fetchall())
cur.execute("PRAGMA table_info('organization')")
print(cur.fetchall())
