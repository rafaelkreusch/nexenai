from pathlib import Path
import re
path = Path('frontend/styles.css')
text = path.read_text()
old_tag = re.compile(r"\.tag-chip \{.*?\}\s*\.tag-chip::before \{.*?\}", re.DOTALL)
new_block = '''.tag-chip {

  font-size: 0.75rem;

  font-weight: 600;

  padding: 0.25rem 0.65rem;

  border-radius: 999px;

  background: var(--tag-color, #4f46e5);

  color: #ffffff;

  border: 1px solid rgba(255, 255, 255, 0.35);

  text-transform: none;

  display: inline-flex;

  align-items: center;

  gap: 0.35rem;

  box-shadow: 0 4px 14px rgba(21, 22, 36, 0.5);

}

.tag-chip::before {

  content: "";

  width: 8px;

  height: 8px;

  border-radius: 50%;

  background: #ffffff;

  border: 1px solid rgba(255, 255, 255, 0.6);

}
'''
if not old_tag.search(text):
    raise SystemExit('pattern not found')
text = old_tag.sub(new_block, text, count=1)
path.write_text(text)
