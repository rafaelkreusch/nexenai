from pathlib import Path
path = Path('frontend/index.html')
text = path.read_text(encoding='utf-8')
old = "        #loginView .brand-logo {\n          width: 150px;\n          height: 120px;\n          object-fit: contain;\n        }\n"
if old not in text:
    raise SystemExit('old block not found')
new = "        #loginView .brand-logo {\n          width: 150px;\n          height: 120px;\n          object-fit: contain;\n          max-height: 150px;\n          max-width: 150px;\n        }\n"
text = text.replace(old, new, 1)
path.write_text(text, encoding='utf-8')
