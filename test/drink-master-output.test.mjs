import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const source = fs.readFileSync(new URL('../src/worker.mjs', import.meta.url), 'utf8');

test('Sonnet can omit D1-backed fixed copy before model output', () => {
  assert.match(source, /barCarilaLeanOutputInstruction/);
  assert.match(source, /drink\.rarity・drink\.description・drink\.trivia は出力しない/);
  assert.match(source, /DRINK_COPY_SEED\.map/);
  assert.match(source, /useDrinkMasterLeanOutput = await ensureDrinkMasterTables/);
  assert.match(source, /effectiveSystem/);
});

test('D1 enrichment still restores fixed recommendation fields', () => {
  assert.match(source, /enrichBarCarilaRecommendation/);
  assert.match(source, /parsed\.drink\.rarity = row\.japan_rarity_score/);
  assert.match(source, /parsed\.drink\.description = row\.short_description/);
  assert.match(source, /parsed\.drink\.trivia = row\.order_hint/);
  assert.match(source, /parsed\.drink\.masterSource = 'd1'/);
});
