from pathlib import Path
p=Path('test/worker.test.mjs')
s=p.read_text()
s=s.replace("    assert.deepEqual(JSON.parse(init.body), requestBody);", "    assert.deepEqual(JSON.parse(init.body), { ...requestBody, system: [{ type: 'text', text: requestBody.system, cache_control: { type: 'ephemeral' } }] });")
s=s.replace("  assert.equal((html.match(/showChatError\\(e(?:,'counter')?\\)/g)||[]).length, 2);", "  assert.equal((html.match(/showChatError\\(e(?:,'counter')?\\)/g)||[]).length, 1);")
p.write_text(s)
