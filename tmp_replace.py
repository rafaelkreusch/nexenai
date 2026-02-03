from pathlib import Path
path = Path('frontend/collab.js')
lines = path.read_text().splitlines()
lines = [line for line in lines if 'collabOrgCount' not in line and 'collabReadyCount' not in line]
idx = next((i for i, line in enumerate(lines) if 'const collabOrgHint' in line), None)
if idx is None:
    raise SystemExit('collabOrgHint not found')
insert = [
    'const collabUpdatedAt = document.getElementById( collabUpdatedAt);',
    'const summaryOrgCount = document.getElementById(summaryOrgCount);',
    'const summaryOrgActive = document.getElementById(summaryOrgActive);',
    'const summaryUserCount = document.getElementById(summaryUserCount);',
    'const summaryMessagesCount = document.getElementById(summaryMessagesCount);',
    'const summaryMessagesGrowth = document.getElementById(summaryMessagesGrowth);',
    'const summaryGrowthRate = document.getElementById(summaryGrowthRate);',
    'const orgSearchInput = document.getElementById(orgSearchInput);',
]
lines = lines[:idx+1] + insert + lines[idx+1:]
path.write_text('\r\n'.join(lines) + '\r\n')
