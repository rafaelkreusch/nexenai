from pathlib import Path
files = [''index.html'', ''app.js'', ''styles.css'']
for name in files:
    path = Path(name)
    data = path.read_bytes()
    try:
        text = data.decode('utf-8')
    except UnicodeDecodeError:
        text = data.decode('cp1252')
    path.write_text(text, encoding='utf-8')
