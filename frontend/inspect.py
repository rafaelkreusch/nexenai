from pathlib import Path
path = Path('app.js')
data = path.read_text(encoding='utf-8')
start = data.index('registerErrorEl.textContent')
end = data.index('async function enterWorkspace', start)
segment = data[start:end+25]
print(repr(segment))
