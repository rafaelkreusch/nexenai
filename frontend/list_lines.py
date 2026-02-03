from pathlib import Path
path = Path('colaboradores.html')
for idx, line in enumerate(path.read_text(encoding='utf-8', errors='ignore').splitlines(), 1):
    if 60 <= idx <= 120:
        print(f"{idx}:{line}")
