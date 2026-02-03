from pathlib import Path
text = Path('frontend/index.html').read_text(encoding='latin-1')
start = text.index('            </form>')
end = text.index('<div class="right">', start)
print(text[start:end])
print(repr(text[start:end]))
