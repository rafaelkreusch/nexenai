from pathlib import Path
text = Path('frontend/index.html').read_text(encoding='utf-16')
print(text.lower().count('<div id="appview"'))
