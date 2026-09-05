// Final book-index gap reconciliation for v1.9.
// These rows were re-researched after the initial 386/400 validator exposed the missing book-index set.
// Each row is [canonical English name, availability, rarity, confidence].
// Current-menu evidence is preferred; recipe/reference-only evidence is kept lower-confidence and does not imply common availability.
export const JP_RARITY_V19_GAP = [
  ['Casino',50,50,0.84],
  ['Gordon',42,58,0.78],
  ['Smoky Martini',44,56,0.82],
  ['Dirty Martini',70,30,0.93],
  ['Texas Fizz',52,48,0.84],
  ['Third Degree',40,60,0.76],
  ['Bijou',42,58,0.86],
  ['Princess Mary',38,62,0.80],
  ['Vermoni',58,42,0.84],
  ['King Alfonso',56,44,0.94],
  ['Cloudy Coffee',38,62,0.76],
  ['Le Royal',38,62,0.84],
  ['Cherry Me Kiss',34,66,0.74],
  ['Dolce and Banana',34,66,0.74],
];

// Book-facing Japanese display names. Lookup identity stays English/canonical.
export const JP_RARITY_V19_GAP_JA_NAMES = new Map([
  ['Casino','カジノ'],
  ['Gordon','ゴードン'],
  ['Smoky Martini','スモーキー・マティーニ'],
  ['Dirty Martini','ダーティ・マティーニ'],
  ['Texas Fizz','テキサス・フィズ'],
  ['Third Degree','サード・ディグリー'],
  ['Bijou','ビジュー'],
  ['Princess Mary','プリンセス・メアリー'],
  ['Vermoni','ヴェルモーニ'],
  ['King Alfonso','キング・アルフォンソ'],
  ['Cloudy Coffee','クラウディ・コーヒー'],
  ['Le Royal','ル・ロワイヤル'],
  ['Cherry Me Kiss','チェリー・ミー・キッス'],
  ['Dolce and Banana','ドルチェ・アンド・バナナ'],
]);

export const JP_RARITY_V19_GAP_EVIDENCE = new Map([
  ['Casino',{grade:'reference+ingredient',note:'Japanese cocktail references confirm the classic gin/maraschino/citrus formula; strong current-menu density was not found, so availability remains mid-range.'}],
  ['Gordon',{grade:'reference+ingredient',note:'Japanese cocktail references confirm Gordon as gin + amontillado + pearl onion. Dedicated sherry plus onion limits ordinary-bar fulfillment.'}],
  ['Smoky Martini',{grade:'reference+manufacturer',note:'Japanese references and a domestic brand recipe confirm the name/style, but recipe variation exists and current-menu density is limited.'}],
  ['Dirty Martini',{grade:'current-menu',note:'A current Japanese hotel bar menu explicitly lists Dirty Martini; classic ingredients are broadly available, while olive/brine handling creates some shop variance.'}],
  ['Texas Fizz',{grade:'current-bartender-reference+ingredient',note:'A current Japanese bartender-operated reference confirms the drink. Ingredients are ordinary, but direct current-menu observations remain sparse.'}],
  ['Third Degree',{grade:'reference',note:'Japanese standard-reference presence is confirmed, but direct current-menu evidence is weak; kept below mid-range.'}],
  ['Bijou',{grade:'current-reference+ingredient',note:'Current Japanese-language cocktail coverage confirms the classic formula. Green Chartreuse availability constrains fulfillment outside cocktail-focused bars.'}],
  ['Princess Mary',{grade:'bartender-reference+operation',note:'Long-running Japanese bartender reference confirms the formula; cacao, cream and optional nutmeg plus dessert-cocktail handling reduce general availability.'}],
  ['Vermoni',{grade:'reference+ingredient',note:'Japanese reference presence and simple vermouth-based construction support moderate fulfillment, but current-menu density is not strong enough for a high score.'}],
  ['King Alfonso',{grade:'current-menu+reference',note:'A current Roppongi bar menu explicitly lists King Alfonso. Cacao liqueur and cream are the main constraints, so score is raised from the provisional value but not into common territory.'}],
  ['Cloudy Coffee',{grade:'reference+operation',note:'Japanese reference presence is confirmed; coffee/dessert service requirements and weak current-menu evidence keep availability low.'}],
  ['Le Royal',{grade:'reference+ingredient+operation',note:'Japanese cocktail references confirm chocolate liqueur, banana liqueur, curaçao and cream; multiple dedicated ingredients constrain ordinary-bar fulfillment.'}],
  ['Cherry Me Kiss',{grade:'reference-limited',note:'Book/reference identity is retained, but strong independent current-menu evidence was not found; conservative score and confidence.'}],
  ['Dolce and Banana',{grade:'reference-limited',note:'Book/reference identity is retained, but strong independent current-menu evidence was not found; dedicated banana/dessert ingredients constrain generalization.'}],
]);
