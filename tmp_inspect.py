from pathlib import Path
text = Path('backend/app.py').read_text(encoding='utf-8')
keyword = 'configure_webhook('
idx = text.index(keyword)
print(repr(text[idx-120:idx+200]))
