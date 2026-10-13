import appWorker from './worker-v1.9-expansions.mjs';
import baseWorker from './worker-v1.9.mjs';
import { isValidCarilaConversation } from './worker.mjs';
import { CARILA_SYSTEM_PROMPT } from './carila-personality.mjs';

const REALTIME_ENDPOINT = 'https://api.openai.com/v1/realtime/calls';
const REALTIME_MODEL = 'gpt-realtime-2.1';
const CLIENT_COOKIE = 'bar_carila_client';
const DEFAULT_TEXT_DAILY_LIMIT = 20;
const DEFAULT_VOICE_DAILY_LIMIT = 2;
const usageTablesReady = new WeakMap();

function json(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers },
  });
}

function noopStatement(firstValue = null) {
  return {
    __barCarilaNoop: true,
    bind() { return this; },
    async first() { return firstValue; },
    async run() { return { success: true, meta: { changes: 0 } }; },
    async all() { return { results: [] }; },
    async raw() { return []; },
  };
}

function isRuntimeMasterMaintenance(sql) {
  const text = String(sql || '').trim();
  if (/^SELECT\s+COUNT\(\*\)\s+AS\s+count\s+FROM\s+drinks\s+WHERE\s+evidence_version\s*=\s*\?/i.test(text)) return 'seed-count';
  if (/^SELECT\s+id\s+FROM\s+drinks\s+WHERE\s+canonical_key\s*=\s*\?/i.test(text)) return 'seed-id';
  if (/^(CREATE|ALTER|DROP|INSERT|UPDATE|DELETE|REPLACE)\b/i.test(text)
      && /\b(drinks|drink_aliases|drink_evidence)\b/i.test(text)) return 'write';
  return '';
}

export function createReadOnlyMasterDb(db) {
  if (!db?.prepare) return db;
  return {
    prepare(sql) {
      const maintenance = isRuntimeMasterMaintenance(sql);
      if (maintenance === 'seed-count') return noopStatement({ count: Number.MAX_SAFE_INTEGER });
      if (maintenance === 'seed-id') return noopStatement(null);
      if (maintenance === 'write') return noopStatement();
      return db.prepare(sql);
    },
    async batch(statements) {
      if (!Array.isArray(statements) || statements.length === 0) return [];
      if (statements.every((statement) => statement?.__barCarilaNoop)) {
        return statements.map(() => ({ success: true, meta: { changes: 0 } }));
      }
      const results = [];
      for (const statement of statements) {
        if (statement?.__barCarilaNoop) results.push(await statement.run());
        else results.push(await statement.run());
      }
      return results;
    },
    exec: typeof db.exec === 'function' ? db.exec.bind(db) : undefined,
    dump: typeof db.dump === 'function' ? db.dump.bind(db) : undefined,
  };
}

function parsePositiveLimit(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 && parsed <= 1000 ? parsed : fallback;
}

function cookieValue(request, name) {
  const cookie = request.headers.get('cookie') || '';
  for (const pair of cookie.split(';')) {
    const [key, ...rest] = pair.trim().split('=');
    if (key === name) {
      try { return decodeURIComponent(rest.join('=')); } catch { return ''; }
    }
  }
  return '';
}

function usageIdentity(request) {
  const existing = cookieValue(request, CLIENT_COOKIE);
  if (/^[a-f0-9-]{20,64}$/i.test(existing)) return { id: existing, setCookie: '' };
  const id = crypto.randomUUID();
  return {
    id,
    setCookie: `${CLIENT_COOKIE}=${encodeURIComponent(id)}; Path=/; Max-Age=31536000; HttpOnly; Secure; SameSite=Lax`,
  };
}

function jstUsageDate(now = Date.now()) {
  return new Date(now + (9 * 60 * 60 * 1000)).toISOString().slice(0, 10);
}

function secondsUntilJstMidnight(now = Date.now()) {
  const shifted = new Date(now + (9 * 60 * 60 * 1000));
  const nextMidnightUtc = Date.UTC(
    shifted.getUTCFullYear(),
    shifted.getUTCMonth(),
    shifted.getUTCDate() + 1,
  ) - (9 * 60 * 60 * 1000);
  return Math.max(1, Math.ceil((nextMidnightUtc - now) / 1000));
}

async function ensureUsageTable(db) {
  if (!db?.prepare) throw new Error('DRINK_DB is not configured');
  if (!usageTablesReady.has(db)) {
    const ready = db.prepare(`
      CREATE TABLE IF NOT EXISTS carila_usage_daily (
        client_id TEXT NOT NULL,
        usage_date TEXT NOT NULL,
        text_turns INTEGER NOT NULL DEFAULT 0,
        voice_sessions INTEGER NOT NULL DEFAULT 0,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (client_id, usage_date)
      )
    `).run().catch((error) => {
      usageTablesReady.delete(db);
      throw error;
    });
    usageTablesReady.set(db, ready);
  }
  await usageTablesReady.get(db);
}

async function consumeUsage(request, env, kind) {
  const db = env?.DRINK_DB;
  await ensureUsageTable(db);
  const identity = usageIdentity(request);
  const date = jstUsageDate();
  const isVoice = kind === 'voice';
  const limit = isVoice
    ? parsePositiveLimit(env?.CARILA_VOICE_DAILY_LIMIT, DEFAULT_VOICE_DAILY_LIMIT)
    : parsePositiveLimit(env?.CARILA_TEXT_DAILY_LIMIT, DEFAULT_TEXT_DAILY_LIMIT);
  const counter = isVoice ? 'voice_sessions' : 'text_turns';
  const statement = db.prepare(`
    INSERT INTO carila_usage_daily (client_id, usage_date, text_turns, voice_sessions, updated_at)
    VALUES (?, ?, ${isVoice ? 0 : 1}, ${isVoice ? 1 : 0}, CURRENT_TIMESTAMP)
    ON CONFLICT(client_id, usage_date) DO UPDATE SET
      ${counter} = carila_usage_daily.${counter} + 1,
      updated_at = CURRENT_TIMESTAMP
    WHERE carila_usage_daily.${counter} < ?
    RETURNING text_turns, voice_sessions
  `).bind(identity.id, date, limit);
  const row = await statement.first();
  const currentRow = row || await db.prepare(
    'SELECT text_turns, voice_sessions FROM carila_usage_daily WHERE client_id = ? AND usage_date = ?',
  ).bind(identity.id, date).first();
  const used = Number(currentRow?.[counter] || 0);
  return {
    allowed: Boolean(row),
    kind,
    limit,
    used,
    remaining: Math.max(0, limit - used),
    retryAfter: secondsUntilJstMidnight(),
    setCookie: identity.setCookie,
  };
}

function withUsageHeaders(response, usage) {
  const headers = new Headers(response.headers);
  headers.set('x-carila-trial-limit', String(usage.limit));
  headers.set('x-carila-trial-remaining', String(usage.remaining));
  headers.set('x-carila-trial-kind', usage.kind);
  if (usage.setCookie) headers.set('set-cookie', usage.setCookie);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function usageLimitReached(usage) {
  const response = json({
    error: 'Trial usage limit reached',
    code: 'CARILA_TRIAL_LIMIT_REACHED',
    kind: usage.kind,
    limit: usage.limit,
    reset: 'Asia/Tokyo midnight',
  }, 429, { 'retry-after': String(usage.retryAfter) });
  return withUsageHeaders(response, usage);
}

function usageGuardUnavailable(error) {
  console.error('Carila usage guard failed', error);
  return json({
    error: 'Carila trial is temporarily unavailable',
    code: 'CARILA_USAGE_GUARD_UNAVAILABLE',
  }, 503);
}

async function guardUsage(request, env, kind) {
  try {
    const usage = await consumeUsage(request, env, kind);
    return usage.allowed ? usage : usageLimitReached(usage);
  } catch (error) {
    return usageGuardUnavailable(error);
  }
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
      signal: AbortSignal.timeout(30_000),
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

const runtimeWorker = {
  async fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/carila-realtime-session') {
      if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405, { allow: 'POST' });
      if (!env?.OPENAI_API_KEY) return createCarilaRealtimeCall(request, env);
      if (!(request.headers.get('content-type') || '').startsWith('application/sdp')) return json({ error: 'Expected application/sdp' }, 415);
      const offer = await request.clone().text();
      if (!offer || offer.length > 100_000) return json({ error: 'Invalid SDP offer' }, 400);
      const guarded = await guardUsage(request, env, 'voice');
      if (guarded instanceof Response) return guarded;
      const response = await createCarilaRealtimeCall(request, env);
      return withUsageHeaders(response, guarded);
    }
    if (pathname === '/api/carila-chat') {
      if (request.method !== 'POST' || !env?.ANTHROPIC_API_KEY) return baseWorker.fetch(request, env, context);
      let body;
      try { body = await request.clone().json(); } catch { return json({ error: 'Invalid JSON body' }, 400); }
      if (!isValidCarilaConversation(body?.messages)) return json({ error: 'Invalid conversation' }, 400);
      const guarded = await guardUsage(request, env, 'text');
      if (guarded instanceof Response) return guarded;
      const response = await baseWorker.fetch(request, env, context);
      return withUsageHeaders(response, guarded);
    }
    if (pathname === '/api/chat' || pathname === '/api/drink-meta') {
      const runtimeEnv = env?.DRINK_DB ? { ...env, DRINK_DB: createReadOnlyMasterDb(env.DRINK_DB) } : env;
      if (pathname === '/api/drink-meta') return baseWorker.fetch(request, runtimeEnv, context);
      return appWorker.fetch(request, runtimeEnv, context);
    }
    return baseWorker.fetch(request, env, context);
  },
};

export default {
  async fetch(request, env, context) {
    const response = await runtimeWorker.fetch(request, env, context);
    const headers = new Headers(response.headers);
    headers.set('x-content-type-options', 'nosniff');
    headers.set('referrer-policy', 'strict-origin-when-cross-origin');
    headers.set('x-frame-options', 'DENY');
    headers.set('content-security-policy', "base-uri 'self'; object-src 'none'; frame-ancestors 'none'");
    headers.set('permissions-policy', 'camera=(), microphone=(self), geolocation=()');
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  },
};
