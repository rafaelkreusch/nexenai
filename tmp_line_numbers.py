from pathlib import Path
path = Path('frontend/colaboradores.html')
lines = path.read_text(encoding='utf-8').splitlines()
for i, line in enumerate(lines, 1):
    if '<style>' in line:
        print('style start', i)
    if 'class=" collab-hero\' in line:
 print('hero start', i)
