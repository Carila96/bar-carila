import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/worker-v1.9.mjs';

const context = { waitUntil() {} };
const localFlowMessages = [
  { role: 'user', content: 'こんばんは。今夜のお酒を選んでほしいです。' },
  { role: 'assistant', content: JSON.stringify({ type: 'question', emotion: 'counter', message: 'いらっしゃいませ。……今夜は、どんなお酒をお探しですか？', choices: ['おすすめを聞かせて','カクテルを探したい','ウイスキー・洋酒を探したい','ノンアルでも楽しみたい'] }) },
  { role: 'user', content: 'カクテルを探したい' },
  { role: 'assistant', content: JSON.stringify({ type: 'question', emotion: 'think', message: 'まず、アルコールの強さはどのくらいがよいですか？', choices: ['ほぼ飲めない・ノンアルがいい','ビール・チューハイくらい','ワインや焼酎くらい（12〜25%程度）','ウイスキーのストレートも平気（40%前後）'] }) },
  { role: 'user', content: 'ワインや焼酎くらい（12〜25%程度）' },
  { role: 'assistant', content: JSON.stringify({ type: 'question', emotion: 'think', message: '今夜はどんな味のイメージですか？', choices: ['甘め・まろやか','さっぱり・軽やか','ほろ苦い・香り高い','お任せで'] }) },
  { role: 'user', content: 'さっぱり・軽やか' },
  { role: 'assistant', content: JSON.stringify({ type: 'question', emotion: 'think', message: '今夜はどんな夜ですか？', choices: ['ゆったりリラックスしたい','特別な夜を楽しみたい','少し冒険してみたい','定番の安心感がほしい'] }) },
  { role: 'user', content: '定番の安心感がほしい' },
];

test('guided local flow reaches Sonnet 5 with a valid final payload and normalizes wrapped JSON', async () => {
  const originalFetch = globalThis.fetch;
  let forwarded;
  globalThis.fetch = async (url, init) => {
    assert.equal(url, 'https://api.anthropic.com/v1/messages');
    forwarded = JSON.parse(init.body);
    return new Response(JSON.stringify({
      content: [
        { type: 'thinking', thinking: 'not user-visible' },
        { type: 'text', text: 'Recommendation follows.\n```json\n{"type":"recommendation","emotion":"smile","message":"今夜はこちらを。","analysis":"軽やかで定番寄りです。","drink":{"masterKey":"Bamboo","name":"バンブー","category":"カクテル","abv":"18%","description":"","trivia":"","recipe":["ドライシェリー 40ml","ドライベルモット 20ml"],"tags":["さっぱり","定番"]}}\n```' },
      ],
    }), { status: 200, headers: { 'content-type': 'application/json' } });
  };
  try {
    const response = await worker.fetch(new Request('https://preview.example/api/chat', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-5',
        max_tokens: 1000,
        system: 'Return the final BarCarila recommendation as JSON.',
        messages: localFlowMessages,
      }),
    }), {
      ASSETS: { fetch: () => new Response('asset') },
      ANTHROPIC_API_KEY: 'bound-secret',
    }, context);

    assert.equal(response.status, 200);
    assert.equal(forwarded.model, 'claude-sonnet-5');
    assert.equal(forwarded.max_tokens, 2200);
    assert.deepEqual(forwarded.thinking, { type: 'disabled' });
    assert.deepEqual(forwarded.output_config, { effort: 'low' });
    assert.deepEqual(forwarded.messages, localFlowMessages);
    assert.equal(forwarded.messages[0].role, 'user');
    assert.equal(forwarded.messages.at(-1).role, 'user');
    assert.ok(forwarded.messages.every((message, index) => index === 0 || message.role !== forwarded.messages[index - 1].role));

    const body = await response.json();
    assert.deepEqual(body.content.map((item) => item.type), ['text']);
    const parsed = JSON.parse(body.content[0].text);
    assert.equal(parsed.type, 'recommendation');
    assert.equal(parsed.drink.name, 'バンブー');
    assert.equal(typeof parsed.drink.rarity, 'number');
  } finally {
    globalThis.fetch = originalFetch;
  }
});
