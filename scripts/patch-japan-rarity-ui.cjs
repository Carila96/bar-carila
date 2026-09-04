const fs=require('fs');
const path='public/assets/js/main.js';
let s=fs.readFileSync(path,'utf8');
if(!s.includes("const DRINK_META_API='/api/drink-meta';")){
  s=s.replace("const API='/api/chat';\n", "const API='/api/chat';\nconst DRINK_META_API='/api/drink-meta';\nconst DRINK_META_CACHE_KEY='bar_carila_drink_meta_cache_v1';\n");
}
const helpers=`
function readDrinkMetaCache(){
  try{return JSON.parse(localStorage.getItem(DRINK_META_CACHE_KEY)||'{}')||{};}catch{return {};}
}
function getCachedDrinkMeta(name){
  const key=normDrinkName(name);return readDrinkMetaCache()[key]||null;
}
function saveDrinkMetaCache(name,meta){
  try{
    const key=normDrinkName(name);if(!key||!meta)return;
    const cache=readDrinkMetaCache();cache[key]={...meta,savedAt:Date.now()};
    const entries=Object.entries(cache).sort((a,b)=>(b[1]?.savedAt||0)-(a[1]?.savedAt||0)).slice(0,250);
    localStorage.setItem(DRINK_META_CACHE_KEY,JSON.stringify(Object.fromEntries(entries)));
  }catch{}
}
function applyDrinkMetaToCard(data,card){
  const apply=(meta)=>{
    if(!meta||!card)return;
    if(Number.isFinite(meta.rarity)){
      data.drink.rarity=meta.rarity;
      const fill=card.querySelector('.rarity-fill');if(fill)fill.style.width=meta.rarity+'%';
      const val=card.querySelector('.rarity-val');if(val)val.textContent=meta.rarity+'%';
    }
    const tag=card.querySelector('.rarity-tag');if(tag&&meta.rarityLabel)tag.textContent=meta.rarityLabel;
  };
  const cached=getCachedDrinkMeta(data?.drink?.name);if(cached)apply(cached);
  fetch(DRINK_META_API+'?name='+encodeURIComponent(data.drink.name))
    .then(r=>r.ok?r.json():null)
    .then(body=>{if(body?.found&&body.drink){saveDrinkMetaCache(data.drink.name,body.drink);apply(body.drink);}})
    .catch(()=>{});
}
`;
if(!s.includes('function applyDrinkMetaToCard(data,card)')){
  s=s.replace('function showRec(data){', helpers+'\nfunction showRec(data){');
}
s=s.replace('<span style="font-size:10px;white-space:nowrap;">${rarityTagLabel}</span>', '<span class="rarity-tag" style="font-size:10px;white-space:nowrap;">${rarityTagLabel}</span>');
if(!s.includes('applyDrinkMetaToCard(data,card);')){
  s=s.replace('  area.appendChild(card);\n\n  const recImgEl=', '  area.appendChild(card);\n  applyDrinkMetaToCard(data,card);\n\n  const recImgEl=');
}
const jpRule=`【絶対ルール1.5：希少度は日本のBAR基準】
rarityは「世界的に珍しいか」ではなく、「日本国内の一般的なBARでその一杯を実際に注文できる可能性の低さ」を0〜100で表す。
0に近いほど日本のBARで定番、100に近いほど日本では扱いがかなり限られる。
海外で定番でも日本の一般BARでは普遍的でない場合は希少度を高めにする。例：アペロールスプリッツなど。
逆に古典的・有名という理由だけで希少度を低くしない。材料の国内流通、一般BARでの常備、技法・仕込み、日本での実提供可能性を重視する。
通常のおすすめでは日本のBARで現実に注文しやすい一杯を優先するが、ユーザーが「珍しいもの」「変わったもの」を希望した場合は高希少度の一杯も提案してよい。
特定銘柄・限定品・特殊バリアントは、そのカテゴリ全体ではなく具体的な商品の日本での入手性で希少度を判断する。

`;
if(!s.includes('【絶対ルール1.5：希少度は日本のBAR基準】')){
  s=s.replace('【絶対ルール2：アルコール度数を厳守する】', jpRule+'【絶対ルール2：アルコール度数を厳守する】');
}
fs.writeFileSync(path,s);
const test=`import test from 'node:test';\nimport assert from 'node:assert/strict';\nimport fs from 'node:fs';\nconst source=fs.readFileSync(new URL('../public/assets/js/main.js',import.meta.url),'utf8');\ntest('BarCarila defines rarity using Japan bar availability',()=>{\n assert.match(source,/希少度は日本のBAR基準/);\n assert.match(source,/日本国内の一般的なBAR/);\n assert.match(source,/アペロールスプリッツ/);\n});\ntest('recommendation card asynchronously applies D1 drink metadata',()=>{\n assert.match(source,/DRINK_META_API='\\/api\\/drink-meta'/);\n assert.match(source,/applyDrinkMetaToCard\\(data,card\\)/);\n assert.match(source,/rarity-tag/);\n assert.match(source,/bar_carila_drink_meta_cache_v1/);\n});\n`;
fs.writeFileSync('test/japan-rarity-ui.test.mjs',test);
