# PROJECT_STATUS

最終更新: 2026-10-09
現在のbranch: `fix/d1-request-storm-20261009`

## 現在地
- Cloudflare D1 Freeの日次rows readが2026-10-09 20:33 JST時点で `5.1M / 5M` に到達。
- D1一覧の当日query回数で `bar-carila-drink-images` が約30kと突出。`moshimo-box` 約2.23k、`carilaworks-registry` 約2.19k、SIXSHIFTは当日0だった。
- `bar-carila-drink-images` は画像だけでなく `DRINK_DB` として1500杯の酒マスターも保持している。
- Production entry `src/worker-carila-realtime.mjs` が、Realtime以外の全requestを `worker-v1.9-expansions.mjs` に委譲していた。
- expansion workerはfetch開始時にB09〜B41の33 batchすべてへ `ensureBatch()` を実行し、Worker isolateごとの初回に各batch `SELECT COUNT(*) FROM drinks WHERE evidence_version=?` を発行する。
- そのためHTML/JS/image/favicon等の静的requestまで酒マスターbatch確認を誘発する構造になっていた。約900 request × 33 ≒ 29,700 queriesとなり、Cloudflare画面の約30kと整合するため、今回のrows-read枯渇の主要因として扱う。

## 今回の修正
- `src/worker-carila-realtime.mjs`
  - `/api/carila-realtime-session` は従来どおりRealtime handler。
  - `/api/chat` だけを `worker-v1.9-expansions.mjs` へ通し、B09〜B41のD1 seed/enrichment契約を維持。
  - それ以外のstatic / health / drink-image / drink-meta / carila-chat等は `worker-v1.9.mjs` へ直接委譲し、expansion batch maintenanceを完全に迂回する。
- `test/d1-hot-path.test.mjs`
  - static assetと`/health`でDRINK_DB.prepareが呼ばれたら失敗する回帰testを追加。

## 影響
- 酒推薦 `/api/chat` の1500杯Known Master / rarity enrichment / Open Recommendationは維持。
- drink image D1、Unsplash cache、Realtime voice、affiliate導線、UI、静的asset配信は仕様変更なし。
- D1 schema/data削除なし。batch seed自体も削除せず、必要なchat経路に限定する。
- 想定効果: 静的アクセスごとに最大33 batch確認が発生するrequest stormを除去し、BAR CarilaのD1 query/rows-readを桁違いに削減する。

## 検証
- branch commit `8cf9b6f...`: routing fix。
- branch commit `8d520ee...`: non-chat D1 hot-path regression test。
- 最終CIはDraft中skipし、Ready時に既存CI + drink-master validationを1回実行する。

## 既存状態
- ドリンクマスター1500杯到達済み。自動拡張停止済み。Open Recommendation方針を維持する。
- `/carila` Realtime / WebRTC実装済み。
- Amazon tracking ID 5用途は維持。
- unrelated stale Open PR #12は今回触らない。
- Production公開はCARILA WORKS Controlからのみ行う。

## 次
1. Draft PR作成、Draft中CI skip確認。
2. Merge candidateとしてReady化し、既存CI/validationを1回実行。
3. PASSならMerge。
4. CARILA WORKS ControlからBAR CARILA公開版を更新。
5. 翌reset後、Cloudflare D1の `bar-carila-drink-images` query/rows-readを比較。
6. BAR収束後、SIXSHIFTの4.5秒pollingを将来利用者増加に耐えるevent-driven設計へ別作業で見直す。

## DELTA
DEPENDENCY DELTA: NONE
ROUTE DELTA: expansion workerへの委譲を`/api/chat`だけに限定。公開URL/API契約自体は変更なし。
ACTIONS DELTA: Draft中skip、Ready時に既存最終CI 1回のみ。
D1 DELTA: static/non-chat request由来のB09〜B41 batch COUNT確認を除去。data/schemaは変更なし。
LEGACY CLEANUP: 全requestで酒マスターseed maintenanceを走らせる誤ったtop-level routingを解消。

## Handoff
D1上限枯渇の主要因としてBAR Carila request stormを特定。Cloudflare当日約30k queriesと、1requestあたり最大33 batch確認のコード構造が数量的に整合する。修正branchはnon-chatをbase v1.9へ直接routeし、chat機能だけexpansion workerを維持。Merge/Production反映後に翌日D1実測で効果判定する。
