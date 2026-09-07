# Bar Carila ドリンクマスター拡張 Batch 01

Date: 2026-09-08
Evidence version: `jp-rarity-expansion-2026-09-08-b01`
Scope: initial 400-book-index source remains unchanged; this batch is an additive known-master layer.

## 追加対象

| masterKey | 日本語名 | availability | rarity | confidence | 主な成立制約 |
|---|---|---:|---:|---:|---|
| Paper Plane | ペーパープレイン | 35 | 65 | 0.84 | Amaro Nonino の常備 |
| Last Word | ラストワード | 34 | 66 | 0.82 | Green Chartreuse / Maraschino の常備 |
| Boulevardier | ブールヴァルディエ | 55 | 45 | 0.87 | 名称注文の定番度は中程度 |
| Espresso Martini | エスプレッソマティーニ | 52 | 48 | 0.86 | エスプレッソ抽出設備・運用 |
| Penicillin | ペニシリン | 36 | 64 | 0.83 | 生姜・蜂蜜の仕込み、Islay malt |
| Vesper | ヴェスパー | 45 | 55 | 0.84 | Lillet Blanc の常備 |

## 選定理由

いずれも初期400杯の book index には含まれない一方、国際的なプロフェッショナル参照で実在性と代表レシピを確認でき、日本国内でもメーカー公式情報または実BARの提供例を確認できるものを優先した。杯数の水増しではなく、Bar Carilaが実際に推薦しやすいモダンクラシック／クラシックの空白を埋めることを目的とする。

## 実在性・レシピ

- IBA Paper Plane: https://iba-world.com/iba-cocktail/paper-plane/
- IBA Last Word: https://iba-world.com/iba-cocktail/last-word/
- IBA Boulevardier: https://iba-world.com/iba-cocktail/boulevardier/
- IBA Espresso Martini: https://iba-world.com/iba-cocktail/espresso-martini/
- IBA Penicillin: https://iba-world.com/iba-cocktail/penicillin/
- IBA Vesper: https://iba-world.com/iba-cocktail/vesper/

IBAは公式カクテルリストを、世界のBARで用いられる代表レシピの標準化参照として位置づけている。本バッチではレシピのcanonical referenceとして使用した。

## 日本BAR成立性の根拠

### Paper Plane

- Bacardi Japan: https://www.bacardijapan.jp/cocktails/recipe/paper-plane/
- bar miyako: https://bar-miyako.com/2019/11/24/cocktail-paper-plane/

国内メーカー公式レシピがある一方、国内BAR側でAmaro Noninoの入手難が明示されているため、国際的な知名度より日本一般BARの成立率を低く評価した。

### Last Word

- BAR CIEL: https://www.ikebukurobarcher.com/fcblog/2025/05/12/%E3%82%AB%E3%82%AF%E3%83%86%E3%83%AB%E3%83%BB%E3%83%87%E3%82%A3%E3%82%AF%E3%82%B7%E3%83%A7%E3%83%8A%E3%83%AA%E3%83%BC%E3%80%80no-%EF%BC%91%EF%BC%91%E3%80%80%E3%83%A9%E3%82%B9%E3%83%88%E3%83%AF/
- BAR ALBA: https://baralba.jp/last-word/

国内複数BARで現行提供文脈を確認。ただしGreen ChartreuseとMaraschinoを両方必要とするため、一般BAR全体では店差が大きいと評価した。

### Boulevardier

- Wild Turkey Japan: https://www.wildturkeybourbon.com/ja-jp/cocktails/boulevardier/
- MHD / Hotel New Otani Bar Capri提供実績: https://prtimes.jp/main/html/rd/p/000000079.000024545.html

主要材料は日本でも流通が良く、メーカー公式レシピもある。一般名称注文の密度はNegroni等より低いため中程度のavailabilityとした。

### Espresso Martini

- Starbucks Reserve Japan: https://menu.starbucks.co.jp/4524785497283
- MHD / Hotel New Otani Bar Capri提供実績: https://prtimes.jp/main/html/rd/p/000000079.000024545.html

国内で明確な提供実績がある一方、一般的なオーセンティックBARが必ずしもエスプレッソ抽出設備を持つとは限らないため、材料よりオペレーションを主な制約とした。

### Penicillin

- BAR ALBA: https://baralba.jp/penicillin/
- Palace Hotel Tokyo Royal Bar紹介: https://trilltrill.jp/articles/4504260

国内BARで現行提供例を確認。生姜・蜂蜜の仕込みとアイラモルトのフロートを要するため、標準的な材料だけで即時成立するカクテルより低いavailabilityとした。

### Vesper

- BAR ALBA: https://baralba.jp/vespermartini/
- Bar OZ.: https://www.bar-oz.jp/article/1586

国内複数地域のBARで提供例を確認。ジンとウォッカは一般的だがLillet Blancの常備が成立率を下げる要因とした。

## 重複・alias方針

初期400杯の `BOOK_INDEX_V19_ROWS` とはcanonical keyで重複しないことをvalidatorで確認する。日本語表記・英語表記・主要表記揺れはaliasとして同一masterKeyへ寄せる。既存400杯のmasterKeyは変更しない。

## source-of-truth方針

`src/drink-master-v1.9-book-index.mjs` は2012年版『カクテル完全バイブル』400杯の監査済み初期ソースとして変更しない。拡張分は `src/drink-master-expansion-b01.mjs` に独立保持し、D1へadditive seedする。これにより初期400杯の監査可能性を維持しつつ、Growing Known Masterを実装する。

## 次バッチ候補

次回以降は、初期400杯・既存D1 seed・本バッチとの重複を除外した上で、IBA New Era / Unforgettables等から日本BAR成立性を複数根拠で評価できる酒を優先する。候補例として Bee's Knees, Bramble, Naked and Famous, Jungle Bird, Old Cuban, Hanky Panky, Martinez 等を調査対象とするが、検証前にknown masterへは登録しない。
