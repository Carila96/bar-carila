# BarCarila PWA / search hardening — 2026-10-06

## Scope
- iPhone PWA/standalone表示のsafe-area・100dvh・狭幅レイアウトを安定化する。
- PWA manifestと専用アイコンを追加する。
- お酒検索の本体結果とAmazon/Rakuten周辺導線を分離し、アフィリエイト側の失敗で検索結果全体が消えないようにする。
- 検索AIのJSON出力が一時的に崩れた場合の復旧性を上げる。

## Search fault isolation
1. Haikuの検索JSONを取得する。
2. JSON parseはコードフェンス除去に加え、最初の `{` から最後の `}` までの抽出fallbackを持つ。
3. parse失敗時のみ1回だけ再試行する。
4. 検索結果カード本体（酒名、カテゴリ、説明、tip、画像）を先にDOMへ確定する。
5. Amazon/Rakutenリンクは別try/catchで後付けする。失敗時はconsole warningのみで、カード本体は維持する。

## PWA
- `public/manifest.webmanifest`
- `public/barcarila-icon.svg`: 暗いBAR背景 + 中央カクテルグラス
- `public/assets/css/pwa.css`: `100dvh`, `env(safe-area-inset-*)`, search input `min-width:0`, standalone全面ページ余白
- `amazon-links.js`が既存HTMLを壊さない形でmanifest / apple-touch-icon / stylesheet / iOS standalone metaを追加する。

## Release
Production公開はCARILA WORKS Controlのみ。MergeだけではProductionへ公開しない。
