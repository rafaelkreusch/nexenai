from pathlib import Path
text = Path('frontend/index.html').read_text(encoding='utf-16')
lower = text.lower()
login_start = lower.index('<div id="loginview"')
app_start = lower.index('<div id="appview"', login_start)
print(text[login_start:app_start])
