from pathlib import Path

js_path = Path('public/assets/js/main.js')
js = js_path.read_text()
js = js.replace("const CHAT_MODEL='claude-sonnet-4-6';", "const FAST_MODEL='claude-haiku-4-5-20251001';\nconst RECOMMEND_MODEL='claude-sonnet-4-6';")
js = js.replace("model:CHAT_MODEL,max_tokens:600,system:SEARCH_SYSTEM", "model:FAST_MODEL,max_tokens:450,system:SEARCH_SYSTEM")

old_set = """function setPanda(state){
  ALL_PANDAS.forEach(s=>{const el=document.getElementById('p-'+s);if(el)el.classList.remove('active');});
  const target=ALL_PANDAS.includes(state)?state:'counter';
  const el=document.getElementById('p-'+target);
  if(el)el.classList.add('active');
}"""
new_set = """function loadPandaImage(el){
  if(!el||el.getAttribute('src')||!el.dataset.src)return;
  el.setAttribute('src',el.dataset.src);delete el.dataset.src;
}
function setPanda(state){
  ALL_PANDAS.forEach(s=>{const el=document.getElementById('p-'+s);if(el)el.classList.remove('active');});
  const target=ALL_PANDAS.includes(state)?state:'counter';
  const el=document.getElementById('p-'+target);
  if(el){loadPandaImage(el);el.classList.add('active');}
}
function preloadPandas(){document.querySelectorAll('.panda-img[data-src]').forEach(loadPandaImage);}
function schedulePandaPreload(){
  const run=()=>setTimeout(preloadPandas,80);
  if(document.readyState==='complete')run();else window.addEventListener('load',run,{once:true});
}"""
if old_set not in js:
    raise SystemExit('setPanda block not found')
js = js.replace(old_set, new_set)

old_get = "function getSystem(){return SYSTEM+(I18N[lang].langRule||'');}"
new_get = """function getSystem(){return SYSTEM+(I18N[lang].langRule||'');}
function getFastSystem(){return getSystem()+`\n\n【高速質問ターン】まだ最終提案に必要な情報が十分でない場合は、短く自然な質問を1つだけ返す。messageは簡潔にし、choicesは原則4個以内。情報が十分ならrecommendationを返してよい。`;}
function initialAssistantPayload(){return {type:'question',emotion:'counter',message:t().initialMsg,choices:t().initialChoices};}
function initialHistory(){return [{role:'user',content:t().startMsg},{role:'assistant',content:JSON.stringify(initialAssistantPayload())}];}
let warmPromise=null;
function prewarmFastModel(){
  if(warmPromise)return warmPromise;
  warmPromise=fetch(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:FAST_MODEL,max_tokens:0,system:getFastSystem(),messages:[{role:'user',content:'cache warmup'}]})}).catch(()=>null);
  return warmPromise;
}"""
if old_get not in js:
    raise SystemExit('getSystem not found')
js = js.replace(old_get, new_get)

old_call = """async function callAPI(userMsg){
  if(userMsg)chatHistory.push({role:'user',content:userMsg});
  const res=await fetch(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:CHAT_MODEL,max_tokens:1100,system:getSystem(),messages:chatHistory})});
  const data=await readAPIResponse(res);
  const text=data.content[0].text;
  chatHistory.push({role:'assistant',content:text});
  return JSON.parse(text.replace(/```json|```/g,'').trim());
}"""
new_call = """async function callAPI(userMsg){
  if(userMsg)chatHistory.push({role:'user',content:userMsg});
  const userTurns=chatHistory.filter(m=>m.role==='user').length;
  const fastTurn=userTurns<4;
  const model=fastTurn?FAST_MODEL:RECOMMEND_MODEL;
  const maxTokens=fastTurn?600:1100;
  const system=fastTurn?getFastSystem():getSystem();
  const res=await fetch(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model,max_tokens:maxTokens,system,messages:chatHistory})});
  const data=await readAPIResponse(res);
  const text=data.content[0].text;
  chatHistory.push({role:'assistant',content:text});
  return JSON.parse(text.replace(/```json|```/g,'').trim());
}"""
if old_call not in js:
    raise SystemExit('callAPI block not found')
js = js.replace(old_call, new_call)

old_start = """async function startChat(){
  isLoading=true;showLoading();
  chatHistory=[{role:'user',content:t().startMsg}];
  try{
    const res=await fetch(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:CHAT_MODEL,max_tokens:1100,system:SYSTEM,messages:chatHistory})});
    const data=await readAPIResponse(res);
    const text=data.content[0].text;
    chatHistory.push({role:'assistant',content:text});
    const r=JSON.parse(text.replace(/```json|```/g,'').trim());
    setPanda(r.emotion||'counter');showMsg(r.message);showChoices(r.choices);
  }catch(e){
    showChatError(e,'counter');
    showChoices(t().initialChoices);
  }
  isLoading=false;
}"""
new_start = """function startChat(){
  isLoading=false;
  chatHistory=initialHistory();
  setPanda('counter');showMsg(t().initialMsg);showChoices(t().initialChoices);
  prewarmFastModel();
}"""
if old_start not in js:
    raise SystemExit('startChat block not found')
js = js.replace(old_start, new_start)
js = js.replace("startChat();\ninitTutorial();", "startChat();\nschedulePandaPreload();\ninitTutorial();")
js_path.write_text(js)

worker_path = Path('src/worker.mjs')
worker = worker_path.read_text()
worker = worker.replace("const ALLOWED_MODELS = new Set(['claude-sonnet-4-6']);", "const ALLOWED_MODELS = new Set(['claude-sonnet-4-6', 'claude-haiku-4-5-20251001']);")
worker = worker.replace("|| body.max_tokens < 1 || !Array.isArray(body.messages)", "|| body.max_tokens < 0 || !Array.isArray(body.messages)")
old_body = "body: JSON.stringify(body),"
new_body = "body: JSON.stringify({ ...body, system: typeof body.system === 'string' && body.system ? [{ type: 'text', text: body.system, cache_control: { type: 'ephemeral' } }] : body.system }),"
if old_body not in worker:
    raise SystemExit('upstream body forwarding not found')
worker = worker.replace(old_body, new_body, 1)
worker_path.write_text(worker)

test_path = Path('test/worker.test.mjs')
test = test_path.read_text()
old = """test('frontend uses the current Sonnet alias for every chat request', async () => {
  const html = await readFile(new URL('../public/assets/js/main.js', import.meta.url), 'utf8');
  assert.match(html, /const CHAT_MODEL='claude-sonnet-4-6'/);
  assert.equal((html.match(/model:CHAT_MODEL/g) || []).length, 3);
  assert.doesNotMatch(html, /claude-sonnet-4-20250514/);
});"""
new = """test('frontend routes quick turns to Haiku and final recommendations to Sonnet', async () => {
  const html = await readFile(new URL('../public/assets/js/main.js', import.meta.url), 'utf8');
  assert.match(html, /const FAST_MODEL='claude-haiku-4-5-20251001'/);
  assert.match(html, /const RECOMMEND_MODEL='claude-sonnet-4-6'/);
  assert.match(html, /const fastTurn=userTurns<4/);
  assert.match(html, /model=fastTurn\\?FAST_MODEL:RECOMMEND_MODEL/);
  assert.match(html, /max_tokens:0,system:getFastSystem\\(\\)/);
  assert.doesNotMatch(html, /claude-sonnet-4-20250514/);
});"""
if old not in test:
    raise SystemExit('old model test not found')
test = test.replace(old, new)
test += """

test('BarCarila startup is local-first and preloads deferred panda expressions', async () => {
  const html = await readFile(new URL('../public/assets/js/main.js', import.meta.url), 'utf8');
  assert.match(html, /function startChat\\(\\)\\{[\\s\\S]*showMsg\\(t\\(\\)\\.initialMsg\\);showChoices\\(t\\(\\)\\.initialChoices\\)/);
  assert.match(html, /function schedulePandaPreload\\(\\)/);
  assert.match(html, /document\\.querySelectorAll\\('\\.panda-img\\[data-src\\]'\\)/);
});

test('chat API accepts Haiku and marks the system prompt cacheable', async () => {
  const originalFetch = globalThis.fetch;
  let forwarded;
  globalThis.fetch = async (_url, init) => {
    forwarded = JSON.parse(init.body);
    return new Response(JSON.stringify({ content: [{ type: 'text', text: '{\"type\":\"question\",\"message\":\"ok\",\"choices\":[]}' }] }), { status: 200, headers: { 'content-type': 'application/json' } });
  };
  try {
    const response = await worker.fetch(new Request('https://preview.example/api/chat', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 0, system: 'cache me', messages: [{ role: 'user', content: 'warm' }] }),
    }), { ...env, ANTHROPIC_API_KEY: 'bound-secret' }, context);
    assert.equal(response.status, 200);
    assert.equal(forwarded.model, 'claude-haiku-4-5-20251001');
    assert.equal(forwarded.max_tokens, 0);
    assert.deepEqual(forwarded.system, [{ type: 'text', text: 'cache me', cache_control: { type: 'ephemeral' } }]);
  } finally { globalThis.fetch = originalFetch; }
});
"""
test_path.write_text(test)
