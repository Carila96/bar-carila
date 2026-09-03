import { mkdir, readFile, writeFile } from 'node:fs/promises';

const indexPath = new URL('../public/index.html', import.meta.url);
const testPath = new URL('../test/worker.test.mjs', import.meta.url);
const cssPath = new URL('../public/assets/css/main.css', import.meta.url);
const jsPath = new URL('../public/assets/js/main.js', import.meta.url);
const backgroundPath = new URL('../public/assets/images/bar-background.webp', import.meta.url);

let html = await readFile(indexPath, 'utf8');
const originalBytes = Buffer.byteLength(html);
if (originalBytes < 500_000) throw new Error(`Unexpected index.html baseline: ${originalBytes} bytes`);

const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/i);
if (!styleMatch) throw new Error('Main inline <style> block not found');
let css = styleMatch[1];

const fontImport = /@import\s+url\(['"](https:\/\/fonts\.googleapis\.com\/css2\?[^'"]+)['"]\);?\s*/i;
const fontMatch = css.match(fontImport);
if (!fontMatch) throw new Error('Expected Google Fonts @import not found');
const fontUrl = fontMatch[1];
css = css.replace(fontImport, '');

const bgMatch = css.match(/data:image\/webp;base64,([A-Za-z0-9+/=]+)/);
if (!bgMatch) throw new Error('Inline WebP background payload not found');
const background = Buffer.from(bgMatch[1], 'base64');
if (background.length < 100_000) throw new Error(`Background payload unexpectedly small: ${background.length}`);
css = css.replace(`data:image/webp;base64,${bgMatch[1]}`, '/assets/images/bar-background.webp');

const inlineScripts = [...html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/gi)];
const appScripts = inlineScripts.filter((match) => {
  const body = match[2].trim();
  return body.length > 1000 && !body.includes("gtag('config'") && !body.includes('gtag("config"');
});
if (appScripts.length === 0) throw new Error('Large inline application script not found');
const js = appScripts.map((match) => match[2].trim()).join('\n\n');
if (Buffer.byteLength(js) < 20_000) throw new Error(`Extracted application JS unexpectedly small: ${Buffer.byteLength(js)}`);

const fontLinks = [
  '<link rel="preconnect" href="https://fonts.googleapis.com">',
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
  `<link rel="stylesheet" href="${fontUrl}">`,
  '<link rel="preload" as="image" href="/assets/images/bar-background.webp" fetchpriority="high">',
  '<link rel="stylesheet" href="/assets/css/main.css">',
].join('\n');

html = html.replace(styleMatch[0], fontLinks);
for (const match of appScripts) html = html.replace(match[0], '');
if (!html.includes('</body>')) throw new Error('Closing body tag not found');
html = html.replace('</body>', '<script src="/assets/js/main.js" defer></script>\n</body>');

if (/data:image\/webp;base64/i.test(html)) throw new Error('Inline WebP remains in HTML');
if (html.includes('<style>')) throw new Error('Main inline style block remains in HTML');
if (!html.includes('/assets/css/main.css') || !html.includes('/assets/js/main.js')) {
  throw new Error('Split asset references missing from HTML');
}

await mkdir(new URL('../public/assets/css/', import.meta.url), { recursive: true });
await mkdir(new URL('../public/assets/js/', import.meta.url), { recursive: true });
await mkdir(new URL('../public/assets/images/', import.meta.url), { recursive: true });
await writeFile(cssPath, css.trim() + '\n');
await writeFile(jsPath, js.trim() + '\n');
await writeFile(backgroundPath, background);
await writeFile(indexPath, html);

let tests = await readFile(testPath, 'utf8');
for (const name of [
  'frontend localizes chat errors and reports safe diagnostics',
  'frontend uses the current Sonnet alias for every chat request',
]) {
  const marker = `test('${name}'`;
  const start = tests.indexOf(marker);
  if (start === -1) throw new Error(`Expected test not found: ${name}`);
  const end = tests.indexOf('\n});', start);
  if (end === -1) throw new Error(`Could not locate end of test: ${name}`);
  const block = tests.slice(start, end + 4);
  const replaced = block.replace("../public/index.html", "../public/assets/js/main.js");
  if (replaced === block) throw new Error(`Expected index.html read not found in test: ${name}`);
  tests = tests.slice(0, start) + replaced + tests.slice(end + 4);
}

if (!tests.includes("BarCarila root uses split static assets")) {
  tests += `\n\ntest('BarCarila root uses split static assets without an inline background payload', async () => {\n  const [html, css, js, background] = await Promise.all([\n    readFile(new URL('../public/index.html', import.meta.url), 'utf8'),\n    readFile(new URL('../public/assets/css/main.css', import.meta.url), 'utf8'),\n    readFile(new URL('../public/assets/js/main.js', import.meta.url), 'utf8'),\n    readFile(new URL('../public/assets/images/bar-background.webp', import.meta.url)),\n  ]);\n  assert.match(html, /\\/assets\\/css\\/main\\.css/);\n  assert.match(html, /\\/assets\\/js\\/main\\.js/);\n  assert.match(html, /preload[^>]+bar-background\\.webp/);\n  assert.doesNotMatch(html, /data:image\\/webp;base64/);\n  assert.match(css, /\\/assets\\/images\\/bar-background\\.webp/);\n  assert.ok(Buffer.byteLength(html) < 100_000);\n  assert.ok(Buffer.byteLength(js) > 20_000);\n  assert.ok(background.length > 100_000);\n});\n`;
}
await writeFile(testPath, tests);

console.log(JSON.stringify({
  indexBeforeBytes: originalBytes,
  indexAfterBytes: Buffer.byteLength(html),
  cssBytes: Buffer.byteLength(css),
  jsBytes: Buffer.byteLength(js),
  backgroundBytes: background.length,
  extractedInlineScripts: appScripts.length,
}, null, 2));
