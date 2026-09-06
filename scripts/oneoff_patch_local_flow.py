from pathlib import Path

p = Path('public/assets/js/main.js')
s = p.read_text(encoding='utf-8')

anchor = "function initialHistory(){return [{role:'user',content:t().startMsg},{role:'assistant',content:JSON.stringify(initialAssistantPayload())}];}\n"
if anchor not in s:
    raise SystemExit('initialHistory anchor not found')

block = '''function initialHistory(){return [{role:'user',content:t().startMsg},{role:'assistant',content:JSON.stringify(initialAssistantPayload())}];}

const LOCAL_FLOW_COPY={
  ja:{
    cocktail:[
      {message:'まず、アルコールの強さはどのくらいがよいですか？',choices:['ほぼ飲めない・ノンアルがいい','ビール・チューハイくらい','ワインや焼酎くらい（12〜25%程度）','ウイスキーのストレートも平気（40%前後）']},
      {message:'今夜はどんな味のイメージですか？',choices:['甘め・まろやか','さっぱり・軽やか','ほろ苦い・香り高い','お任せで']},
      {message:'今夜はどんな夜ですか？',choices:['ゆったりリラックスしたい','特別な夜を楽しみたい','少し冒険してみたい','定番の安心感がほしい']},
    ],
    recommend:[
      {message:'まず、アルコールの強さはどのくらいがよいですか？',choices:['ほぼ飲めない・ノンアルがいい','ビール・チューハイくらい','ワインや焼酎くらい（12〜25%程度）','ウイスキーのストレートも平気（40%前後）']},
      {message:'今夜はどんな味のイメージですか？',choices:['甘め・まろやか','さっぱり・軽やか','濃いめ・どっしり','癖のある個性的なもの']},
      {message:'今夜はどんな夜ですか？',choices:['ゆったりリラックスしたい','特別な夜を楽しみたい','少し冒険してみたい','定番の安心感がほしい']},
    ],
    nonAlcohol:[
      {message:'今夜はどんな味のイメージですか？',choices:['甘め・フルーティ','さっぱり・爽やか','ほろ苦い・大人っぽい','お任せで']},
      {message:'今夜はどんな夜ですか？',choices:['ゆったりリラックスしたい','特別な夜を楽しみたい','少し冒険してみたい','定番の安心感がほしい']},
    ],
    spirits:{
      q1:{message:'何をお探しですか？',choices:['ウイスキーを探したい','ウイスキー以外の洋酒を探したい','まだ決まっていない']},
      q2:{message:'ウイスキー・お酒はどのくらい飲まれますか？',choices:['ほぼ初めてです','たまに飲みます','よく飲みます','詳しいです']},
      q3:{message:'今夜はどんな味のイメージですか？',choices:['甘め・まろやか','さっぱり・軽やか','濃いめ・どっしり','癖のある個性的なもの']},
      q4:{message:'個性的な方向なら、どれが気になりますか？',choices:['燻製のような香り','スパイシー・ビリッとくる','フルーティ・華やか','どれも試してみたい']},
      q5:{message:'今夜はどんな夜ですか？',choices:['ゆったりリラックスしたい','特別な夜を楽しみたい','少し冒険してみたい','定番の安心感がほしい']},
    },
  },
  en:{
    cocktail:[
      {message:'How strong would you like it?',choices:['No alcohol','Beer or chu-hi strength','Wine or shochu strength (about 12-25%)','Whisky neat is fine (around 40%)']},
      {message:'What flavor are you in the mood for?',choices:['Sweet and mellow','Fresh and light','Bittersweet and aromatic','Surprise me']},
      {message:'What kind of night is it?',choices:['A relaxed night','A special night','I want a little adventure','Something reliably classic']},
    ],
    recommend:[
      {message:'How strong would you like it?',choices:['No alcohol','Beer or chu-hi strength','Wine or shochu strength (about 12-25%)','Whisky neat is fine (around 40%)']},
      {message:'What flavor are you in the mood for?',choices:['Sweet and mellow','Fresh and light','Rich and full','Something distinctive']},
      {message:'What kind of night is it?',choices:['A relaxed night','A special night','I want a little adventure','Something reliably classic']},
    ],
    nonAlcohol:[
      {message:'What flavor are you in the mood for?',choices:['Sweet and fruity','Fresh and refreshing','Bittersweet and grown-up','Surprise me']},
      {message:'What kind of night is it?',choices:['A relaxed night','A special night','I want a little adventure','Something reliably classic']},
    ],
    spirits:{
      q1:{message:'What are you looking for?',choices:['Whisky','Another spirit','Not sure yet']},
      q2:{message:'How familiar are you with whisky and spirits?',choices:['Almost new to them','I drink them sometimes','I drink them often','I know them well']},
      q3:{message:'What flavor are you in the mood for?',choices:['Sweet and mellow','Fresh and light','Rich and full','Something distinctive']},
      q4:{message:'Which kind of distinctive character sounds best?',choices:['Smoky','Spicy','Fruity and floral','I want to try anything']},
      q5:{message:'What kind of night is it?',choices:['A relaxed night','A special night','I want a little adventure','Something reliably classic']},
    },
  },
};

let localFlow=null;
function localFlowRoute(text){
  const i=t().initialChoices.indexOf(text);
  return ['recommend','cocktail','spirits','nonAlcohol'][i]||null;
}
function localQuestions(route,answers=[]){
  const copy=LOCAL_FLOW_COPY[lang]||LOCAL_FLOW_COPY.ja;
  if(route!=='spirits')return copy[route]||[];
  const q=[copy.spirits.q1,copy.spirits.q2,copy.spirits.q3];
  if(answers[2]===copy.spirits.q3.choices[3])q.push(copy.spirits.q4);
  q.push(copy.spirits.q5);
  return q;
}
function presentLocalQuestion(question){
  const payload={type:'question',emotion:'think',message:question.message,choices:question.choices};
  chatHistory.push({role:'assistant',content:JSON.stringify(payload)});
  localFlow.currentChoices=question.choices;
  setPanda('think');showMsg(question.message);showChoices(question.choices);
}
async function handleLocalChoice(text){
  if(!localFlow){
    const route=localFlowRoute(text);
    if(!route)return false;
    chatHistory.push({role:'user',content:text});
    localFlow={route,answers:[],step:0,currentChoices:[]};
    const first=localQuestions(route,[])[0];
    if(!first){localFlow=null;return false;}
    presentLocalQuestion(first);
    return true;
  }
  if(!localFlow.currentChoices.includes(text)){
    localFlow=null;
    return false;
  }
  chatHistory.push({role:'user',content:text});
  localFlow.answers.push(text);
  localFlow.step+=1;
  const questions=localQuestions(localFlow.route,localFlow.answers);
  if(localFlow.step<questions.length){
    presentLocalQuestion(questions[localFlow.step]);
    return true;
  }
  localFlow=null;
  showLoading();
  try{
    const r=await callAPI(null,true);
    if(r.type==='question'){
      setPanda(r.emotion||'think');showMsg(r.message);showChoices(r.choices);
    }else{showRec(r);}
  }catch(e){showChatError(e);}
  return true;
}
'''
s = s.replace(anchor, block, 1)

old = "async function callAPI(userMsg){\n  if(userMsg)chatHistory.push({role:'user',content:userMsg});\n  const userTurns=chatHistory.filter(m=>m.role==='user').length;\n  const fastTurn=userTurns<4;"
new = "async function callAPI(userMsg,forceRecommend=false){\n  if(userMsg)chatHistory.push({role:'user',content:userMsg});\n  const userTurns=chatHistory.filter(m=>m.role==='user').length;\n  const fastTurn=!forceRecommend&&userTurns<4;"
if old not in s:
    raise SystemExit('callAPI anchor not found')
s = s.replace(old, new, 1)

old = "async function handleInput(text){\n  if(isLoading)return;isLoading=true;\n  const lastMsg=document.getElementById('msgText').innerText||'';\n  if(lastMsg&&lastMsg.length>5&&!lastMsg.includes('●'))\n    convLog.push({q:lastMsg.substring(0,50)+(lastMsg.length>50?'…':''),a:text});\n  showLoading();\n  try{\n    const r=await callAPI(text);"
new = "async function handleInput(text){\n  if(isLoading)return;isLoading=true;\n  const lastMsg=document.getElementById('msgText').innerText||'';\n  if(lastMsg&&lastMsg.length>5&&!lastMsg.includes('●'))\n    convLog.push({q:lastMsg.substring(0,50)+(lastMsg.length>50?'…':''),a:text});\n  const handledLocally=await handleLocalChoice(text);\n  if(handledLocally){isLoading=false;return;}\n  showLoading();\n  try{\n    const r=await callAPI(text);"
if old not in s:
    raise SystemExit('handleInput anchor not found')
s = s.replace(old, new, 1)

old = "function startChat(){\n  isLoading=false;\n  chatHistory=initialHistory();\n  setPanda('counter');showMsg(t().initialMsg);showChoices(t().initialChoices);\n  prewarmFastModel();\n}"
new = "function startChat(){\n  isLoading=false;\n  localFlow=null;\n  chatHistory=initialHistory();\n  setPanda('counter');showMsg(t().initialMsg);showChoices(t().initialChoices);\n}"
if old not in s:
    raise SystemExit('startChat anchor not found')
s = s.replace(old, new, 1)
p.write_text(s, encoding='utf-8')

tp = Path('test/worker.test.mjs')
t = tp.read_text(encoding='utf-8')
t = t.replace("assert.match(html, /const fastTurn=userTurns<4/);", "assert.match(html, /const fastTurn=!forceRecommend&&userTurns<4/);")
marker = "test('drink image fails safely when its secret is missing'"
if marker not in t:
    raise SystemExit('test insertion marker not found')
extra = r'''test('choice-based recommendation flow stays local until the final Sonnet request', async () => {
  const html = await readFile(new URL('../public/assets/js/main.js', import.meta.url), 'utf8');
  assert.match(html, /const LOCAL_FLOW_COPY=/);
  assert.match(html, /async function handleLocalChoice\(text\)/);
  assert.match(html, /const handledLocally=await handleLocalChoice\(text\)/);
  assert.match(html, /callAPI\(null,true\)/);
  assert.match(html, /const fastTurn=!forceRecommend&&userTurns<4/);
  assert.match(html, /localFlow=null;\n  chatHistory=initialHistory\(\)/);
  assert.doesNotMatch(html, /showChoices\(t\(\)\.initialChoices\);\n  prewarmFastModel\(\)/);
});

'''
t = t.replace(marker, extra + marker, 1)
tp.write_text(t, encoding='utf-8')
