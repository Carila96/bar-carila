import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('guided final recommendation uses open-world Sonnet selection first', async () => {
  const source = await readFile(new URL('../public/assets/js/main.js', import.meta.url), 'utf8');
  assert.match(source, /getSelectionSystem/);
  assert.match(source, /barCarilaStage:forceRecommend\?'selection'/);
  assert.match(source, /maxTokens=forceRecommend\?320/);
  assert.match(source, /マスター外を含む実在する酒すべてから/);
  assert.match(source, /hydrateRecommendationDetails/);
  assert.match(source, /barCarilaStage:'details'/);
});

test('selection mode stays compact and does not append the large known-master list', async () => {
  const worker = await readFile(new URL('../src/worker.mjs', import.meta.url), 'utf8');
  const v19 = await readFile(new URL('../src/worker-v1.9.mjs', import.meta.url), 'utf8');
  assert.match(worker, /barCarilaStage !== 'selection'/);
  assert.match(worker, /delete body\.barCarilaStage/);
  assert.match(v19, /barCarilaStage === 'selection'/);
  assert.match(v19, /Math\.min\(Math\.max\(Number\(body\.max_tokens\)/);
  assert.match(v19, /既知マスターは候補の上限ではありません/);
});
