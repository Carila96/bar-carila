import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('diagnostic page isolates system and guided-history failure modes', async () => {
  const html = await readFile(new URL('../public/diagnostic.html', import.meta.url), 'utf8');
  assert.match(html, /4段階診断を実行/);
  assert.match(html, /A 最小SYSTEM \+ 最小履歴/);
  assert.match(html, /B 本番SYSTEM \+ 最小履歴/);
  assert.match(html, /C 最小SYSTEM \+ 実際の選択式履歴/);
  assert.match(html, /D 本番SYSTEM \+ 実際の選択式履歴（本番相当）/);
  assert.match(html, /fetch\('\/assets\/js\/main\.js',\{cache:'no-store'\}\)/);
  assert.match(html, /const GUIDED_MESSAGES=/);
  assert.match(html, /model:'claude-sonnet-5'/);
  assert.match(html, /maxTokens/);
  assert.match(html, /result\.usage=data\.usage/);
  assert.match(html, /result\.stopReason=data\.stop_reason/);
});
