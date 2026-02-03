from pathlib import Path
path = Path('frontend/styles.css')
lines = path.read_text(encoding='utf-16-le').splitlines(True)
start = next(i for i, line in enumerate(lines) if line.strip().startswith('.auth-container {'))
cta_start = next(j for j in range(start, len(lines)) if lines[j].strip().startswith('.cta-panel {'))
count = 0
end = None
for k in range(cta_start, len(lines)):
    count += lines[k].count('{')
    count -= lines[k].count('}')
    if count == 0:
        end = k
        break
if end is None:
    raise SystemExit('end not found')
new_block = '''.auth-container {\r\n  width: min(780px, 96vw);\r\n  position: relative;\r\n  z-index: 1;\r\n  margin: 0 auto;\r\n}\r\n\r\n.auth-card {\r\n  width: 100%;\r\n  max-width: 640px;\r\n  border-radius: 28px;\r\n  overflow: hidden;\r\n  background: #fff;\r\n  box-shadow: 0 25px 55px rgba(15, 23, 42, 0.25);\r\n  display: grid;\r\n  grid-template-columns: 1fr;\r\n  min-height: auto;\r\n}\r\n\r\n.login-panel {\r\n  padding: clamp(1.75rem, 3vw, 2.5rem);\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 1.25rem;\r\n  background: #ffffff;\r\n}\r\n\r\n.cta-panel {\r\n  padding: clamp(1.5rem, 2vw, 2rem);\r\n  background: #f5f4ff;\r\n  color: #1d1a43;\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 0.75rem;\r\n  align-items: flex-start;\r\n  border-top: 1px solid rgba(75, 71, 120, 0.15);\r\n}\r\n'''
new_lines = new_block.splitlines(True)
lines = lines[:start] + new_lines + lines[end+1:]
path.write_text(''.join(lines), encoding='utf-16-le')
