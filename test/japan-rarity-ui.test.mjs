import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const source=fs.readFileSync(new URL('../public/assets/js/main.js',import.meta.url),'utf8');
test('BarCarila defines rarity using Japan bar availability',()=>{
 assert.match(source,/希少度は日本のBAR基準/);
 assert.match(source,/日本国内の一般的なBAR/);
 assert.match(source,/アペロールスプリッツ/);
});
test('recommendation card asynchronously applies D1 drink metadata',()=>{
 assert.match(source,/DRINK_META_API='\/api\/drink-meta'/);
 assert.match(source,/applyDrinkMetaToCard\(data,card\)/);
 assert.match(source,/rarity-tag/);
 assert.match(source,/bar_carila_drink_meta_cache_v1/);
});
