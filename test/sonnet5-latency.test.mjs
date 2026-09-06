import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('Sonnet 5 recommendation requests disable adaptive thinking for low-latency BarCarila output', async () => {
  const source = await readFile(new URL('../src/worker-v1.9.mjs', import.meta.url), 'utf8');
  assert.match(source, /body\.model === 'claude-sonnet-5'/);
  assert.match(source, /body\.thinking = \{ type: 'disabled' \}/);
});
