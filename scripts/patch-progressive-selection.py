from pathlib import Path

main_path = Path('public/assets/js/main.js')
main = main_path.read_text()

marker = "function initialAssistantPayload(){"
insert = r'''function getSelectionSystem(){return `あなたはBar Carilaのバーテンダーです。今夜の一杯を1つだけ選んでください。

【最重要】既知マスターは参考情報であり推薦候補の上限ではありません。マスター外を含む実在する酒すべてから、ユーザー条件に最も合う一杯を選んでください。マスター内へ無理に寄せないでください。
【選定専用ターン】質問、長い説明、レシピ生成はしません。酒の選定精度だけに集中してください。route制約と度数希望は必ず守ってください。
【JSONのみ】{"type":"recommendation","emotion":"bartender or relax or counter or curious","message":"短い一言","drink":{"name":"正式名称","masterKey":"標準的な英語名","imageQuery":"写真検索用の英語8語以内","category":"カテゴリ","abv":"約8%のような推定値"}}
前置き・後書き・Markdownは禁止。`+(I18N[lang].langRule||'');}
function getDetailSystem(selection){return `あなたはBar Carilaのバーテンダーです。すでに推薦する一杯は確定しています。酒の選び直しは絶対にせず、その一杯の表示用詳細だけを完成させてください。
確定酒: ${selection.name} / masterKey=${selection.masterKey||''}
【JSONのみ】{"type":"recommendation","emotion":"bartender or relax or counter or curious","message":"短い一言","analysis":"今夜の気分を2〜3文で表す1行の文章","drink":{"name":"${selection.name}","masterKey":"${selection.masterKey||''}","imageQuery":"写真検索用の英語8語以内","category":"カテゴリ","abv":"推定値","rarity":0,"description":"60字以内の説明1文","trivia":"80字以内の豆知識またはBARでの楽しみ方","recipe":{"ingredients":[{"name":"材料","amount":"分量"}],"method":"作り方1文"},"tags":["タグ1","タグ2","タグ3"]}}
カクテル／モクテルはrecipe必須、単体酒のみrecipe:null可。前置き・後書き・Markdownは禁止。`+(I18N[lang].langRule||'');}
'''
if marker not in main:
    raise SystemExit('initialAssistantPayload marker not found')
main = main.replace(marker, insert + marker, 1)

if "const maxTokens=fastTurn?600:850;" not in main:
    raise SystemExit('maxTokens marker not found')
main = main.replace("const maxTokens=fastTurn?600:850;", "const maxTokens=forceRecommend?320:(fastTurn?600:850);", 1)
if "const system=forceRecommend?getFinalSystem():(fastTurn?getFastSystem():getSystem());" not in main:
    raise SystemExit('system marker not found')
main = main.replace("const system=forceRecommend?getFinalSystem():(fastTurn?getFastSystem():getSystem());", "const system=forceRecommend?getSelectionSystem():(fastTurn?getFastSystem():getSystem());", 1)
old_fetch = "const res=await fetch(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model,max_tokens:maxTokens,system,messages})});"
new_fetch = "const res=await fetch(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model,max_tokens:maxTokens,system,messages,barCarilaStage:forceRecommend?'selection':undefined})});"
if old_fetch not in main:
    raise SystemExit('callAPI fetch marker not found')
main = main.replace(old_fetch, new_fetch, 1)

old_tail = "const parsed=parseAssistantJson(data);\n  chatHistory.push({role:'assistant',content:JSON.stringify(parsed)});\n  return parsed;\n}\n\nfunction parseAssistantJson(data){"
new_tail = r'''const parsed=parseAssistantJson(data);
  chatHistory.push({role:'assistant',content:JSON.stringify(parsed)});
  if(forceRecommend&&parsed?.type==='recommendation'&&parsed?.drink?.name){
    parsed.__progressiveSelection=true;
    void hydrateRecommendationDetails(parsed,flowSummary);
  }
  return parsed;
}

async function hydrateRecommendationDetails(selection,flowSummary){
  try{
    const selectedName=selection?.drink?.name;
    if(!selectedName)return;
    const messages=[{role:'user',content:`route=${flowSummary?.route||'recommend'}; answers=${(flowSummary?.answers||[]).join(' / ')}; selectedDrink=${selectedName}`}];
    const res=await fetch(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:RECOMMEND_MODEL,max_tokens:850,system:getDetailSystem(selection.drink),messages,barCarilaStage:'details'})});
    const data=await readAPIResponse(res);
    const full=parseAssistantJson(data);
    if(full?.type!=='recommendation'||!full?.drink?.name)return;
    if(full.drink.name!==selectedName)return;
    const current=document.querySelector('.rec-name');
    if(!current||current.textContent.trim()!==selectedName)return;
    full.__progressiveDetail=true;
    showRec(full,true);
  }catch(error){console.warn('Recommendation detail hydration failed',error);}
}

function parseAssistantJson(data){'''
if old_tail not in main:
    raise SystemExit('callAPI tail marker not found')
main = main.replace(old_tail, new_tail, 1)

if "function showRec(data){" not in main:
    raise SystemExit('showRec marker not found')
main = main.replace("function showRec(data){", "function showRec(data,skipHistory=false){", 1)
if "  saveToHistory(data.drink);" not in main:
    raise SystemExit('saveToHistory marker not found')
main = main.replace("  saveToHistory(data.drink);", "  if(!skipHistory)saveToHistory(data.drink);", 1)
old_desc = '<div class="rec-desc">${data.drink.description}</div>'
new_desc = '${data.drink.description?`<div class="rec-desc">${data.drink.description}</div>`:\'\'}'
if old_desc not in main:
    raise SystemExit('rec-desc marker not found')
main = main.replace(old_desc, new_desc, 1)
main_path.write_text(main)

worker_path = Path('src/worker.mjs')
worker = worker_path.read_text()
validation = "  const useDrinkMasterLeanOutput = (body.model === 'claude-sonnet-5' || body.model === 'claude-sonnet-4-6') && Boolean(env.DRINK_DB);"
replacement = "  const barCarilaStage = typeof body.barCarilaStage === 'string' ? body.barCarilaStage : '';\n  delete body.barCarilaStage;\n  const useDrinkMasterLeanOutput = barCarilaStage !== 'selection' && (body.model === 'claude-sonnet-5' || body.model === 'claude-sonnet-4-6') && Boolean(env.DRINK_DB);"
if validation not in worker:
    raise SystemExit('worker lean-output marker not found')
worker = worker.replace(validation, replacement, 1)
worker_path.write_text(worker)

v19_path = Path('src/worker-v1.9.mjs')
v19 = v19_path.read_text()
old = "  if (body.model === 'claude-sonnet-5') {\n    body.thinking = { type: 'disabled' };\n    body.output_config = { ...(body.output_config || {}), effort: 'low' };\n    body.max_tokens = Math.max(Number(body.max_tokens) || 0, 850);\n  }"
new = "  const barCarilaStage = typeof body.barCarilaStage === 'string' ? body.barCarilaStage : '';\n  if (body.model === 'claude-sonnet-5') {\n    body.thinking = { type: 'disabled' };\n    body.output_config = { ...(body.output_config || {}), effort: 'low' };\n    body.max_tokens = barCarilaStage === 'selection' ? Math.min(Math.max(Number(body.max_tokens) || 0, 220), 320) : Math.max(Number(body.max_tokens) || 0, 850);\n  }"
if old not in v19:
    raise SystemExit('v1.9 runtime marker not found')
v19 = v19.replace(old, new, 1)
old_instruction = "  body.system += '\\n\\n【BarCarila固定マスター照合】最終回答が recommendation の場合、drink.masterKey にそのカクテルの標準的な英語名を必ず入れてください（例: Gin and Tonic, Moscow Mule）。同名で別レシピが存在する場合はベースまで含めた固定キーを使ってください。アカプルコは必ず Acapulco (Rum) または Acapulco (Tequila) のどちらかにしてください。コープスリバイバーNo.2は masterKey を Corpse Reviver としてください。既存フィールドは変更しないでください。';"
new_instruction = "  body.system += barCarilaStage === 'selection'\n    ? '\\n\\n【masterKey】選んだ酒の標準的な英語名をdrink.masterKeyへ入れてください。既知マスターは候補の上限ではありません。マスター外の酒でも条件に最適なら選んでください。'\n    : '\\n\\n【BarCarila固定マスター照合】最終回答が recommendation の場合、drink.masterKey にそのカクテルの標準的な英語名を必ず入れてください（例: Gin and Tonic, Moscow Mule）。同名で別レシピが存在する場合はベースまで含めた固定キーを使ってください。アカプルコは必ず Acapulco (Rum) または Acapulco (Tequila) のどちらかにしてください。コープスリバイバーNo.2は masterKey を Corpse Reviver としてください。既存フィールドは変更しないでください。';"
if old_instruction not in v19:
    raise SystemExit('v1.9 master instruction marker not found')
v19 = v19.replace(old_instruction, new_instruction, 1)
old_stability = "  if (body.model === 'claude-sonnet-5') body.system += '\\n\\n【最終JSON安定化】Claude Sonnet 5では前置き・後書き・Markdownコードフェンスを付けず、必要項目だけの簡潔なJSONオブジェクトを1個だけ返してください。description・trivia等をD1から補完する対象では、それらを重複生成しないでください。';"
new_stability = "  if (body.model === 'claude-sonnet-5' && barCarilaStage !== 'selection') body.system += '\\n\\n【最終JSON安定化】Claude Sonnet 5では前置き・後書き・Markdownコードフェンスを付けず、必要項目だけの簡潔なJSONオブジェクトを1個だけ返してください。description・trivia等をD1から補完する対象では、それらを重複生成しないでください。';"
if old_stability not in v19:
    raise SystemExit('v1.9 stability marker not found')
v19 = v19.replace(old_stability, new_stability, 1)
v19_path.write_text(v19)

Path('test/progressive-recommendation.test.mjs').write_text(r'''import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('guided final recommendation uses open-world Sonnet selection first', async () => {
  const source = await readFile(new URL('../public/assets/js/main.js', import.meta.url), 'utf8');
  assert.match(source, /getSelectionSystem/);
  assert.match(source, /barCarilaStage:forceRecommend\?'selection'/);
  assert.match(source, /maxTokens=forceRecommend\?320/);
  assert.match(source, /マスター外を含む実在する酒すべてから/);
  assert.match(source, /hydrateRecommendationDetails/);
  assert.match(source, /barCarilaStage:'details'/);
});

test('selection mode stays compact and does not append the large known-master list', async () => {
  const worker = await readFile(new URL('../src/worker.mjs', import.meta.url), 'utf8');
  const v19 = await readFile(new URL('../src/worker-v1.9.mjs', import.meta.url), 'utf8');
  assert.match(worker, /barCarilaStage !== 'selection'/);
  assert.match(worker, /delete body\.barCarilaStage/);
  assert.match(v19, /barCarilaStage === 'selection'/);
  assert.match(v19, /Math\.min\(Math\.max\(Number\(body\.max_tokens\)/);
  assert.match(v19, /既知マスターは候補の上限ではありません/);
});
''')
