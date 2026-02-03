from pathlib import Path
text = Path('frontend/colaboradores.html').read_text(encoding='utf-8')
for i, line in enumerate(text.splitlines(), 1):
    if i > 80:
        break
    print(f"{i}: {line}")
