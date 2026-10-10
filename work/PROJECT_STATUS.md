# PROJECT_STATUS
更新: 2026-10-10 — BAR CARILA残件Acceptance / 品質監査
開始main: `4168265bb86997325fcf726fac88dcf1b029bef4`
作業branch: `audit/bar-carila-acceptance-20261010`
最終PR / CI / merged SHA: このbranchのGitHub PRとChecksを正本とする。開始SHAをlatest mainとして再利用しない。

## 現在地
- GitHub connectorでRepository metadata/main/branch/Open PR/実コードを再取得。旧statusのSHAは陳腐化。
- PR #121/#122/#123はmerged確認済み。TrialとD1軽量化を維持し、残った`/api/drink-meta`初期化経路もread-only化。
- Production公開なし。Controlテスト版更新とiPhone Acceptanceが次。Stripe、価格、正式無料/有料境界は未確定。
- 詳細: `evals/ACCEPTANCE.md`。残件: `docs/UNRESOLVED.md`。再現監査: `scripts/audit-drink-master.mjs` / `docs/drink-master-audit-20261010.json`。

## 修正
1. Trial: method/body検証をcounter前へ移動。malformed cookieを安全に更新。table準備をDB binding別に管理。atomic UPSERT/JST日付キーを維持。
2. 会話: API失敗再送・音声からtextへの切替で連続roleをAPI payloadだけ正規化。直近39件/各4000文字。全画面履歴は保持。送信直後のユーザー発言を表示。
3. 音声: 30秒接続timeout/abort、遅れたマイク許可cleanup、旧peerイベント無効化、pagehide/終了中cancel、error停止。5分timerを重複connectedで延長しない。text送信中voice開始を抑制。
4. D1: chatに加えmetadataも固定master DDL/seed/COUNTを抑止。indexed point lookupとdrink_images永続cacheを維持。
5. Security: 通常BAR推薦/recipe/history/log/message/search fallbackをescape。native shareのデータ入りonclick廃止。assets/APIへnosniff/referrer/frame protections、限定CSP、microphone self policy。
6. UX: 暫定上限/JST0時reset、Enter改行/Ctrl・Command+Enter送信を表示。premium見出しを会話へ。メニュー名、閉じたCarila drawer inert、voice target44px/説明色、asset cache-busting。
7. Assets: manifest MIME明示。欠落assetにHTML200を返すSPA fallback停止。Previewで配信確認必要。

## 検証実結果
- Baseline npm test: 240/240 PASS。修正suite: 255/255 PASS（実SQLite quota/日付境界/fail-closed、UI lifecycle/IME、安全表示、metadata point lookup）。
- validate:drink-master-v1.9 PASS。Wrangler deploy --dry-run PASS（upload/deployなし）。JS syntax / diff whitespace PASS。
- Production実操作: Carila初回表示、連続2回日本語text、会話log、Negroni検索、Amazon/Rakuten導線。実text2回、実voice upstream0回。
- Production HTTP: main/Carila/icons/CSS/JS/manifest200、health200、未知API404。欠落PNGはHTML200、manifestはoctet-streamだったため修正。metadata curl timeout。更新済codeの公開PASSとは扱わない。
- consoleでcloud extension由来metadata errorを観測、アプリerrorと分離。
- local Wrangler devはuv_interface_addresses環境エラーで起動不可。test/dry-run成功、更新後実ブラウザ/asset routingはPreview確認。

## 1500杯品質
- 400基礎 + 1100拡張 = 1500 unique canonical key、hard structural error0。
- 要確認49 findings: alias衝突2、同じ材料分量signature15、単位候補27、分量候補3、合計量候補2。49 proven defectsではない。
- base400は完全なrecipe集ではない。明示glass/garnishは1500件で欠落。canonical日本語map未登録をlive日本語表示欠落と同一視しない。
- 外部照合前に同名別recipe/別名同一drinkを統合・削除しない。全recipe正解性PASSとは判定しない。

## 旧PR
#12は1 ahead / 433 behind。menu/長文composer/formatter/testsはmainに存在し、旧PNG参照とRealtime/Trial以前のUIで陳腐化。内容確認後、未Mergeのままclosed。branchは保持。

## 次
1. GitHubで監査PRのCI/mergedとlatest main確認。
2. ユーザーがControlでテスト版更新。
3. Previewで会話/検索/推薦/metadata応答、manifest MIME、404、security headers確認。
4. iPhoneで実マイク、voice、日本語挨拶、speaker、割り込み、transcript、5分終了、再開始、背景移行、keyboard/狭幅UI確認。
5. 確認後、ユーザーがControl公開版更新。D1は翌reset実測も継続。

## DELTA
DEPENDENCY NONE / ACTIONS既存CIのみ / ROUTE・DNS・PRODUCTION公開なし / D1新schemaなし（PR123 usage維持、metadata maintenance除去） / PRICE・STRIPE NONE。

## 開始時の不存在文書
CARILA_WORKS_PLAYBOOK.md、docs/REQUIREMENTS.md、docs/UNRESOLVED.md、docs/INTERACTION_CONTRACT.md、evals/ACCEPTANCE.md、work/PROJECT_CHECKLIST.mdは開始時不存在。UNRESOLVED/ACCEPTANCEのみ本監査で新設。共通規約があると仮定していない。
