// Final canonical source-gap research for jp-rarity-v1.9.
// Each row: [canonical English identity, Japan availability, Japan rarity, confidence].
// Scores estimate whether a competent ordinary Japanese bar can fulfill a name-order tonight.
// Current Japanese serving evidence is primary; where current menu density is weak, Japanese bartender/reference evidence
// plus ingredient/operation constraints determine a conservative score and lower confidence.

export const JP_RARITY_V19_FINAL_MISSING = [
  // Gin — 7
  ['J.F.K.',32,68,.74],
  ['Gin and Bitters',55,45,.84],
  ['Desert Healer',58,42,.91],
  ['Totty',32,68,.72],
  ['Bartender',38,62,.84],
  ['Beauty Spot',36,64,.76],
  ['Fallen Angel',54,46,.91],

  // Vodka — 18
  ['Angelo',36,64,.84],
  ['Old England',38,62,.80],
  ['Caribbean Cruise',32,68,.82],
  ['Gorky Park',36,64,.80],
  ['Cossack',46,54,.86],
  ['Southern Banger',46,54,.83],
  ['Gypsy',44,56,.85],
  ['Silver Wing',46,54,.86],
  ['Salt Lick',56,44,.89],
  ['Tovarisch',38,62,.81],
  ['Purple Passion',62,38,.92],
  ['Blue Monday',48,52,.84],
  ['Bull Shot',50,50,.90],
  ['Polonaise',40,60,.82],
  ['Midnight Sun',34,66,.72],
  ['Russian',36,64,.76],
  ['Road Runner',42,58,.85],
  ['Roberta',42,58,.84],

  // Rum — 6
  ['Eggnog',34,66,.82],
  ['Sonora',38,62,.85],
  ['Parisian Blonde',54,46,.92],
  ['Platinum Blonde',46,54,.89],
  ['Polar Short Cut',62,38,.96],
  ['Mary Pickford',62,38,.96],

  // Tequila — 7
  ['Mockingbird',72,28,.97],
  ['Acapulco (Tequila)',34,66,.84],
  ['Evergreen',40,60,.84],
  ['Grand Marnier Margarita',52,48,.88],
  ['Hermes',34,66,.76],
  ['Margarita Cosmo',42,58,.82],
  ['La Rumeur',30,70,.80],

  // Whisky — 11
  ['Whisper',38,62,.78],
  ['Wedding Bell (Dry)',34,66,.74],
  ['Klondike Cooler',68,32,.96],
  ['Cablegram',62,38,.94],
  ['Kentucky',44,56,.82],
  ['St. Andrews',58,42,.93],
  ['Blinker',42,58,.82],
  ['Benedict',36,64,.78],
  ['Bonnie Scot',34,66,.76],
  ['Miami Beach',42,58,.82],
  ['Misty Nail',58,42,.94],

  // Brandy — 1
  ['Willy Smith',32,68,.74],

  // Liqueur — 9
  ['Advantage',42,58,.85],
  ['Charlie Chaplin',64,36,.97],
  ['Golden Slipper',38,62,.84],
  ['Primera',44,56,.84],
  ['Amore',40,60,.80],
  ['Pink Squirrel',60,40,.95],
  ['Fifth Avenue',40,60,.80],
  ["Mother's Love",34,66,.74],
  ['Mami',32,68,.74],
];

export const JP_RARITY_V19_FINAL_MISSING_EVIDENCE = new Map([
  ['J.F.K.', { grade:'japanese-reference-limited', note:'Book identity retained; searches are heavily contaminated by the person/airport initials and strong independent current-menu evidence was not found. Conservative score/confidence.' }],
  ['Gin and Bitters', { grade:'standard-reference+easy-operation', note:'Classic gin-and-bitters construction is operationally trivial once aromatic bitters are stocked; name-order density in Japan is below top classics.' }],
  ['Desert Healer', { grade:'current-menu+reference', note:'Current/active Japanese bar menu evidence plus consistent Japanese recipe references; cherry brandy is the main stock constraint.' }],
  ['Totty', { grade:'japanese-reference-limited', note:'Book identity is clear but the name is search-noisy and direct current-menu evidence is weak; conservative score.' }],
  ['Bartender', { grade:'active-bartender-reference+special-stock', note:'Japanese operating-bar/bartender references reproduce the canonical gin, vermouth, sherry/Dubonnet formula; multiple specialty bottles constrain ordinary fulfillment.' }],
  ['Beauty Spot', { grade:'japanese-reference-limited', note:'Recognized classic identity but weak current serving density in Japanese menus; retained below midrange.' }],
  ['Fallen Angel', { grade:'current-menu', note:'BAR WHITE OAK in Ginza actively presents Fallen Angel with the classic gin/lemon/bitters profile; mint bitters remains a stock constraint.' }],

  ['Angelo', { grade:'current-reference+special-stock', note:'Multiple current Japanese recipe references agree on vodka, Galliano, Southern Comfort, orange and pineapple; two specialty liqueurs limit generalization.' }],
  ['Old England', { grade:'japanese-reference', note:'Japanese cocktail reference confirms the identity; direct current-menu density is weak.' }],
  ['Caribbean Cruise', { grade:'japanese-reference+special-stock', note:'Japanese reference confirms vodka/pineapple/coconut/green-banana style; multiple dedicated tropical ingredients reduce ordinary fulfillment.' }],
  ['Gorky Park', { grade:'japanese-reference+operation', note:'Japanese cocktail reference confirms a blended vodka cocktail; weak current menu density and blender operation reduce availability.' }],
  ['Cossack', { grade:'current-reference+moderate-stock', note:'Recent Japanese references confirm vodka/brandy/lime/sugar construction; ingredients are feasible in cocktail bars but name-order density is modest.' }],
  ['Southern Banger', { grade:'japanese-reference+moderate-stock', note:'Canonical vodka/Southern Comfort/orange identity is consistent; Southern Comfort stock is the main constraint.' }],
  ['Gypsy', { grade:'japanese-reference+special-stock', note:'Vodka/Benedictine/bitters identity is stable; Benedictine availability limits unobserved ordinary bars.' }],
  ['Silver Wing', { grade:'japanese-reference+easy-operation', note:'Japanese reference confirms vodka/Cointreau/dry-vermouth style; operationally easy but weak direct menu density.' }],
  ['Salt Lick', { grade:'operating-bar-reference+easy-operation', note:'Japanese operating-bar video/reference evidence and a simple vodka/grapefruit/tonic/salt build support moderate orderability.' }],
  ['Tovarisch', { grade:'japanese-reference', note:'Established Japanese reference presence, but current independent serving evidence is weak.' }],
  ['Purple Passion', { grade:'current-menu+easy-operation', note:'Current Japanese bar menu evidence plus an easy vodka/grape/grapefruit style supports above-midrange fulfillment.' }],
  ['Blue Monday', { grade:'japanese-reference+common-stock', note:'Recognized vodka cocktail with broadly obtainable ingredients, but limited current name-order evidence.' }],
  ['Bull Shot', { grade:'institutional-menu+operation', note:'Longstanding Japanese bar/institutional serving evidence; beef bouillon/consomme preparation materially constrains ordinary fulfillment.' }],
  ['Polonaise', { grade:'japanese-reference', note:'Japanese standard-reference presence is clear; direct current-menu density remains weak.' }],
  ['Midnight Sun', { grade:'identity-collision+reference', note:'Multiple Japanese recipes use the same name with differing formulas; ambiguity materially lowers confidence and name-order predictability.' }],
  ['Russian', { grade:'japanese-reference-limited', note:'Book identity is established but the generic name creates search noise and current serving density is weak.' }],
  ['Road Runner', { grade:'current-reference+special-stock', note:'Recent Japanese reference confirms vodka/amaretto/coconut-milk cocktail; coconut milk and dessert operation constrain ordinary fulfillment.' }],
  ['Roberta', { grade:'japanese-reference', note:'Japanese reference confirms the vodka cocktail identity; weak current independent menu density keeps score moderate-low.' }],

  ['Eggnog', { grade:'reference+food-safety-operation', note:'Rum eggnog is a recognized classic, but egg/dairy handling and preparation are major ordinary-bar constraints.' }],
  ['Sonora', { grade:'current-reference+special-stock', note:'Recent Japanese bar/reference confirms rum plus apple brandy/apricot; multiple fruit brandies lower generalization.' }],
  ['Parisian Blonde', { grade:'current-menu', note:'A current Japanese rum bar menu explicitly lists Parisian Blonde; specialty ingredients keep it below common rum classics.' }],
  ['Platinum Blonde', { grade:'current-menu+cream', note:'Current Japanese bar menu explicitly lists the canonical rum/curacao/cream style; cream adds an operational constraint.' }],
  ['Polar Short Cut', { grade:'multiple-current-menus+NBA-reference', note:'Multiple Japanese current menus plus NBA-linked reference; four-bottle build is specialized but real fulfillment is well demonstrated.' }],
  ['Mary Pickford', { grade:'multiple-current-menus', note:'Multiple current Japanese bar menus explicitly serve Mary Pickford; pineapple/maraschino stock still creates some shop variance.' }],

  ['Mockingbird', { grade:'multiple-current-menus', note:'Several Japanese operating bar menus explicitly list Mockingbird; ingredients and technique are straightforward for cocktail bars.' }],
  ['Acapulco (Tequila)', { grade:'japanese-reference+identity-collision+special-operation', note:'Japanese reference confirms a distinct tequila/rum/pineapple/grapefruit/coconut recipe. Same-name rum variant plus coconut/garnish requirements lower name-order fulfillment.' }],
  ['Evergreen', { grade:'current-reference+special-stock', note:'Recent Japanese reference confirms the identity; mint/tropical ingredients and weak current menu density constrain availability.' }],
  ['Grand Marnier Margarita', { grade:'structural-analogue+ingredient', note:'A Margarita variant using widely distributed Grand Marnier; easy for a stocked cocktail bar, but exact name-order density is below Margarita.' }],
  ['Hermes', { grade:'japanese-reference-limited', note:'Book/Japanese reference identity retained; strong current menu evidence was not found, so score and confidence remain low.' }],
  ['Margarita Cosmo', { grade:'japanese-reference+structural-analogue', note:'Recognized Margarita/Cosmopolitan-derived construction with obtainable ingredients; exact name-order evidence is limited.' }],
  ['La Rumeur', { grade:'book-confirmed+reference-limited', note:'Exact uploaded-book recipe identity confirmed; independent current Japanese serving evidence is sparse, so conservative score.' }],

  ['Whisper', { grade:'japanese-reference-limited', note:'Book identity is established; the generic name is search-noisy and current serving density is weak.' }],
  ['Wedding Bell (Dry)', { grade:'book-identity+reference-limited', note:'Whisky-section dry Wedding Bell is disambiguated from other namesakes; weak current serving evidence keeps score low.' }],
  ['Klondike Cooler', { grade:'multiple-current-menus+manufacturer-reference', note:'Multiple Japanese bar menus plus Suntory reference; Canadian whisky/orange/ginger build is operationally easy.' }],
  ['Cablegram', { grade:'current-menu+reference', note:'Active Japanese bar recommendation/menu evidence plus a straightforward whisky/citrus/ginger build supports good fulfillment.' }],
  ['Kentucky', { grade:'japanese-reference+common-spirit', note:'Recognized bourbon/whisky cocktail identity; ingredients are generally feasible but current name-order density is limited.' }],
  ['St. Andrews', { grade:'current-menu+active-bar-reference', note:'Current Japanese menu/reference evidence; Drambuie is the principal specialty-stock constraint.' }],
  ['Blinker', { grade:'japanese-reference+moderate-stock', note:'Classic whisky/grapefruit/raspberry-style identity; ingredients are feasible but direct current Japanese menu density is limited.' }],
  ['Benedict', { grade:'japanese-reference+special-stock', note:'Recognized whisky cocktail using specialty liqueur; weak direct current-menu density.' }],
  ['Bonnie Scot', { grade:'japanese-reference-limited', note:'Book identity confirmed but strong current Japanese serving evidence was not found.' }],
  ['Miami Beach', { grade:'japanese-reference+moderate-stock', note:'Recognized whisky cocktail with manageable ingredients; limited exact name-order density keeps it mid-low.' }],
  ['Misty Nail', { grade:'current-menu+special-stock', note:'Current Japanese restaurant/bar menu explicitly lists Misty Nail; Irish Mist availability remains the main constraint.' }],

  ['Willy Smith', { grade:'book-confirmed+reference-limited', note:'Brandy-section identity is confirmed but the common personal-name phrase is search-noisy and current serving evidence is weak.' }],

  ['Advantage', { grade:'current-reference+domestic-liqueur', note:'Japanese reference confirms cherry brandy + apricot liqueur (杏露酒) + grapefruit; ingredients are obtainable but current menu density is limited.' }],
  ['Charlie Chaplin', { grade:'multiple-current-menus', note:'Multiple current Japanese bar menus explicitly list the canonical apricot/sloe-gin/lemon cocktail.' }],
  ['Golden Slipper', { grade:'reference+special-stock', note:'Japanese alcohol reference confirms the dessert cocktail; Goldwasser + yellow Chartreuse are both dedicated-stock constraints.' }],
  ['Primera', { grade:'japanese-reference', note:'Current Japanese cocktail database confirms identity; limited direct serving-menu density keeps it moderate-low.' }],
  ['Amore', { grade:'japanese-reference-limited', note:'Book/reference identity is clear but current Japanese serving evidence is sparse.' }],
  ['Pink Squirrel', { grade:'current-menu', note:'Current Roppongi KENTO’S menu explicitly lists Pink Squirrel; dairy and apricot/cacao liqueur stock create some variance.' }],
  ['Fifth Avenue', { grade:'japanese-reference-limited', note:'Cocktail identity is recognized but searches are heavily contaminated by venue/place names; weak same-recipe current-menu evidence.' }],
  ["Mother's Love", { grade:'book-confirmed+reference-limited', note:'Book identity retained; exact-name searches are noisy and independent current-menu evidence is weak.' }],
  ['Mami', { grade:'book-confirmed+reference-limited', note:'Book identity retained; short generic name creates substantial search contamination and weak current-menu evidence.' }],
]);
