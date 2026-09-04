# BarCarila D1 酒マスター設計 v1

Status: PROVISIONAL implementation specification
Date: 2026-09-04

## 目的

BarCarilaの酒推薦で、毎回LLMに酒の基本説明・日本BAR希少度・注文時の注意まで生成させず、D1に保存した酒マスターを参照する。

バーテンダーCarilaは世界中の酒文化を扱うため、日本BAR希少度による候補制限は行わない。同じ酒マスターを共有しつつ、利用するフィールドと推薦ポリシーを分ける。

## 基本方針

- 酒そのものの固定/準固定情報はD1
- 日本BARでの希少度はD1
- 画像は既存 `drink_images` を利用
- ユーザーとの会話に依存する「なぜ今この一杯を選んだか」だけLLM
- 未登録酒は将来的に調査キューへ回せるが、推薦時にWeb検索を同期実行しない
- 評価値は更新可能にし、完全性より再評価可能性を優先する

## 推奨テーブル

### `drinks`

```sql
CREATE TABLE IF NOT EXISTS drinks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  canonical_key TEXT NOT NULL UNIQUE,
  name_ja TEXT NOT NULL,
  name_en TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  base_spirit TEXT NOT NULL DEFAULT '',
  drink_kind TEXT NOT NULL DEFAULT 'cocktail',

  japan_availability_score INTEGER,
  japan_rarity_score INTEGER,
  japan_rarity_label TEXT NOT NULL DEFAULT '',
  japan_rarity_confidence REAL,
  rarity_reason TEXT NOT NULL DEFAULT '',
  evidence_version TEXT NOT NULL DEFAULT '',
  evaluated_at TEXT,

  taste_summary TEXT NOT NULL DEFAULT '',
  origin_summary TEXT NOT NULL DEFAULT '',
  short_description TEXT NOT NULL DEFAULT '',
  order_hint TEXT NOT NULL DEFAULT '',

  global_popularity_score INTEGER,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);
```

### `drink_aliases`

```sql
CREATE TABLE IF NOT EXISTS drink_aliases (
  alias_key TEXT PRIMARY KEY,
  drink_id INTEGER NOT NULL,
  alias_text TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (drink_id) REFERENCES drinks(id)
);
```

目的は「モスコミュール / モスコー・ミュール / Moscow Mule」のような表記差を同一酒へ寄せること。画像キャッシュの `cache_key` とは将来的に `drink_id` で接続できる。

### `drink_evidence`

```sql
CREATE TABLE IF NOT EXISTS drink_evidence (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  drink_id INTEGER NOT NULL,
  evidence_type TEXT NOT NULL,
  source_title TEXT NOT NULL DEFAULT '',
  source_url TEXT NOT NULL DEFAULT '',
  source_note TEXT NOT NULL DEFAULT '',
  observed_at TEXT,
  weight TEXT NOT NULL DEFAULT 'supporting',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (drink_id) REFERENCES drinks(id)
);
```

`evidence_type` 例:
- `jp_bar_menu`
- `jp_professional_reference`
- `jp_distribution`
- `jp_manufacturer_reference`
- `book_reference`

ユーザー提供の『カクテル完全バイブル』は `book_reference` として記録可能。掲載だけで希少度を決定せず、「スタンダード24」等の文脈を `source_note` に保持する。

## スコアの扱い

`japan_rarity_score = 100 - japan_availability_score` を原則とする。

ラベルは当面:

- 0-14: 定番
- 15-29: 比較的よくある
- 30-49: やや珍しい
- 50-69: 珍しい
- 70-84: かなり珍しい
- 85-100: ごく一部の店

UIはスコアをそのまま表示できるが、内部では `confidence` を必ず保持する。

## BarCarilaでの利用

BarCarilaは候補をA/Bのように固定除外しない。

推薦候補には希少度の高い酒も含められる。ただしAIへ次を渡す。

- `japan_rarity_score`
- `japan_rarity_label`
- `rarity_reason`
- `order_hint`

ユーザーが「珍しいもの」を希望した場合は希少度を上げる方向に検索/選択できる。

通常希望では、日本BAR成立率が極端に低い候補を無自覚に「定番」と表現しない。

高希少度の候補を出す場合は、UI上で「店によっては扱いがない」ことを希少度表示によって自然に伝える。

## バーテンダーCarilaでの利用

バーテンダーCarilaは `japan_rarity_score` を候補制限には使わない。

世界の酒、地域酒、海外クラシック等を自由に扱える。必要な場面では「日本では珍しい」「海外では一般的」と説明するための参考情報としてのみ利用する。

将来 `global_popularity_score` や国別availabilityを追加可能にする。

## 固定文とAI文の分離

D1からそのまま使う:

- `short_description`
- `taste_summary`
- `origin_summary`
- `rarity_reason`
- `order_hint`

AIが生成する:

- 今回のユーザー回答との接続
- 今この酒を選んだ理由
- 必要な場合の自然な一言

推薦APIの理想形:

```json
{
  "drink": {
    "id": 123,
    "name": "アペロールスプリッツ",
    "rarity": 40,
    "rarityLabel": "やや珍しい",
    "shortDescription": "...",
    "tasteSummary": "...",
    "orderHint": "..."
  },
  "personalReason": "今日は軽くて苦甘いものを希望していたので、この一杯を選びました。"
}
```

この構造なら、酒の基礎説明を毎回LLM出力へ含める必要がない。

## 初期投入方針

最初から400種を完成させない。

Phase 1:
- キャリブレーション済み代表50杯
- canonical key / aliases
- 日本希少度
- confidence
- 最小限の固定文

Phase 2:
- BarCarilaで推薦された未登録酒を調査候補として追加
- 本書の収録酒や国内専門資料から段階的に拡張
- 100〜200杯へ増加

Phase 3:
- 銘柄/バリアントを必要に応じて分離
- `drink_id` と `drink_images` を正式に関連付け
- 国別availabilityを検討

## 銘柄・バリアント

MVPの `drinks` は「一杯/一般名称」を中心にする。

例:
- ラフロイグ → whisky/product
- ラフロイグ カスクストレングス → variant
- ジントニック → cocktail

具体銘柄や限定品は一般カクテルと同じ希少度ロジックに押し込まない。将来 `parent_drink_id` または別 `drink_variants` テーブルを追加する。

## 既存 `drink_images` との関係

現在の画像D1は `cache_key` ベースで独立運用されているため、今回の実装で壊さない。

次段階で:

1. `drinks.canonical_key` と画像キーを照合
2. 必要なら `drink_images` に `drink_id` を追加
3. 既存行は段階的にバックフィル

画像保存フローは既に稼働しているため、酒マスター導入時の必須変更にはしない。

## 実装順序

1. D1に `drinks`, `drink_aliases`, `drink_evidence` を追加
2. 代表50杯をseed
3. APIに酒マスター読取関数を追加
4. BarCarila推薦生成で酒マスター情報を参照
5. AIレスポンスから固定文生成責務を減らす
6. UIは既存レイアウトを大きく変えず、希少度値だけ新基準へ切替
7. レイアウト/文章量調整は後工程

## 未解決

- 代表50杯の固定説明文をどこまで人手/AI補助で初期生成するか
- 未登録酒をBarCarilaで許可する際のfallbackルール
- `global_popularity_score` の評価基準
- 銘柄・限定品の別テーブル化時期

これらはD1スキーマ導入を妨げないため、実装時に勝手に固定しない。
