from pathlib import Path
p=Path('src/drink-master-expansion-b03.mjs')
s=p.read_text()
start=s.index("  {\n    masterKey: 'Clover Club',")
end=s.index("  {\n    masterKey: 'Pisco Sour',", start)
replacement="""  {
    masterKey: 'Spicy Fifty',
    nameJa: 'スパイシー・フィフティ',
    aliases: ['Spicy Fifty'],
    category: 'cocktail',
    baseSpirit: 'vodka',
    drinkKind: 'cocktail',
    availability: 36,
    rarity: 64,
    rarityLabel: '珍しい',
    confidence: 0.88,
    rarityReason: '国内BARでIBA公認カクテルとして現行メニュー掲載を確認できるが、バニラウォッカまたはバニラ運用、エルダーフラワー、蜂蜜、唐辛子を揃える必要があり一般BARでは店差が大きい。',
    shortDescription: 'バニラウォッカ、エルダーフラワー、ライム、蜂蜜に唐辛子を効かせる甘辛いモダンクラシック。',
    orderHint: 'バニラとエルダーフラワー、唐辛子を使うIBAカクテルとして確認すると伝わりやすい。',
    imageQuery: 'Spicy Fifty cocktail vanilla vodka chili elderflower',
    recipe: {
      ingredients: [
        { name: 'Vanilla Vodka', amount: '50ml' },
        { name: 'Elderflower Cordial', amount: '15ml' },
        { name: 'Fresh Lime Juice', amount: '15ml' },
        { name: 'Honey Syrup', amount: '10ml' },
        { name: 'Red Chili Pepper', amount: '2 thin slices' },
      ],
      method: '全材料を氷とともによくシェイクし、冷やしたカクテルグラスへダブルストレインする。',
    },
    evidence: [
      { type: 'international_professional_reference', title: 'Spicy Fifty – IBA', url: 'https://iba-world.com/iba-cocktail/spicy-fifty/', note: 'IBA公式レシピで実在性・標準構成を確認。' },
      { type: 'jp_bar_reference', title: 'Bar domingo ドリンクメニュー', url: 'https://www.hotpepper.jp/strJ000868031/drink/', note: '国内BARでSpicy Fiftyの現行メニュー掲載と材料構成を確認。' },
      { type: 'jp_menu_reference', title: 'Bar domingo IBA official cocktail menu', url: 'https://www.hotpepper.jp/strJ000868031/drink/', note: 'IBA公認カクテル群の一つとして日本語名・英語名双方で注文可能な実例を確認。' },
    ],
  },
"""
s=s[:start]+replacement+s[end:]
s=s.replace("aliases: ['South Side', 'Southside']", "aliases: ['South Side']", 1)
p.write_text(s)

p=Path('docs/drink-master-expansion-2026-09-08-b03.md')
s=p.read_text()
s=s.replace('| Clover Club | クローバー・クラブ | 55 | 45 | 0.88 | ラズベリーシロップ・卵白運用 |','| Spicy Fifty | スパイシー・フィフティ | 36 | 64 | 0.88 | バニラウォッカ・エルダーフラワー・唐辛子 |')
old="""### Clover Club
- DRINK PLANET: https://www.drinkplanet.jp/cocktail_todays/view/24
- Bar Leaf: https://barleaf2020.com/menu/

国内BARメニューで現行掲載があり、材料も概ね一般的。ただしラズベリーシロップと卵白運用で店差が出るためavailability 55。
"""
new="""### Spicy Fifty
- IBA: https://iba-world.com/iba-cocktail/spicy-fifty/
- Bar domingo: https://www.hotpepper.jp/strJ000868031/drink/

IBA公式レシピと国内BARの現行メニュー掲載を確認。バニラウォッカまたはバニラ運用、エルダーフラワー、蜂蜜、唐辛子が必要で一般BARでは店差が大きいためavailability 36。
"""
assert old in s
s=s.replace(old,new,1)
s=s.replace('Clover Club – IBA: https://iba-world.com/iba-cocktail/clover-club/','Spicy Fifty – IBA: https://iba-world.com/iba-cocktail/spicy-fifty/',1)
p.write_text(s)
