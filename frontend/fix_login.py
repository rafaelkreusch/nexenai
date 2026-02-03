from pathlib import Path
path = Path('app.js')
text = path.read_text(encoding='utf-8')
old = """  } catch (error) {\n    registerErrorEl.textContent = error.message;\n  }\n\nasync function enterWorkspace() {\n});"""
new = """  } catch (error) {\n    registerErrorEl.textContent = error.message;\n  }\n\n});\n\nasync function enterWorkspace() {"""
if old not in text:
    raise SystemExit('pattern not found')
text = text.replace(old, new, 1)
path.write_text(text, encoding='utf-8')
