from pathlib import Path
path = Path('colaboradores.html')
for idx, line in enumerate(path.read_text(encoding='utf-8', errors='ignore').splitlines(), 1):
    if 150 <= idx <= 250:
        print(f"{idx}:{line}")
