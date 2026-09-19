# PROJECT_STATUS

最終更新: 2026-09-17
現在のbranch: main

## 現在地
- ドリンクマスターは1500杯到達済み。自動拡張タスクは停止済み。
- /carila に OpenAI Realtime / WebRTC の連続音声会話を実装済み。
- PR #105で無音誤反応と基本文字起こしを修正済み。
- 実機確認で、voiceが女性寄り、英語で話し始める、開始時の定型挨拶がない、音声UIが大きい、選択肢と音声ログの配置が不親切という追加課題を確認。
- GitHub Actions重複削減は完了し、PR検証を`CI`へ一本化済み。

## 現在の作業
- PR #106 Merge後のCARILA WORKS Preview実機確認待ち。
- Amazonアソシエイト再登録に伴うTracking ID差し替えは完了。
- PRでは`CI`のみが`npm ci` / `npm test` / `validate:drink-master-v1.9`を実行し、専用validation workflowは研究ブランチpush専用。

## 検証状況
- PR #106: CI成功 / drink-master validator成功 / Merge済み（e5f882e7）。
- Amazon ID監査: `public/index.html` 固定12リンクと `public/assets/js/main.js` の動的リンク定数を新ID `carila0e-22` へ更新。旧ID `carila-22` は対象runtime filesで0件。CI `test` / `validate` とも成功。
- PR #110では新しい`CI` 1本のみ起動し、全テストとdrink-master validatorが成功。重複validator workflowはPRで起動しないことを確認済み。

## PR / Merge状況
- PR #107 `Replace expired Amazon Associate tracking ID` を2026-09-17にMerge済み。
- Merge commit: `b19844b961fa83cfe04fb4687f2719e010d61d65`
- PR #110 `Consolidate duplicate BAR Carila CI` を2026-09-17にMerge済み。
- Merge commit: `08931191ec531408ab56d0587ec91a24b14dc687`

## 次にやること
1. CARILA WORKS Previewを更新し、iPhone実機で日本語固定・定型挨拶・男性寄り声質・選択肢・ログ・割り込みを確認。
2. 1500杯マスターは別セッションで前半/中盤/高速追加後半/最終バッチを横断監査する。

## Handoff
- 推薦候補は1500杯に閉じない。Open Recommendation + Known Master方針を維持する。
- Production公開はCARILA WORKS Controlからのみ行う。
- Realtimeの現行組み込みvoiceは限定され、将来の本人声はCustom Voice IDへ差し替える前提。
- GitHub ActionsはPR時の重複検証を避ける。`research/jp-rarity-v1.9-working`のpushでは専用validatorを維持する。

## Harness / GitHub capability verification
- GitHub操作可否を一経路の失敗だけで判断しない必須ルールを `AGENTS.md` へ追加済み。
- `GitHub操作不可` / `Merge不可` と報告する前に、認証済みGitHub connector/APIでRepository metadata、latest commit、Open PR、file readを直接確認する。
- 書き込み依頼ではsafe writeも実際に試してから可否を判断する。


## 2026-09-19 — Google検索 / SEO baseline

- トップへcanonicalとWebApplication JSON-LDを追加。
- 既存title / description / OGP / Twitter Cardは維持。
- `robots.txt` / `sitemap.xml` を追加し、トップと `/carila/` を検索対象として明示。
- CARILA共通匿名AnalyticsはControl-managed HTMLへの自動注入で次回公開更新時から適用予定。
- DEPENDENCY DELTA: NONE
