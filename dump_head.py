from pathlib import Path
text = Path('frontend/index.html').read_text(encoding='utf-16')
start = text.find('<style>\n      button.reminder-trigger')
end = text.find('</style>', start)
print('start', start, 'end', end)
print(text[start:end + len('</style>')])
