from pathlib import Path
text = Path('backend/app.py').read_text(encoding='utf-8')
needle = 'webhook_payload = admin_client.configure_webhook'
idx = text.index(needle)
line_no = text.count('\n', 0, idx) + 1
print('line', line_no)
print(text[idx-200:idx+300])
