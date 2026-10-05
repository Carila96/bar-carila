import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('../public/assets/js/amazon-links.js', import.meta.url), 'utf8');
function runtime(code = source, links = []) {
  const listeners = {};
  const events = [];
  const context = {URL, location: {href: 'https://bar.carilaworks.com/'},
    document: {addEventListener: (name, fn) => (listeners[name] ||= []).push(fn), querySelectorAll: () => links},
    setTimeout: fn => fn()};
  context.window = {carilaTrack: (name, payload) => events.push({name, payload})};
  vm.createContext(context);
  vm.runInContext(code, context);
  return {context, api: context.window.CarilaAmazon, listeners, events};
}
test('five placements preserve the issued fallback and special characters', () => {
  const {api} = runtime();
  for (const placement of ['bar_recommend', 'bar_ingredients', 'bar_search', 'bar_history', 'bar_goods']) {
    const url = new URL(api.searchUrl('日本酒 + & #', placement));
    assert.equal(url.searchParams.get('tag'), 'carila0e-22');
    assert.equal(url.searchParams.get('k'), '日本酒 + & #');
  }
});
test('static goods pick up a configured fixture ID without changing the query', () => {
  const link = {href: 'https://www.amazon.co.jp/s?k=ウイスキー+本&tag=carila0e-22', dataset: {amazonPlacement: 'bar_goods'}};
  const {listeners, api} = runtime(source.replace('bar_goods: null', 'bar_goods: "fixture-only"'), [link]);
  listeners.DOMContentLoaded[0]();
  assert.equal(new URL(link.href).searchParams.get('tag'), 'fixture-only');
  assert.equal(new URL(link.href).searchParams.get('k'), 'ウイスキー 本');
  assert.equal(api.trackingId('bar_search'), 'carila0e-22');
});
test('one delegated click sends one classified event and navigation is unaffected by tracker errors', () => {
  const {api, context, listeners, events} = runtime();
  const link = {href: api.searchUrl('ジン', 'bar_ingredients'), dataset: {amazonPlacement: 'bar_ingredients'}};
  const event = {target: {closest: () => link}};
  listeners.click[0](event);
  assert.equal(events.length, 1);
  assert.equal(events[0].payload.placement, 'bar_ingredients');
  assert.equal(events[0].payload.trackingId, 'carila0e-22');
  context.window.carilaTrack = () => {throw new Error('offline')};
  assert.doesNotThrow(() => listeners.click[0](event));
  assert.equal(api.properties({href: 'https://amazon.co.jp.example.org/', dataset: link.dataset}), null);
});
test('all twelve goods and four dynamic call sites are classified', () => {
  const html = fs.readFileSync(new URL('../public/index.html', import.meta.url), 'utf8');
  const js = fs.readFileSync(new URL('../public/assets/js/main.js', import.meta.url), 'utf8');
  assert.equal(html.split('data-amazon-placement="bar_goods"').length - 1, 12);
  for (const key of ['bar_history', 'bar_search', 'bar_recommend', 'bar_ingredients']) {
    assert.match(js, new RegExp('data-amazon-placement="' + key + '"'));
    assert.ok(js.includes("'" + key + "'"));
  }
  assert.ok(html.indexOf('/assets/js/amazon-links.js') < html.indexOf('/assets/js/main.js'));
});
