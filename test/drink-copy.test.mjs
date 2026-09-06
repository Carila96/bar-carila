import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
const w=fs.readFileSync('src/worker.mjs','utf8');const j=fs.readFileSync('public/assets/js/main.js','utf8');
test('drink copy seed and fixed description override',()=>{assert.match(w,/DRINK_COPY_SEED/);assert.match(w,/short_description = ?/);assert.match(j,/meta.description/);assert.match(w,/enrichBarCarilaRecommendation/);assert.match(w,/masterSource = 'd1'/);assert.match(j,/masterSource==='d1'/);assert.match(j,/const maxTokens=fastTurn\?600:1200/);});
