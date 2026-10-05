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
test('five placements use their issued IDs and preserve special characters', () => {
  const {api} = runtime();
  const issued = {bar_recommend: 'carilabrecommend-22', bar_ingredients: 'carilabrecipe-22', bar_search: 'carilabsearch-22', bar_history: 'carilabhistory-22', bar_goods: 'carilabgoods-22'};
  for (const placement of Object.keys(issued)) {
    const url = new URL(api.searchUrl('日本酒 + & #', placement));
    assert.equal(url.searchParams.get('tag'), issued[placement]);
    assert.equal(url.searchParams.get('k'), '日本酒 + & #');
  }
});
test('static goods pick up a configured fixture ID without changing the query', () => {
  const link = {href: 'https://www.amazon.co.jp/s?k=ウイスキー+本&tag=carila0e-22', dataset: {amazonPlacement: 'bar_goods'}};
  const {listeners, api} = runtime(source.replace('bar_goods: "carilabgoods-22"', 'bar_goods: "fixture-only"'), [link]);
  listeners.DOMContentLoaded[0]();
  assert.equal(new URL(link.href).searchParams.get('tag'), 'fixture-only');
  assert.equal(new URL(link.href).searchParams.get('k'), 'ウイスキー 本');
  assert.equal(api.trackingId('bar_search'), 'carilabsearch-22');
  assert.equal(api.trackingId('unknown'), 'carila0e-22');
});
test('one delegated click sends one classified event and navigation is unaffected by tracker errors', () => {
  const {api, context, listeners, events} = runtime();
  const link = {href: api.searchUrl('ジン', 'bar_ingredients'), dataset: {amazonPlacement: 'bar_ingredients'}};
  const event = {target: {closest: () => link}};
  listeners.click[0](event);
  assert.equal(events.length, 1);
  assert.equal(events[0].payload.placement, 'bar_ingredients');
  assert.equal(events[0].payload.trackingId, 'carilabrecipe-22');
  context.window.carilaTrack = () => {throw new Error('offline')};
  assert.doesNotThrow(() => listeners.click[0](event));
  assert.equal(api.properties({href: 'https://amazon.co.jp.example.org/', dataset: link.dataset}), null);
});
test('all twelve goods and four dynamic call sites are classified', () => {
  const html = fs.readFileSync(new URL('../public/index.html', import.meta.url), 'utf8');
  const js = fs.readFileSync(new URL('../public/assets/js/main.js', import.meta.url), 'utf8');
  assert.equal(html.split('data-amazon-placement="bar_goods"').length - 1, 12);
  assert.equal(html.split('&tag=carilabgoods-22').length - 1, 12);
  for (const key of ['bar_history', 'bar_search', 'bar_recommend', 'bar_ingredients']) {
    assert.match(js, new RegExp('data-amazon-placement="' + key + '"'));
    assert.ok(js.includes("'" + key + "'"));
  }
  assert.ok(html.indexOf('/assets/js/amazon-links.js') < html.indexOf('/assets/js/main.js'));
});
test('drink search commits core content before optional shopping links', () => {
  assert.match(source, /installResilientDrinkSearch/);
  assert.match(source, /requestSearchPayload/);
  assert.match(source, /Core search content is committed first/);
  assert.match(source, /insertAdjacentHTML\("beforeend", shopping\)/);
  assert.match(source, /BarCarila affiliate links unavailable/);
  assert.match(source, /first = clean\.indexOf\("\{"\)/);
});
test('PWA manifest, safe-area CSS, and custom cocktail icon are present', () => {
  const manifest = JSON.parse(fs.readFileSync(new URL('../public/manifest.webmanifest', import.meta.url), 'utf8'));
  const css = fs.readFileSync(new URL('../public/assets/css/pwa.css', import.meta.url), 'utf8');
  const icon = fs.readFileSync(new URL('../public/barcarila-icon.svg', import.meta.url), 'utf8');
  assert.equal(manifest.display, 'standalone');
  assert.equal(manifest.icons[0].src.startsWith('/barcarila-icon.svg'), true);
  assert.match(css, /100dvh/);
  assert.match(css, /safe-area-inset-bottom/);
  assert.match(css, /\.search-input\{min-width:0/);
  assert.match(icon, /cocktail glass icon/);
  assert.match(source, /viewport-fit=cover/);
  assert.match(source, /apple-touch-icon/);
});
