import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import worker from '../src/worker-carila-realtime.mjs';

test('recommendation recipe, question text, log, and saved history treat input as literal text', async () => {
  const source = await readFile(new URL('../public/assets/js/main.js', import.meta.url), 'utf8');
  const part = (start, end) => source.slice(source.indexOf(start), source.indexOf(end, source.indexOf(start)));
  const elements = {}; const payload = '<img src=x onerror="alert(1)">';
  const context = vm.createContext({
    document: { getElementById: id => elements[id] ||= { innerHTML: '', classList: { add() {} } } },
    window: { CarilaAmazon: { searchUrl: q => `https://www.amazon.co.jp/s?k=${encodeURIComponent(q)}` } },
    localStorage: { getItem: () => JSON.stringify([{ name: payload, date: payload, category: payload, tags: [payload], description: payload }]) },
    RAKUTEN_ID: 'test', convLog: [{ q: payload, a: payload }],
  });
  vm.runInContext(source.split('\n')[0] + '\n' + part('function getHistory()', '// ===== Goods') + '\n' + part('const NO_SHOP_RE', 'function toggleIngr') + '\n' + part('function buildLogHTML()', '// ===== Rec card') + '\n' + part('function showMsg(', 'function showLoading('), context);
  vm.runInContext(`openHistory(); showMsg(${JSON.stringify(payload)});`, context);
  for (const id of ['historyList', 'msgText']) { assert.ok(elements[id].innerHTML.includes('&lt;img')); assert.ok(!elements[id].innerHTML.includes('<img')); }
  const recipe = vm.runInContext(`buildRecipeHTML({ingredients:[{name:${JSON.stringify(payload)},amount:${JSON.stringify(payload)}}],method:${JSON.stringify(payload)}})`, context);
  assert.ok(!recipe.includes('<img')); assert.match(recipe, /&lt;img/);
  assert.ok(!vm.runInContext('buildLogHTML()', context).includes('<img'));
  assert.doesNotMatch(source, /onclick="nativeShare/);
  assert.match(source, /escapeBarText\(data\.drink\.name\)/);
});

test('API errors and static responses retain security headers without disabling same-origin microphone', async () => {
  for (const url of ['https://bar.example/api/unknown', 'https://bar.example/carila/']) {
    const response = await worker.fetch(new Request(url), { ASSETS: { fetch: async () => new Response('page') } }, {});
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
    assert.match(response.headers.get('content-security-policy'), /object-src 'none'/);
    assert.match(response.headers.get('permissions-policy'), /microphone=\(self\)/);
  }
  const headers = await readFile(new URL('../public/_headers', import.meta.url), 'utf8');
  assert.match(headers, /frame-ancestors 'none'/);
});

test('all 1500 embedded master keys are unique and structurally valid', async () => {
  const { auditMaster } = await import('../scripts/audit-drink-master.mjs');
  const report = await auditMaster(); assert.equal(report.total, 1500); assert.equal(report.uniqueKeys, 1500); assert.equal(report.errors, 0);
});
