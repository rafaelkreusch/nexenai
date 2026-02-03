from pathlib import Path
path = Path('app.js')
data = path.read_text(encoding='utf-8')
pos = data.index('async function enterWorkspace()')
print(repr(data[pos:pos+120]))
