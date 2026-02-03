from pathlib import Path
text = Path('frontend/collab.js').read_text(encoding='utf-8')
print(repr(text[-120:]))
