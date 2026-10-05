# PROJECT_STATUS

最終更新: 2026-10-06
現在のbranch: fix-bar-search-affiliate-fallback

## 現在地
- ドリンクマスター1500杯到達済み。自動拡張停止済み。Open Recommendation方針を維持する。
- /carilaのRealtime / WebRTCは実装済み。PR #106以降のiPhone実機確認（日本語・挨拶・voice・配置・割り込み）は継続課題。
- Amazon tracking IDは5用途で設定済み。bar_recommend=carilabrecommend-22 / bar_ingredients=carilabrecipe-22 / bar_search=carilabsearch-22 / bar_history=carilabhistory-22 / bar_goods=carilabgoods-22。未知導線fallbackはcarila0e-22。
- Production実機で「ジントニック」検索が正常に返ることをユーザー確認済み。直前のWork検索エラーは常時再現ではない。

## 現在の作業
- お酒検索本体とアフィリエイトURL生成を分離。検索本体カードを先にDOMへ確定し、その後Amazon/Rakuten導線をtry/catch内で追加するため、周辺導線失敗で検索結果を消さない構造へ変更。
- 検索AIのJSON parsingを強化。コードフェンスだけでなく前後文が混入した場合も最初/最後のJSON objectを抽出し、parse失敗時のみ1回再試行する。
- PWA/standalone向けに100dvh、safe-area、狭幅時のsearch flex min-width、全面ページ下余白を追加。
- manifest.webmanifestを追加。
- PWA iconとして、暗いBAR背景 + 中央のカクテルグラスをモチーフにしたbarcarila-icon.svgを追加。
- amazon-links.jsからmanifest / apple-touch-icon / PWA CSS / iOS standalone metaを安全にbootstrapする。PWA装飾失敗は本体処理を止めない。

## 検証
- 専用回帰testを追加済み。PR作成後にCI / drink-master validatorを確認する。
- Amazon ID分類・楽天URL・既存main.jsの推薦ロジック自体は変更しない。

## 次にやること
1. PRを作成してCI / drink-master validatorを通す。
2. 問題なければMerge。
3. CARILA WORKS Controlからテスト版更新後、iPhone PWAで検索画面の見切れ、safe-area、検索入力幅、専用アイコン、検索結果+Amazon導線を実機確認。
4. iOSは既存ホーム画面アイコンをキャッシュするため、アイコン確認時は必要なら一度ホーム画面から削除して再追加する。
5. 1500杯マスター品質の前半/中盤/高速追加後半/最終バッチ横断監査は別作業として保持。

## Handoff
- 推薦候補は1500杯に閉じない。Open Recommendation + Known Master方針を維持する。
- Production公開はCARILA WORKS Controlからのみ行う。
- DEPENDENCY DELTA: NONE / ACTIONS DELTA: NONE。
