# PROJECT_STATUS

最終更新: 2026-10-09
現在のbranch: `main`

## 現在地
- Cloudflare D1 Freeの日次rows readが2026-10-09 20:33 JST時点で `5.1M / 5M` に到達。
- D1一覧の当日query回数で `bar-carila-drink-images` が約30kと突出。`moshimo-box` 約2.23k、`carilaworks-registry` 約2.19k、SIXSHIFTは当日0だった。
- `bar-carila-drink-images` は画像だけでなく `DRINK_DB` として1500杯の酒マスターも保持している。
- PR #121で、静的/非chat requestまでB09〜B41の33 batch確認を起動していたrequest stormを解消してMerge済み。
- PR #122で、`/api/chat` 内に残っていた固定masterのrequest-time DDL/seed/COUNTもread-only runtime gateで除去してMerge済み。
- latest main: `2571bf56577832cbf0b2f1a2e699ab92a9b68a81`（PR #122 merge時点。本文更新commitはこの後のmainに積まれる）。

## 今回の追加軽量化
- 1500杯Known Masterは既にRepository内versioned sourceとして固定保持されており、通常chat requestでschema作成・seed・batch存在確認を繰り返す必要はない。
- `/api/chat` に渡す `DRINK_DB` をruntime read-only wrapper化。
- request-timeの以下をD1へ送らない:
  - `CREATE/ALTER/DROP` for `drinks / drink_aliases / drink_evidence`
  - master seed `INSERT/UPDATE/DELETE/REPLACE`
  - B01〜B41等の `SELECT COUNT(*) ... evidence_version` seed確認
  - seed時だけ使う `SELECT id FROM drinks WHERE canonical_key=?`
- 実際の推薦で必要な `canonical_key` / aliasのindexed read-only lookupは従来どおりD1へ通すため、AIのlean-output契約・既存説明/希少度enrichmentを壊さない。
- これにより、管理表を毎回読む方式よりさらに軽く、通常の既知酒推薦は「全master健全性確認」ではなく対象酒のpoint lookupだけに限定する。
- 将来的には固定masterを完全static lookupへ移し、master D1 read自体を0にできる余地を残す。ただし現段階では出力品質と既存D1 copy情報を維持するため、indexed point lookupは残す。

## 画像D1方針
- `drink_images` は後から変わる永続cacheなのでD1継続が妥当。
- Cloudflare Cache HIT時はD1 0。
- edge cache MISS時のみ `cache_key` point lookupを行う。
- 未知画像のみUnsplash取得→D1保存。
- `drink_images` は今回のmaster read-only wrapper対象外。

## 影響
- Open Recommendation、1500杯Known Master、rarity/description/trivia enrichment、Realtime voice、画像、affiliate、UI契約は維持。
- D1 schema/data削除なし。
- master更新はユーザーrequest中にseedする設計から切り離す方向へ統一する。

## 検証
- PR #121 final CI run #838: `npm test` + `validate:drink-master-v1.9` SUCCESS、Merge済み。
- PR #122 final CI run #840: `npm test` + `validate:drink-master-v1.9` SUCCESS、Merge済み。
- `test/d1-master-readonly-runtime.test.mjs` で、seed COUNT/writeはunderlying D1へ到達せず、indexed master readとdrink_images SQLは通ることを契約化。

## 次
1. CARILA WORKS ControlからBAR CARILA公開版を更新。
2. 翌reset後、`bar-carila-drink-images` query/rows-readを比較。
3. BAR収束後、SIXSHIFTの4.5秒pollingをevent-driven寄りへ再設計する。

## DELTA
DEPENDENCY DELTA: NONE
ROUTE DELTA: `/api/chat`のみread-only master D1 wrapperを使用。
ACTIONS DELTA: Draft中skip、Ready時に既存最終CI 1回のみ。
D1 DELTA: request-time master seed/DDL/COUNTを0化。実推薦はindexed point lookupのみ維持。画像D1は従来どおり。
LEGACY CLEANUP: user request中に固定1500杯masterの完全性を再確認・seedする設計をruntimeから排除。

## Handoff
2026-10-09のD1枯渇主因としてBAR Carilaの約30k query stormを数量的に特定。PR #121でnon-chat stormを停止し、PR #122でchat内の固定master maintenanceも停止。Production反映後はBAR D1が大幅減少する想定。固定masterの完全static化はさらに可能だが、現段階では出力品質を維持しつつ十分大きな削減が得られるread-only point lookupを採用する。次はProduction反映→翌reset後のD1実測、その後SIXSHIFTのpolling再設計。
