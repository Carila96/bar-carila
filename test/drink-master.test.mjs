import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const source = fs.readFileSync(new URL('../src/worker.mjs', import.meta.url), 'utf8');

test('drink master creates D1 tables and seeds calibrated drinks', () => {
  assert.match(source, /CREATE TABLE IF NOT EXISTS drinks/);
  assert.match(source, /CREATE TABLE IF NOT EXISTS drink_aliases/);
  assert.match(source, /CREATE TABLE IF NOT EXISTS drink_evidence/);
  assert.match(source, /jp-rarity-v1\.3/);
  assert.match(source, /アペロールスプリッツ/);
  assert.match(source, /ピスコサワー/);
});

test('drink meta API exposes Japan rarity separately from availability', () => {
  assert.match(source, /pathname === '\/api\/drink-meta'/);
  assert.match(source, /japanAvailability: row\.japan_availability_score/);
  assert.match(source, /rarity: row\.japan_rarity_score/);
  assert.match(source, /rarityLabel: row\.japan_rarity_label/);
  assert.match(source, /confidence: row\.japan_rarity_confidence/);
});
