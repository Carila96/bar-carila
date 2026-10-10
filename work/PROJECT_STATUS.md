# PROJECT_STATUS

最終更新: 2026-10-10
現在のbranch: `feature/carila-trial-usage-guard-20261010`

## 現在地
- Cloudflare D1 Freeの日次rows readは2026-10-09に上限へ到達し、BAR CARILAのrequest-time master確認が主因と特定済み。
- PR #121で静的/非chat requestのB09〜B41 batch確認stormを停止、PR #122で`/api/chat`内の固定master DDL/seed/COUNTもread-only runtime gateで除去済み。既知酒推薦はindexed point lookupのみ維持する。
- `drink_images` は永続cacheとしてD1継続。Cloudflare Cache HIT時はD1 0、MISS時のみpoint lookupする。
- ドリンクマスター1500杯到達済み。自動拡張停止済み。Open Recommendation方針を維持する。
- `/carila`のテキスト会話とRealtime / WebRTC音声会話は実装済み。PR #106以降のiPhone実機確認（日本語・挨拶・voice・配置・割り込み）は継続課題。
- Bartender Carilaの正式な無料/有料境界、価格、Stripe等は未確定。過去の月額1,000円案は仮説として保持し、確定仕様にはしない。
- 課金前の無制限API消費を避けるため、暫定Trialコストガードを今回追加。

## 今回の変更
- `docs/CARILA_SERVICE_PLAN.md` を追加し、サービス/収益化方針を未確定事項として永続化。
- `/api/carila-chat` に匿名ブラウザID単位の20 user turn / 日の上限を追加。
- `/api/carila-realtime-session` に匿名ブラウザID単位の2 session / 日の上限を追加。
- 日次リセットはAsia/Tokyo 00:00。既存D1 `DRINK_DB` に小さな専用 `carila_usage_daily` tableを遅延作成して使用する。
- raw IPは保存せず、HttpOnly / Secure / SameSite=Lax cookieのランダムIDで日次usageを識別する。
- 上限到達時はAnthropic/OpenAIへ送信せずHTTP 429。usage guard自体が使えない場合はfail-openせずCarila会話を503で保護する。
- 音声は通常UIで1 session最大5分に設定。
- `/api/chat`のお酒提案、Known Master、検索、Amazon/Rakuten導線は今回の上限対象外。

## D1影響
- 2026-10-09に解消したmaster query stormは再導入しない。`carila_usage_daily` は1500杯master確認とは独立した1行単位の日次counter。
- Trial会話1 requestにつきusage counterのpoint write/readが発生するためD1消費は0ではないが、上限自体が20 text + 2 voice session / browser / dayであり、以前の数万query stormとは構造が異なる。
- 将来アカウント/課金基盤を導入する際はusage ledgerの保存先も再評価する。

## 検証
- GitHub connectorでRepository、現行Realtime worker、UI、tests、D1 bindingを確認して実装。
- `test/carila-realtime.test.mjs` にD1 usage mock、2 session許可→3回目429、upstreamが2回しか呼ばれないこと、5分UI cap、default limitsの回帰テストを追加。
- local git cloneによるtest実行は実行環境DNSで`github.com`をresolveできず失敗。この経路のみの失敗として扱い、GitHub connector作業は継続。
- PR CIで `npm test` + `validate:drink-master-v1.9` を最終確認する。

## ブロッカー / 制約
- Production公開はRepositoryから行わない。Merge後にCARILA WORKS Controlからユーザーが更新する。
- アカウント未導入のため、cookie削除/別ブラウザまで防ぐ強固なanti-abuseではない。現段階は一般利用での無制限消費を抑えるコストガード。
- Realtimeの5分停止は通常UI側。正式課金前には音声時間のサーバー側厳密制御を再設計する。

## 次
1. PR作成→Ready時の既存CIでtest/validator確認。
2. CI成功後Mergeし、latest main / PR merged stateを再確認。
3. CARILA WORKS Controlからテスト版更新後、iPhoneでテキスト上限・音声2回/日・5分停止・既存音声UXをAcceptance。
4. 問題なければユーザー操作で公開版更新。
5. Bartender Carilaの価値、無料/有料境界、価格、課金方式を別作業で詰める。
6. BAR D1軽量化はProduction反映後の翌reset実測も継続確認する。
7. 1500杯マスター品質の横断監査は別作業として保持する。

## DELTA
DEPENDENCY DELTA: NONE
ROUTE DELTA: `/api/carila-chat` と `/api/carila-realtime-session` にTrial usage guard追加。`/api/chat`は既存read-only master D1 wrapperを維持。
ACTIONS DELTA: Draft中skip、Ready時に既存最終CI 1回のみ。
D1 DELTA: `carila_usage_daily` を追加。master seed/DDL/COUNT stormは再導入しない。
LEGACY CLEANUP: NONE。

## Handoff
Bartender Carilaはテキスト/Realtime音声とも実装済みだが、サービス/課金仕様は未確定。課金設計を先に固定せず、公開試用中のAPI原価だけを暫定上限で保護する。Trial値は料金プランの確定無料枠ではない。Production公開はCARILA WORKS Controlのみ。Open Recommendation + Known Master方針は維持する。
