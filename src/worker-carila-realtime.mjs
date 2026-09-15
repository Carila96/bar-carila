import appWorker from './worker-v1.9-expansions.mjs';
import { CARILA_SYSTEM_PROMPT } from './carila-personality.mjs';

const REALTIME_ENDPOINT = 'https://api.openai.com/v1/realtime/calls';
const REALTIME_MODEL = 'gpt-realtime-2.1';

function json(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers },
  });
}

async function createCarilaRealtimeCall(request, env) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405, { allow: 'POST' });
  if (!env?.OPENAI_API_KEY) return json({ error: 'Realtime voice is not configured', code: 'MISSING_OPENAI_API_KEY' }, 503);

  const contentType = request.headers.get('content-type') || '';
  if (!contentType.startsWith('application/sdp')) return json({ error: 'Expected application/sdp' }, 415);

  const sdp = await request.text();
  if (!sdp || sdp.length > 100_000) return json({ error: 'Invalid SDP offer' }, 400);

  const session = {
    type: 'realtime',
    model: REALTIME_MODEL,
    output_modalities: ['audio'],
    audio: {
      input: {
        noise_reduction: { type: 'near_field' },
        transcription: { model: 'gpt-4o-mini-transcribe', language: 'ja' },
        turn_detection: {
          type: 'server_vad',
          threshold: 0.72,
          prefix_padding_ms: 300,
          silence_duration_ms: 650,
          create_response: false,
          interrupt_response: true,
        },
      },
      output: {
        voice: 'ash',
        speed: 0.94,
      },
    },
    instructions: `${CARILA_SYSTEM_PROMPT}\n\n【音声会話専用ルール】\n自然な対面会話として応答する。読み上げ原稿のように長く話さず、原則1〜3文程度で間を残す。相手が話し始めたら割り込みを自然に受け入れる。相手の発話が短い相槌や言い直しなら、必要以上に話題を広げない。テキスト画面の説明をせず、実際にカウンターで会話している前提で話す。明確な人間の発話が確認できるまでは絶対に返答を始めない。無音、環境音、衣擦れ、呼吸音、スピーカーから回り込んだCarila自身の声には返答しない。返答は原則として必ず自然な日本語で行う。ユーザーが明示的に別言語を希望した場合だけその言語に切り替える。英語で話しかけ始めない。声は低く落ち着いた成人男性寄りで、柔らかく、過度に芝居がからない話し方にする。`,
    max_output_tokens: 320,
  };

  const form = new FormData();
  form.set('sdp', sdp);
  form.set('session', JSON.stringify(session));

  let upstream;
  try {
    upstream = await fetch(REALTIME_ENDPOINT, {
      method: 'POST',
      headers: { authorization: `Bearer ${env.OPENAI_API_KEY}` },
      body: form,
    });
  } catch (error) {
    console.error('Carila realtime call failed', error);
    return json({ error: 'Realtime voice upstream unavailable', code: 'OPENAI_REALTIME_UNAVAILABLE' }, 502);
  }

  const answer = await upstream.text();
  if (!upstream.ok) {
    console.error('Carila realtime upstream error', { status: upstream.status, body: answer.slice(0, 500) });
    return json({ error: 'Realtime voice session could not start', code: 'OPENAI_REALTIME_ERROR' }, upstream.status >= 400 && upstream.status < 600 ? upstream.status : 502);
  }

  return new Response(answer, {
    status: 200,
    headers: { 'content-type': 'application/sdp', 'cache-control': 'no-store' },
  });
}

export default {
  async fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/carila-realtime-session') return createCarilaRealtimeCall(request, env);
    return appWorker.fetch(request, env, context);
  },
};
