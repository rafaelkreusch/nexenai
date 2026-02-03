from pathlib import Path
path=Path('app.js')
data=path.read_text(encoding='utf-8')
needle='\n\nasync function enterWorkspace()'
replacement='\n\n});\n\nasync function enterWorkspace()'
if needle not in data:
    raise SystemExit('needle missing')
data=data.replace(needle, replacement, 1)
path.write_text(data, encoding='utf-8')
