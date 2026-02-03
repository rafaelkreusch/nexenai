from pathlib import Path
text = Path('frontend/index.html').read_text(encoding='cp1252')
start = text.index('            </form>')
end = text.index('<div class=\"right\">', start)
print(repr(text[start:end]))
