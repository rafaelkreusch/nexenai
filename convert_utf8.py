from pathlib import Path
path = Path('frontend/index.html')
text = path.read_text(encoding='utf-16')
path.write_text(text, encoding='utf-8')
