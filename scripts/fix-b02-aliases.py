from pathlib import Path
p=Path('src/drink-master-expansion-b02.mjs')
s=p.read_text()
s=s.replace("aliases: [\"Bee's Knees\", 'Bees Knees', 'ビーズ・ニーズ'],", "aliases: [\"Bee's Knees\", 'Bees Knees'],")
s=s.replace("aliases: ['Jungle Bird', 'ジャングル・バード'],", "aliases: ['Jungle Bird'],")
s=s.replace("aliases: ['Hanky Panky', 'Hankey Pankey', 'ハンキーパンキー'],", "aliases: ['Hanky Panky', 'Hankey Pankey'],")
p.write_text(s)
