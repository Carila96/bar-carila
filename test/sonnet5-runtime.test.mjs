import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('recommendation runtime uses Claude Sonnet 5 end to end', async () => {
  const worker = await readFile(new URL('../src/worker.mjs', import.meta.url), 'utf8');
  const client = await readFile(new URL('../public/assets/js/main.js', import.meta.url), 'utf8');

  assert.match(worker, /ALLOWED_MODELS = new Set\(\['claude-sonnet-5'/);
  assert.match(worker, /body\.model === 'claude-sonnet-5'/);
  assert.match(client, /const RECOMMEND_MODEL='claude-sonnet-5';/);
});
