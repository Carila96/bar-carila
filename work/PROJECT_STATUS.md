# PROJECT_STATUS

最終更新: 2026-09-17
現在のbranch: main

## 現在地
- ドリンクマスターは1500杯到達済み。自動拡張タスクは停止済み。
- /carila に OpenAI Realtime / WebRTC の連続音声会話を実装済み。
- PR #105で無音誤反応と基本文字起こしを修正済み。
- 実機確認で、voiceが女性寄り、英語で話し始める、開始時の定型挨拶がない、音声UIが大きい、選択肢と音声ログの配置が不親切という追加課題を確認。

## 現在の作業
- PR #106 Merge後のCARILA WORKS Preview実機確認待ち。
- Amazonアソシエイト再登録に伴い、旧Tracking ID `carila-22` を新ID `carila0e-22` へ差し替え中。

## 検証状況
- PR #106: CI成功 / drink-master validator成功 / Merge済み（e5f882e7）。
- Amazon ID監査: `public/index.html` の固定12リンクと `public/assets/js/main.js` の動的リンク定数で旧IDを確認。新IDへ差し替え済み、PR検証待ち。

## 次にやること
1. CARILA WORKS Previewを更新し、iPhone実機で日本語固定・定型挨拶・男性寄り声質・選択肢・ログ・割り込みを確認。
2. 1500杯マスターは別セッションで前半/中盤/高速追加後半/最終バッチを横断監査する。

## Handoff
- 推薦候補は1500杯に閉じない。Open Recommendation + Known Master方針を維持する。
- Production公開はCARILA WORKS Controlからのみ行う。
- Realtimeの現行組み込みvoiceは限定され、将来の本人声はCustom Voice IDへ差し替える前提。
