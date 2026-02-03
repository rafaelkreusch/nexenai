from pathlib import Path
path = Path('backend/app.py')
text = path.read_text(encoding='utf-8')
old = "                webhook_payload = admin_client.configure_webhook(\n                    url=webhook_target_url,\n                    events=WEBHOOK_EVENTS,\n                    exclude_messages=WEBHOOK_EXCLUDE_MESSAGES,\n                )\n"
new = "                webhook_payload = admin_client.configure_webhook(\n                    url=webhook_target_url,\n                    events=WEBHOOK_EVENTS,\n                    exclude_messages=WEBHOOK_EXCLUDE_MESSAGES,\n                    instance_token=token,\n                )\n"
if old not in text:
    raise SystemExit('pattern not found for webhooks call')
text = text.replace(old, new, 1)
path.write_text(text, encoding='utf-8')
