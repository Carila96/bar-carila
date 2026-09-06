from pathlib import Path
p=Path('test/worker.test.mjs')
s=p.read_text(encoding='utf-8')
old="assert.equal((html.match(/showChatError\\(e(?:,'counter')?\\)/g)||[]).length, 1);"
new="assert.equal((html.match(/showChatError\\(e(?:,'counter')?\\)/g)||[]).length, 2);"
if old not in s:
    raise SystemExit('showChatError assertion not found')
p.write_text(s.replace(old,new,1),encoding='utf-8')
