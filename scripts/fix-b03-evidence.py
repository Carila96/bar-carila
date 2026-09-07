from pathlib import Path
p=Path('src/drink-master-expansion-b03.mjs')
s=p.read_text()
old="      { type: 'jp_menu_reference', title: 'Bar domingo IBA official cocktail menu', url: 'https://www.hotpepper.jp/strJ000868031/drink/', note: 'IBA公認カクテル群の一つとして日本語名・英語名双方で注文可能な実例を確認。' },"
new="      { type: 'jp_recipe_reference', title: 'Spicy Fifty – Pocket Bartender', url: 'https://pocketbartender.app/ja/recipes/spicy-fifty/', note: '日本語レシピカタログで名称、材料、作り方の国内向け認知を補助確認。' },"
assert old in s
p.write_text(s.replace(old,new,1))
p=Path('docs/drink-master-expansion-2026-09-08-b03.md')
s=p.read_text()
s=s.replace('- Bar domingo: https://www.hotpepper.jp/strJ000868031/drink/\n\nIBA公式レシピ', '- Bar domingo: https://www.hotpepper.jp/strJ000868031/drink/\n- Pocket Bartender: https://pocketbartender.app/ja/recipes/spicy-fifty/\n\nIBA公式レシピ',1)
p.write_text(s)
