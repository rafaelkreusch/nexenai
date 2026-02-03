from pathlib import Path
path = Path('collab.js')
for idx, line in enumerate(path.read_text(encoding='utf-8').splitlines(), 1):
    if 1 <= idx <= 80:
        print(f"{idx}:{line}")
