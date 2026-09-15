# PROJECT_STATUS

最終更新: 2026-09-15
現在のbranch: fix-carila-voice-ux-japanese

## 現在地
- ドリンクマスターは1500杯到達済み。自動拡張タスクは停止済み。
- /carila に OpenAI Realtime / WebRTC の連続音声会話を実装済み。
- PR #105で無音誤反応と基本文字起こしを修正済み。
- 実機確認で、voiceが女性寄り、英語で話し始める、開始時の定型挨拶がない、音声UIが大きい、選択肢と音声ログの配置が不親切という追加課題を確認。

## 現在の作業
- Realtimeのvoiceを ash に変更し、低い成人男性寄りの日本語話者として強く指示。
- 音声会話は原則日本語固定。ユーザーが明示した場合だけ別言語へ切り替える。
- 接続直後に「いらっしゃいませ。今日はどういたしますか？」だけを話す専用responseを発火。
- 音声会話ボタンを小型・右寄せ。
- ボタン下に既存3選択肢を配置し、音声会話中はRealtimeへのテキスト入力として機能させる。
- ユーザー/Carila双方の音声Transcriptをボタン下のVOICE LOGへ蓄積表示。

## 検証状況
- 実装・テスト更新済み。PR作成後にCI / drink-master validatorを確認する。

## 次にやること
1. CI / drink-master validatorを通す。
2. 問題なければMerge。
3. CARILA WORKS Previewを更新し、iPhone実機で日本語固定・定型挨拶・男性寄り声質・選択肢・ログ・割り込みを確認。
4. 1500杯マスターは別セッションで前半/中盤/高速追加後半/最終バッチを横断監査する。

## Handoff
- 推薦候補は1500杯に閉じない。Open Recommendation + Known Master方針を維持する。
- Production公開はCARILA WORKS Controlからのみ行う。
- Realtimeの現行組み込みvoiceは限定され、将来の本人声はCustom Voice IDへ差し替える前提。
