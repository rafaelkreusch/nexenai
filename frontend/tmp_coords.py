from pathlib import Path
text = Path('index.html').read_text(encoding='utf-8')
start = text.index('<div id="loginView" class="wrap">')
end = text.index('<div id="appView" class="hidden">', start)
print(start, end)
