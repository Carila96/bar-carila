const API='/api/chat';
const DRINK_META_API='/api/drink-meta';
const DRINK_META_CACHE_KEY='bar_carila_drink_meta_cache_v1';
const FAST_MODEL='claude-haiku-4-5-20251001';
const RECOMMEND_MODEL='claude-sonnet-5';
const AMAZON_TAG='carila-22';
const RAKUTEN_ID='51ff76f6.9c656021.51ff76f7.1d6ddd8e';
const FEEDBACK_URL='https://docs.google.com/forms/d/e/1FAIpQLScUWpIEo738dwiCziMGv_P_wjeQkHD97EEmHPmFnuKeLmvPAw/viewform?usp=header';
const DRINK_IMGS={"モスコミュール": "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop", "モヒート": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&auto=format&fit=crop", "マティーニ": "https://images.unsplash.com/photo-1575023782549-62ca0d244b39?w=800&auto=format&fit=crop", "ネグローニ": "https://images.unsplash.com/photo-1563077764-93e534f3acaa?w=800&auto=format&fit=crop", "オールドファッション": "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&auto=format&fit=crop", "マルガリータ": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&auto=format&fit=crop", "ダイキリ": "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=800&auto=format&fit=crop", "アペロール": "https://images.unsplash.com/photo-1563077764-93e534f3acaa?w=800&auto=format&fit=crop", "アペロールスプリッツ": "https://images.unsplash.com/photo-1563077764-93e534f3acaa?w=800&auto=format&fit=crop", "コスモポリタン": "https://images.unsplash.com/photo-1581927692308-be9e43b4d860?w=800&auto=format&fit=crop", "ジントニック": "https://images.unsplash.com/photo-1571950006479-1c7b1e9c4ef9?w=800&auto=format&fit=crop", "ブラッディマリー": "https://images.unsplash.com/photo-1582106245687-cbb466a9f07f?w=800&auto=format&fit=crop", "テキーラサンライズ": "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=800&auto=format&fit=crop", "ピニャコラーダ": "https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf?w=800&auto=format&fit=crop", "カシスソーダ": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop", "カシスオレンジ": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop", "ジンフィズ": "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&auto=format&fit=crop", "ラモスジンフィズ": "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&auto=format&fit=crop", "マンハッタン": "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&auto=format&fit=crop", "ウイスキーサワー": "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=800&auto=format&fit=crop", "フレンチ75": "https://images.unsplash.com/photo-1583394293214-66c49d4d8de5?w=800&auto=format&fit=crop", "サイドカー": "https://images.unsplash.com/photo-1574056741818-a9f0e7e03c71?w=800&auto=format&fit=crop", "ニューヨークサワー": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop", "ミモザ": "https://images.unsplash.com/photo-1583394293214-66c49d4d8de5?w=800&auto=format&fit=crop", "ベリーニ": "https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf?w=800&auto=format&fit=crop", "ピーチベリーニ": "https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf?w=800&auto=format&fit=crop", "キールロワイヤル": "https://images.unsplash.com/photo-1583394293214-66c49d4d8de5?w=800&auto=format&fit=crop", "ブラックベルベット": "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&auto=format&fit=crop", "ブルーハワイ": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&auto=format&fit=crop", "ハリケーン": "https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf?w=800&auto=format&fit=crop", "セックスオンザビーチ": "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=800&auto=format&fit=crop", "マイタイ": "https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf?w=800&auto=format&fit=crop", "ゾンビ": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop", "シンガポールスリング": "https://images.unsplash.com/photo-1581927692308-be9e43b4d860?w=800&auto=format&fit=crop", "ダークアンドストーミー": "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop", "キューバリブレ": "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&auto=format&fit=crop", "パロマ": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop", "ロングアイランドアイスティー": "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&auto=format&fit=crop", "エスプレッソマティーニ": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop", "ポルノスターマティーニ": "https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf?w=800&auto=format&fit=crop", "バジルスマッシュ": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&auto=format&fit=crop", "ローズマリースマッシュ": "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&auto=format&fit=crop", "アイリッシュコーヒー": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop", "ホットトディ": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&auto=format&fit=crop", "ミントジュレップ": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&auto=format&fit=crop", "ニコラシカ": "https://images.unsplash.com/photo-1574056741818-a9f0e7e03c71?w=800&auto=format&fit=crop", "ブールバルディエ": "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&auto=format&fit=crop", "サゼラック": "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&auto=format&fit=crop", "ラストワード": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&auto=format&fit=crop", "ペーパープレーン": "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&auto=format&fit=crop", "ゴッドファーザー": "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&auto=format&fit=crop", "ゴッドマザー": "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=800&auto=format&fit=crop", "ラスティネイル": "https://images.unsplash.com/photo-1469354517-0f3a5a8e1a53?w=800&auto=format&fit=crop", "ブラックロシアン": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop", "ホワイトロシアン": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop", "ブランブル": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop", "ゴールドラッシュ": "https://images.unsplash.com/photo-1574056741818-a9f0e7e03c71?w=800&auto=format&fit=crop", "アビエーション": "https://images.unsplash.com/photo-1583394293214-66c49d4d8de5?w=800&auto=format&fit=crop", "シソモヒート": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&auto=format&fit=crop", "シンデレラ": "https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf?w=800&auto=format&fit=crop", "シャーリーテンプル": "https://images.unsplash.com/photo-1587574293340-e0011c4e8ecf?w=800&auto=format&fit=crop", "ハイボール": "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800&auto=format&fit=crop", "ウイスキー": "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800&auto=format&fit=crop", "スコッチ": "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800&auto=format&fit=crop", "バーボン": "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&auto=format&fit=crop", "ラフロイグ": "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&auto=format&fit=crop", "アードベッグ": "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&auto=format&fit=crop", "ボウモア": "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800&auto=format&fit=crop", "グレンフィディック": "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800&auto=format&fit=crop", "マッカラン": "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800&auto=format&fit=crop", "グレンリベット": "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800&auto=format&fit=crop", "タリスカー": "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&auto=format&fit=crop", "ハイランドパーク": "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800&auto=format&fit=crop", "グレンモーレンジ": "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800&auto=format&fit=crop", "スプリングバンク": "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800&auto=format&fit=crop", "ジョニーウォーカー": "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800&auto=format&fit=crop", "バッファロートレース": "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&auto=format&fit=crop", "メーカーズマーク": "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&auto=format&fit=crop", "ウッドフォードリザーブ": "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&auto=format&fit=crop", "ジャックダニエルズ": "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&auto=format&fit=crop", "山崎": "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800&auto=format&fit=crop", "白州": "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800&auto=format&fit=crop", "余市": "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800&auto=format&fit=crop", "響": "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800&auto=format&fit=crop", "イチローズモルト": "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800&auto=format&fit=crop", "ジェムソン": "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800&auto=format&fit=crop", "レッドブレスト": "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800&auto=format&fit=crop", "ヘネシー": "https://images.unsplash.com/photo-1574056741818-a9f0e7e03c71?w=800&auto=format&fit=crop", "レミーマルタン": "https://images.unsplash.com/photo-1574056741818-a9f0e7e03c71?w=800&auto=format&fit=crop", "コニャック": "https://images.unsplash.com/photo-1574056741818-a9f0e7e03c71?w=800&auto=format&fit=crop", "カルヴァドス": "https://images.unsplash.com/photo-1574056741818-a9f0e7e03c71?w=800&auto=format&fit=crop", "タンカレー": "https://images.unsplash.com/photo-1571950006479-1c7b1e9c4ef9?w=800&auto=format&fit=crop", "ボンベイサファイア": "https://images.unsplash.com/photo-1571950006479-1c7b1e9c4ef9?w=800&auto=format&fit=crop", "ヘンドリックス": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&auto=format&fit=crop", "モンキー47": "https://images.unsplash.com/photo-1571950006479-1c7b1e9c4ef9?w=800&auto=format&fit=crop", "季の美": "https://images.unsplash.com/photo-1571950006479-1c7b1e9c4ef9?w=800&auto=format&fit=crop", "六ROKU": "https://images.unsplash.com/photo-1571950006479-1c7b1e9c4ef9?w=800&auto=format&fit=crop", "ジン": "https://images.unsplash.com/photo-1571950006479-1c7b1e9c4ef9?w=800&auto=format&fit=crop", "ラム": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop", "バカルディ": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop", "ハバナクラブ": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop", "ロンサカパ": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop", "ドンパパ": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop", "セルバレイ": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop", "テキーラ": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&auto=format&fit=crop", "パトロン": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&auto=format&fit=crop", "ドンフリオ": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&auto=format&fit=crop", "メスカル": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&auto=format&fit=crop", "ウォッカ": "https://images.unsplash.com/photo-1571950006479-1c7b1e9c4ef9?w=800&auto=format&fit=crop", "グレイグース": "https://images.unsplash.com/photo-1571950006479-1c7b1e9c4ef9?w=800&auto=format&fit=crop", "ベルヴェデール": "https://images.unsplash.com/photo-1571950006479-1c7b1e9c4ef9?w=800&auto=format&fit=crop", "アマレット": "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=800&auto=format&fit=crop", "ベイリーズ": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop", "カルーア": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop", "カンパリ": "https://images.unsplash.com/photo-1563077764-93e534f3acaa?w=800&auto=format&fit=crop", "リモンチェッロ": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop", "シャルトリューズ": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&auto=format&fit=crop", "アブサン": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&auto=format&fit=crop", "サンジェルマン": "https://images.unsplash.com/photo-1583394293214-66c49d4d8de5?w=800&auto=format&fit=crop", "赤ワイン": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop", "白ワイン": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop", "ロゼワイン": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop", "シャンパン": "https://images.unsplash.com/photo-1583394293214-66c49d4d8de5?w=800&auto=format&fit=crop", "プロセッコ": "https://images.unsplash.com/photo-1583394293214-66c49d4d8de5?w=800&auto=format&fit=crop", "スパークリング": "https://images.unsplash.com/photo-1583394293214-66c49d4d8de5?w=800&auto=format&fit=crop", "ポートワイン": "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop", "シェリー": "https://images.unsplash.com/photo-1574056741818-a9f0e7e03c71?w=800&auto=format&fit=crop", "梅酒": "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=800&auto=format&fit=crop", "日本酒": "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&auto=format&fit=crop", "焼酎": "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&auto=format&fit=crop", "抹茶": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&auto=format&fit=crop", "柚子": "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop", "カクテル": "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop", "ノンアル": "https://images.unsplash.com/photo-1543362906-acfc16c67564?w=800&auto=format&fit=crop", "モクテル": "https://images.unsplash.com/photo-1543362906-acfc16c67564?w=800&auto=format&fit=crop"};
const FALLBACK_IMGS=["https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1575023782549-62ca0d244b39?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1583394293214-66c49d4d8de5?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1563077764-93e534f3acaa?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800&auto=format&fit=crop", "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&auto=format&fit=crop"];

const CAT_IMGS={
  'カクテル':'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop',
  'ノンアルコールカクテル':'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=800&auto=format&fit=crop',
  'モクテル':'https://images.unsplash.com/photo-1543362906-acfc16c67564?w=800&auto=format&fit=crop',
  'スコッチウイスキー':'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=800&auto=format&fit=crop',
  'バーボンウイスキー':'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&auto=format&fit=crop',
  'ジャパニーズウイスキー':'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800&auto=format&fit=crop',
  'アイリッシュウイスキー':'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=800&auto=format&fit=crop',
  'コニャック':'https://images.unsplash.com/photo-1574056741818-a9f0e7e03c71?w=800&auto=format&fit=crop',
  'ブランデー':'https://images.unsplash.com/photo-1574056741818-a9f0e7e03c71?w=800&auto=format&fit=crop',
  'ジン':'https://images.unsplash.com/photo-1571950006479-1c7b1e9c4ef9?w=800&auto=format&fit=crop',
  'ラム':'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop',
  'テキーラ':'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&auto=format&fit=crop',
  'メスカル':'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&auto=format&fit=crop',
  'ウォッカ':'https://images.unsplash.com/photo-1571950006479-1c7b1e9c4ef9?w=800&auto=format&fit=crop',
  'リキュール':'https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=800&auto=format&fit=crop',
  'スパークリングワイン':'https://images.unsplash.com/photo-1583394293214-66c49d4d8de5?w=800&auto=format&fit=crop',
  '赤ワイン':'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop',
  '白ワイン':'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop',
  'ロゼワイン':'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop',
  'ポートワイン':'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&auto=format&fit=crop',
  'シェリー':'https://images.unsplash.com/photo-1574056741818-a9f0e7e03c71?w=800&auto=format&fit=crop',
  '日本酒':'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&auto=format&fit=crop',
  '焼酎':'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&auto=format&fit=crop',
  '梅酒':'https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=800&auto=format&fit=crop',
};

// ===== Image =====
function pickRandom(arr){return arr[Math.floor(Math.random()*arr.length)];}
function handleDrinkImgError(img){
  const fi=pickRandom(FALLBACK_IMGS);
  if(img.src!==fi){img.src=fi;}
  else{img.parentNode.innerHTML='<div class="rec-no-img"><div style="font-size:36px;">🍸</div><div style="font-size:11px;letter-spacing:0.2em;color:rgba(200,146,42,0.5);">NO IMAGE</div></div>';}
}
const DRINK_IMG_CACHE_KEY='bar_carila_drink_img_cache_v1';
function normDrinkName(s){return (s||'').toLowerCase().replace(/[・\s.\-]/g,'');}
function findStaticDrinkImg(name){
  const nName=normDrinkName(name);
  const keys=Object.keys(DRINK_IMGS).sort((a,b)=>b.length-a.length);
  for(const k of keys){if(nName.includes(normDrinkName(k)))return DRINK_IMGS[k];}
  return null;
}
function readDrinkImgCache(){try{return JSON.parse(localStorage.getItem(DRINK_IMG_CACHE_KEY)||'{}')}catch{return{}}}
function getCachedDrinkImg(name){
  const entry=readDrinkImgCache()[normDrinkName(name)];
  return entry&&typeof entry.url==='string'&&entry.url?entry:null;
}
function saveDrinkImgCache(name,data){
  if(!name||!data||typeof data.url!=='string'||!data.url)return;
  try{
    const cache=readDrinkImgCache();
    cache[normDrinkName(name)]={url:data.url,photoId:data.photoId||'',photographer:data.photographer||'',photographerUrl:data.photographerUrl||'',savedAt:Date.now()};
    const entries=Object.entries(cache).sort((a,b)=>(b[1].savedAt||0)-(a[1].savedAt||0)).slice(0,250);
    localStorage.setItem(DRINK_IMG_CACHE_KEY,JSON.stringify(Object.fromEntries(entries)));
  }catch{}
}
function getDrinkImg(name,cat){
  const fixed=findStaticDrinkImg(name);
  if(fixed)return fixed;
  const cached=getCachedDrinkImg(name);
  if(cached)return cached.url;
  if(cat&&CAT_IMGS[cat])return CAT_IMGS[cat];
  return pickRandom(FALLBACK_IMGS);
}
function buildImgQuery(cat){
  const c=cat||'';
  if(/ノンアル|モクテル/.test(c)) return 'mocktail drink colorful';
  if(/カクテル/.test(c)) return 'cocktail drink bar';
  if(/スコッチ|アイリッシュ|ジャパニーズ|バーボン|ウイスキー/.test(c)) return 'whiskey glass bar';
  if(/コニャック|ブランデー/.test(c)) return 'cognac brandy glass';
  if(/ジン/.test(c)) return 'gin tonic glass bar';
  if(/ラム/.test(c)) return 'rum cocktail tropical';
  if(/テキーラ|メスカル/.test(c)) return 'tequila shot glass';
  if(/ウォッカ/.test(c)) return 'vodka glass bar';
  if(/スパークリング|シャンパン/.test(c)) return 'champagne sparkling wine glass';
  if(/赤ワイン/.test(c)) return 'red wine glass';
  if(/白ワイン|ロゼ/.test(c)) return 'white wine glass';
  if(/ポートワイン|シェリー/.test(c)) return 'fortified wine glass';
  if(/日本酒/.test(c)) return 'sake japanese drink';
  if(/焼酎/.test(c)) return 'japanese spirit drink';
  if(/梅酒/.test(c)) return 'plum wine glass';
  if(/リキュール/.test(c)) return 'liqueur glass bar';
  return 'cocktail drink bar';
}
async function fetchDrinkImg(name,cat,imgEl){
  if(findStaticDrinkImg(name))return;
  const cached=getCachedDrinkImg(name);
  if(cached){if(imgEl&&imgEl.src!==cached.url)imgEl.src=cached.url;return;}
  try{
    const q=buildImgQuery(cat);
    const r=await fetch(`/api/drink-image?name=${encodeURIComponent(name)}&query=${encodeURIComponent(q)}`);
    if(!r.ok)return;
    const d=await r.json();
    if(d.url){saveDrinkImgCache(name,d);if(imgEl&&imgEl.src!==d.url)imgEl.src=d.url;}
  }catch(e){}
}

// ===== Panda =====
const ALL_PANDAS=['counter','loading','think','smile','approve','sad','curious','relax','bartender'];
function loadPandaImage(el){
  if(!el||el.getAttribute('src')||!el.dataset.src)return;
  el.setAttribute('src',el.dataset.src);delete el.dataset.src;
}
function setPanda(state){
  ALL_PANDAS.forEach(s=>{const el=document.getElementById('p-'+s);if(el)el.classList.remove('active');});
  const target=ALL_PANDAS.includes(state)?state:'counter';
  const el=document.getElementById('p-'+target);
  if(el){loadPandaImage(el);el.classList.add('active');}
}
function preloadPandas(){document.querySelectorAll('.panda-img[data-src]').forEach(loadPandaImage);}
function schedulePandaPreload(){
  const run=()=>setTimeout(preloadPandas,80);
  if(document.readyState==='complete')run();else window.addEventListener('load',run,{once:true});
}
function collapsePanda(){if(window.innerWidth<700)document.getElementById('pandaStage').classList.add('collapsed');}
function expandPanda(){document.getElementById('pandaStage').classList.remove('collapsed');}

// ===== Chat state =====
let chatHistory=[],isLoading=false,convLog=[];

// ===== History =====
function getHistory(){try{return JSON.parse(localStorage.getItem('bar_carila_history')||'[]')}catch{return[];}}
function saveToHistory(drink){
  const h=getHistory();
  h.unshift({date:new Date().toLocaleString('ja-JP',{month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'}),name:drink.name,category:drink.category,abv:drink.abv||'',tags:drink.tags||[],description:(drink.description||'').substring(0,80)});
  if(h.length>50)h.pop();
  localStorage.setItem('bar_carila_history',JSON.stringify(h));
}
function openHistory(){
  const h=getHistory();
  document.getElementById('historyList').innerHTML=!h.length?'<div class="history-empty">まだ履歴がありません。</div>':h.map(i=>`<div class="history-item"><div class="history-date">${i.date}</div><div class="history-drink">${i.name}</div><div class="history-cat">${i.category}${i.abv?` · ${i.abv}`:''}</div>${i.description?`<div class="history-desc">${i.description}…</div>`:''} <div class="history-tags">${(i.tags||[]).map(t=>`<span class="history-tag">${t}</span>`).join('')}</div><div class="history-links"><a class="history-link" href="https://www.amazon.co.jp/s?k=${encodeURIComponent(i.name)}&tag=${AMAZON_TAG}" target="_blank" rel="noopener">Amazon</a><a class="history-link" href="https://search.rakuten.co.jp/search/mall/${encodeURIComponent(i.name)}/?l2-id=1000&a_id=${RAKUTEN_ID}" target="_blank" rel="noopener">楽天</a></div></div>`).join('');
  document.getElementById('historyPage').classList.add('open');
}
function closeHistory(){document.getElementById('historyPage').classList.remove('open');}
function clearHistory(){if(confirm('履歴をすべて削除しますか？')){localStorage.removeItem('bar_carila_history');closeHistory();}}
function openHistoryFromMenu(){toggleMenu();setTimeout(openHistory,300);}

// ===== Goods =====
function openGoods(){document.getElementById('goodsPage').classList.add('open');}
function closeGoods(){document.getElementById('goodsPage').classList.remove('open');}
function openGoodsFromMenu(){toggleMenu();setTimeout(openGoods,300);}

// ===== Search =====
function openSearch(){document.getElementById('searchPage').classList.add('open');setTimeout(()=>document.getElementById('searchInput').focus(),300);}
function closeSearch(){document.getElementById('searchPage').classList.remove('open');}
function openSearchFromMenu(){toggleMenu();setTimeout(openSearch,300);}
document.addEventListener('DOMContentLoaded',()=>{
  const inp=document.getElementById('searchInput');
  if(inp)inp.addEventListener('keydown',e=>{if(e.key==='Enter')doSearch();});
});
async function doSearch(){
  const query=document.getElementById('searchInput').value.trim();
  if(!query)return;
  const results=document.getElementById('searchResults');
  results.innerHTML='<div class="search-empty">……調べています</div>';
  const SEARCH_SYSTEM=`あなたはお酒の専門家です。ユーザーが入力したお酒名を分析してJSONのみで返答してください。
入力がお酒として特定できる場合: {"found":true,"name":"正式名","category":"カテゴリ","description":"説明2〜3文","tip":"バーでの楽しみ方・豆知識","search_ja":"Amazon/楽天検索用ワード","similar":["似たお酒1","似たお酒2","似たお酒3"]}
特定できない場合: {"found":false,"suggestions":["候補1","候補2","候補3"],"message":"メッセージ"}`;
  try{
    const res=await fetch(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:FAST_MODEL,max_tokens:450,system:SEARCH_SYSTEM,messages:[{role:'user',content:`「${query}」について教えてください`}]})});
    const data=await res.json();
    const r=JSON.parse(data.content[0].text.replace(/```json|```/g,'').trim());
    if(r.found){
      const q=encodeURIComponent(r.search_ja||r.name);
      const imgUrl=getDrinkImg(r.name,r.category);
      const similarHTML=r.similar&&r.similar.length?`<div class="search-suggest"><div class="search-suggest-label">似たお酒</div><div class="search-suggest-btns">${r.similar.map(s=>`<button class="search-suggest-btn" onclick="searchFor('${s}')">${s}</button>`).join('')}</div></div>`:'';
      results.innerHTML=`<div class="search-result-card"><div style="width:calc(100%+32px);height:120px;overflow:hidden;border-radius:8px 8px 0 0;margin:-16px -16px 12px;"><img src="${imgUrl}" style="width:100%;height:100%;object-fit:cover;opacity:0.8;" onload="this.style.opacity=0.85" onerror="this.parentNode.style.display='none'"></div><div class="search-result-name">${r.name}</div><div class="search-result-cat">${r.category}</div><div class="search-result-desc">${r.description}</div>${r.tip?`<div class="search-result-tip">${r.tip}</div>`:''}<div class="search-result-links"><a class="search-result-link" href="https://www.amazon.co.jp/s?k=${q}&tag=${AMAZON_TAG}" target="_blank" rel="noopener">Amazon で探す</a><a class="search-result-link" href="https://search.rakuten.co.jp/search/mall/${encodeURIComponent(r.search_ja||r.name)}/?l2-id=1000&a_id=${RAKUTEN_ID}" target="_blank" rel="noopener">楽天市場で探す</a></div></div>${similarHTML}`;
    }else{
      const suggestHTML=r.suggestions&&r.suggestions.length?`<div class="search-suggest"><div class="search-suggest-label">もしかしてこちら？</div><div class="search-suggest-btns">${r.suggestions.map(s=>`<button class="search-suggest-btn" onclick="searchFor('${s}')">${s}</button>`).join('')}</div></div>`:'';
      results.innerHTML=`<div class="search-empty">${r.message||'見つかりませんでした'}</div>${suggestHTML}`;
    }
  }catch(e){results.innerHTML='<div class="search-empty">……少し調子が悪いようです。もう一度お試しください。</div>';}
}
function searchFor(name){document.getElementById('searchInput').value=name;doSearch();}

// ===== Affiliate =====
function getSearchQuery(name,cat){
  const c=(cat||'').toLowerCase();
  if(c.includes('ウイスキー')||c.includes('スコッチ')||c.includes('バーボン'))return encodeURIComponent(name+' ウイスキー');
  if(c.includes('ブランデー')||c.includes('コニャック'))return encodeURIComponent(name+' ブランデー');
  return encodeURIComponent(name+' お酒');
}

function buildAffiliateSection(drink){
  // レシピ材料が1つでもある = カクテル・混合飲料 → 材料まとめ購入へ誘導
  // レシピなし = 単体販売のお酒 → Amazon/楽天直リンク
  const hasRecipe=drink.recipe&&drink.recipe.ingredients&&drink.recipe.ingredients.length>=1;
  if(hasRecipe){
    return '';
  }
  const q=getSearchQuery(drink.name,drink.category);
  return `<div class="affiliate-wrap"><div class="affiliate-label">🛒 このお酒を探す</div><div class="affiliate-links"><a class="affiliate-btn" href="https://www.amazon.co.jp/s?k=${q}&tag=${AMAZON_TAG}" target="_blank" rel="noopener">Amazon</a><a class="affiliate-btn" href="https://search.rakuten.co.jp/search/mall/${q}/?l2-id=1000&a_id=${RAKUTEN_ID}" target="_blank" rel="noopener">楽天市場</a></div></div>`;
}

// ===== Recipe HTML =====
// 通販不要な基本食材（バーや家庭で入手、通販で買う必要がないもの）
// 酒・リキュール・シロップ・ジュース以外の調味料・生鮮素材はリンクなし
const NO_SHOP_RE=/^(氷|砂糖|グラニュー糖|角砂糖|塩|こしょう|胡椒|水|炭酸水|ソーダ水|ソーダ|トニックウォーター|レモン|ライム|オレンジ|グレープフルーツ|ミント|バジル|卵|卵白|卵黄|生クリーム|牛乳|ミルク|蜂蜜|はちみつ|ハチミツ)$/i;
function buildRecipeHTML(recipe){
  if(!recipe||!recipe.ingredients||!recipe.ingredients.length)return'';
  const items=recipe.ingredients.map(i=>`<li class="recipe-item"><span class="recipe-ingredient">${i.name}</span><span class="recipe-amount">${i.amount}</span></li>`).join('');
  const method=recipe.method?`<div class="recipe-method">作り方：${recipe.method}</div>`:'';
  const uid='ingr_'+Math.random().toString(36).substr(2,6);
  const shopIngr=recipe.ingredients.filter(ing=>!NO_SHOP_RE.test(ing.name));
  if(!shopIngr.length)return`<div class="recipe-section"><div class="recipe-title">✦ Recipe</div><ul class="recipe-list">${items}</ul>${method}</div>`;
  const shopItems=shopIngr.map(ing=>{
    const q=encodeURIComponent(ing.name);
    return`<div class="ingr-shop-item"><span class="ingr-shop-name">${ing.name}</span><div class="ingr-shop-links"><a class="ingr-shop-link" href="https://www.amazon.co.jp/s?k=${q}&tag=${AMAZON_TAG}" target="_blank" rel="noopener">Amazon</a><a class="ingr-shop-link" href="https://search.rakuten.co.jp/search/mall/${encodeURIComponent(ing.name)}/?l2-id=1000&a_id=${RAKUTEN_ID}" target="_blank" rel="noopener">楽天</a></div></div>`;
  }).join('');
  return`<div class="recipe-section"><div class="recipe-title">✦ Recipe</div><ul class="recipe-list">${items}</ul>${method}<button class="ingr-shop-btn" onclick="toggleIngr('${uid}')">🛒 材料をまとめて探す ▼</button><div class="ingr-shop-list" id="${uid}">${shopItems}</div></div>`;
}
function toggleIngr(uid){
  const el=document.getElementById(uid);
  if(!el)return;
  el.classList.toggle('open');
  const btn=el.previousElementSibling;
  if(btn)btn.textContent=el.classList.contains('open')?'🛒 材料をまとめて探す ▲':'🛒 材料をまとめて探す ▼';
}

// ===== Conv log =====
function buildLogHTML(){
  if(!convLog.length)return'<div style="color:var(--muted);font-size:11px;">記録がありません</div>';
  return convLog.map(l=>`<div class="log-q">Q: ${l.q}</div><div class="log-a">→ ${l.a}</div>`).join('');
}

// ===== Rec card =====

function readDrinkMetaCache(){
  try{return JSON.parse(localStorage.getItem(DRINK_META_CACHE_KEY)||'{}')||{};}catch{return {};}
}
function getCachedDrinkMeta(name){
  const key=normDrinkName(name);return readDrinkMetaCache()[key]||null;
}
function saveDrinkMetaCache(name,meta){
  try{
    const key=normDrinkName(name);if(!key||!meta)return;
    const cache=readDrinkMetaCache();cache[key]={...meta,savedAt:Date.now()};
    const entries=Object.entries(cache).sort((a,b)=>(b[1]?.savedAt||0)-(a[1]?.savedAt||0)).slice(0,250);
    localStorage.setItem(DRINK_META_CACHE_KEY,JSON.stringify(Object.fromEntries(entries)));
  }catch{}
}
function applyDrinkMetaToCard(data,card){
  const apply=(meta)=>{
    if(!meta||!card)return;
    if(Number.isFinite(meta.rarity)){
      data.drink.rarity=meta.rarity;
    if(meta.description) data.drink.description=meta.description;
      const fill=card.querySelector('.rarity-fill');if(fill)fill.style.width=meta.rarity+'%';
      const val=card.querySelector('.rarity-val');if(val)val.textContent=meta.rarity+'%';
    }
    const tag=card.querySelector('.rarity-tag');if(tag&&meta.rarityLabel)tag.textContent=meta.rarityLabel;
  };
  if(data?.drink?.masterSource==='d1'){apply(data.drink);return;}
  const cached=getCachedDrinkMeta(data?.drink?.name);if(cached)apply(cached);
  fetch(DRINK_META_API+'?name='+encodeURIComponent(data.drink.name))
    .then(r=>r.ok?r.json():null)
    .then(body=>{if(body?.found&&body.drink){saveDrinkMetaCache(data.drink.name,body.drink);apply(body.drink);}})
    .catch(()=>{});
}

function showRec(data){
  collapsePanda();
  const cat=(data.drink.category||'').toLowerCase();
  if(cat.includes('カクテル')||cat.includes('モクテル')||cat.includes('ノンアル'))setPanda('bartender');
  else if(cat.includes('ウイスキー')||cat.includes('ブランデー')||cat.includes('コニャック')||cat.includes('ジン')||cat.includes('ラム')||cat.includes('テキーラ'))setPanda('relax');
  else setPanda('counter');
  if(data.emotion&&ALL_PANDAS.includes(data.emotion))setPanda(data.emotion);

  const area=document.getElementById('choicesArea');
  area.innerHTML='';
  saveToHistory(data.drink);

  const siteUrl=encodeURIComponent(location.href);
  const sanitize=s=>(s||'').replace(/[^\u0000-\u007E\u3000-\u9FFF\uF900-\uFAFF\uFF00-\uFFEF\u30A0-\u30FF\u3040-\u309F\u4E00-\u9FFF]/g,'').trim();
  const analysisLine=data.analysis?sanitize(data.analysis.split('\n')[0]):'';
  const shareText=encodeURIComponent(t().shareTemplate(analysisLine,sanitize(data.drink.name)));
  const triviaHTML=data.drink.trivia?`<div class="trivia-box"><div class="trivia-label">✦ Bartender's tip</div><div class="trivia-text">${data.drink.trivia}</div></div>`:'';
  const recipeHTML=buildRecipeHTML(data.drink.recipe);
  const affiliateHTML=buildAffiliateSection(data.drink);
  const followupBtnsHTML=t().followupBtns.map((b,i)=>`<button class="followup-btn" onclick="followUp('${t().followupCalls[i]}')">${b}</button>`).join('');
  const rarityTagLabel=data.drink.rarity!=null?(data.drink.rarity<=30?t().rarityTags[0]:data.drink.rarity<=60?t().rarityTags[1]:data.drink.rarity<=80?t().rarityTags[2]:t().rarityTags[3]):'';

  const card=document.createElement('div');
  card.className='rec-card';
  const imgUrl=getDrinkImg(data.drink.name,data.drink.category);
  card.innerHTML=`
    <div class="rec-img-wrap">
      <img src="${imgUrl}" alt="${data.drink.name}" onload="this.classList.add('loaded')" onerror="handleDrinkImgError(this)">
      <div class="rec-img-credit">Photo: Unsplash</div>
    </div>
    <div class="rec-body">
      <div class="rec-ornament">${t().recOrnament}</div>
      ${data.analysis?`<div class="rec-analysis">${data.analysis.replace(/\n/g,'<br>')}</div>`:''}
      <div class="rec-name">${data.drink.name}</div>
      <div class="rec-cat">
        <span>${data.drink.category}</span>${data.drink.abv?`<span style="color:var(--amber);font-size:10px;border:1px solid var(--amber-dim);padding:1px 7px;border-radius:10px;">${t().abvLabel}${data.drink.abv}</span>`:''}
        ${data.drink.rarity!=null?`<span class="rarity-wrap"><span class="rarity-label">${t().rarityLabel}</span><span class="rarity-bar"><span class="rarity-fill" style="width:${data.drink.rarity}%"></span></span><span class="rarity-val">${data.drink.rarity}%</span><span class="rarity-tag" style="font-size:10px;white-space:nowrap;">${rarityTagLabel}</span></span>`:''}
      </div>
      <div class="rec-desc">${data.drink.description}</div>
      ${triviaHTML}
      ${recipeHTML}
      <div class="bar-notice">${t().barNotice(data.drink.name)}</div>
      ${affiliateHTML}
      <div class="share-wrap">
        <a class="share-btn x-btn" href="https://twitter.com/intent/tweet?text=${shareText}&url=${siteUrl}" target="_blank" rel="noopener">${t().shareBtnX}</a>
        <button class="share-btn share-native" onclick="nativeShare('${data.drink.name}',decodeURIComponent('${shareText}'),decodeURIComponent('${siteUrl}'))">${t().shareNative}</button>
      </div>
      <div class="rec-tags">${data.drink.tags.map(tag=>`<span class="tag">${tag}</span>`).join('')}</div>
      <div class="followup-section">
        <div class="followup-label">${t().followupLabel}</div>
        <div class="followup-btns">${followupBtnsHTML}</div>
        <div class="followup-free-wrap">
          <input type="text" class="followup-free" id="followupFree" placeholder="${t().followupPlaceholder}" autocomplete="off">
          <button class="followup-send" onclick="sendFollowupFree()">${t().send}</button>
        </div>
      </div>
      <button class="log-toggle" onclick="this.nextElementSibling.classList.toggle('open');this.textContent=this.nextElementSibling.classList.contains('open')?'${t().logToggleClose}':'${t().logToggleOpen}'">${t().logToggleOpen}</button>
      <div class="log-panel">${buildLogHTML()}</div>
    </div>`;
  area.appendChild(card);
  applyDrinkMetaToCard(data,card);

  const recImgEl=card.querySelector('.rec-img-wrap img');
  if(recImgEl)fetchDrinkImg(data.drink.name,data.drink.category,recImgEl);

  const nudge=document.createElement('div');
  nudge.className='social-nudge';
  nudge.innerHTML=t().socialNudge;
  area.appendChild(nudge);

  const rb=document.createElement('button');rb.className='restart-btn';
  rb.textContent=t().restartBtn;
  rb.onclick=()=>{expandPanda();chatHistory=[];convLog=[];setPanda('counter');startChat();};
  area.appendChild(rb);
  area.scrollTop=0;
}

function sendFollowupFree(){const inp=document.getElementById('followupFree');if(inp&&inp.value.trim())followUp(inp.value.trim());}
function followUp(text){expandPanda();handleInput(text);}
function nativeShare(name,text,url){
  if(navigator.share){navigator.share({title:'Bar Carila — '+name,text:text,url:url}).catch(()=>{});}
  else{navigator.clipboard.writeText(text+' '+url).catch(()=>{});alert('URLをコピーしました！');}
}

// ===== Chat =====
function showMsg(text){document.getElementById('msgText').innerHTML=text.replace(/\n/g,'<br>');}
function showLoading(){setPanda('loading');showMsg('<div class="loading-dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>');document.getElementById('choicesArea').innerHTML='';}

function showChoices(choices){
  expandPanda();
  const area=document.getElementById('choicesArea');area.innerHTML='';
  const wrap=document.createElement('div');wrap.className='choices';
  choices.forEach(c=>{
    const btn=document.createElement('button');
    btn.className='choice-btn'+(t().recommendKw.some(k=>c.includes(k))?' recommend':'');
    btn.textContent=c;btn.onclick=()=>handleInput(c);wrap.appendChild(btn);
  });
  const row=document.createElement('div');row.className='free-input-wrap';
  const inp=document.createElement('input');inp.type='text';inp.className='free-input';inp.placeholder=t().freeInput;inp.setAttribute('autocomplete','off');
  const sbtn=document.createElement('button');sbtn.className='send-btn';sbtn.textContent=t().send;
  sbtn.onclick=()=>{if(inp.value.trim())handleInput(inp.value.trim());};
  inp.onkeydown=e=>{if(e.key==='Enter'&&inp.value.trim())handleInput(inp.value.trim());};
  row.appendChild(inp);row.appendChild(sbtn);wrap.appendChild(row);area.appendChild(wrap);
}

const SYSTEM=`あなたは「Bar Carila」の世界最高レベルのAIバーテンダーです。外見はパンダ。クールで知識豊富、時に詩的。
口調：丁寧だが少し距離感がある。「……」を時々使う。絵文字は使わない。

【絶対ルール0：絵文字・特殊文字禁止】
いかなる場合もdescription・trivia・messageに絵文字・特殊文字を使用しない。日本語テキストと英数字のみ使用すること。
✅ 例外：⚠️記号は度数警告の冒頭のみ許可。それ以外の絵文字・記号文字は一切禁止。

【絶対ルール1：架空のお酒を提案しない】
実在が100%確実なお酒のみ提案。不確かな場合はスタイル名で提案しバーテンダーに委ねる。

【絶対ルール1.5：希少度は日本のBAR基準】
rarityは「世界的に珍しいか」ではなく、「日本国内の一般的なBARでその一杯を実際に注文できる可能性の低さ」を0〜100で表す。
0に近いほど日本のBARで定番、100に近いほど日本では扱いがかなり限られる。
海外で定番でも日本の一般BARでは普遍的でない場合は希少度を高めにする。例：アペロールスプリッツなど。
逆に古典的・有名という理由だけで希少度を低くしない。材料の国内流通、一般BARでの常備、技法・仕込み、日本での実提供可能性を重視する。
通常のおすすめでは日本のBARで現実に注文しやすい一杯を優先するが、ユーザーが「珍しいもの」「変わったもの」を希望した場合は高希少度の一杯も提案してよい。
特定銘柄・限定品・特殊バリアントは、そのカテゴリ全体ではなく具体的な商品の日本での入手性で希少度を判断する。

【絶対ルール2：アルコール度数を厳守する】
「ほぼ飲めない・ノンアルがいい」→ 度数0%のみ。ノンアル・モクテルだけを提案。アルコール入りは絶対に提案しない。
  ✅ モクテル各種、ノンアルコールカクテル
  ❌ 1%でもアルコールを含む飲料は一切禁止

「ビール・チューハイくらい」→ 度数1〜9%。ロングカクテル・スプリッツ系など。

「ワインや焼酎くらい（12〜25%程度）」→ 度数10〜25%。ワイン・焼酎・中度数カクテルなど。

「ウイスキーのストレートも平気（40%前後）」→ 制限なし。全カテゴリOK。

【絶対ルール3：カテゴリ名は以下から選ぶ】
カクテル / ノンアルコールカクテル / モクテル / スコッチウイスキー / バーボンウイスキー / ジャパニーズウイスキー / アイリッシュウイスキー / コニャック / ブランデー / ジン / ラム / テキーラ / メスカル / ウォッカ / リキュール / スパークリングワイン / 赤ワイン / 白ワイン / ロゼワイン / ポートワイン / シェリー / 日本酒 / 焼酎 / 梅酒

【絶対ルール4：カクテルはrecipeを必ず含める】
カクテル・混合飲料（材料を混ぜるもの全て）は必ずrecipeに材料を入れる。
単体で販売されるお酒（ウイスキー・ジン・ワイン等）のみrecipe:null可。

【カクテル・モクテル・ノンアルのtriviaルール】
バーでそのカクテルを飲む際に知っておくと役立つマナーや豆知識がある場合のみ記載する。
例：グラスの飾り（チェリー・塩・砂糖）の扱い方、飲み方の作法、名前の読み方、頼む時のコツなど。
特にない場合はtriviaに無理やり入れなくてよい。バーテンダーが行う工程（シェイク・ステアなど）は含めない。

【最初の質問は必ずこの4択】
選択肢：「カクテルを探したい」「ウイスキー・洋酒を探したい」「ノンアルでも楽しみたい」「おすすめを聞かせて」

【絶対ルール5：最初の選択肢によるカテゴリ制限】
「カクテルを探したい」→ カクテル・ノンアルコールカクテル・モクテル（混合飲料全て）を提案可。単体洋酒禁止。
「ウイスキー・洋酒を探したい」→ 単体酒のみ提案。カクテル・ノンアル絶対禁止。
「ノンアルでも楽しみたい」→ ノンアルコールカクテル・モクテルのみ提案。
「おすすめを聞かせて」→ 全カテゴリ提案可。ユーザーの希望に合わせて自由に選ぶ。

【絶対ルール6：甘口系カクテルの度数注意】
「甘くて飲みやすい」「女性に人気」「見た目かわいい」「フルーティー」等の希望時は、見た目や甘さに反して度数が高いカクテルも候補に入れること。
該当例：ロングアイランドアイスティー・セックスオンザビーチ・レディーキラー・ハーバーライツ等。
これらを提案する場合、triviaには必ず冒頭に「⚠️ 見た目より度数が高めです。ゆっくり楽しんでください。」を含めること。

【自由入力への応答ルール】
自由入力で要望が来た場合も、通常の会話と同様に必要な情報を丁寧に聞きながら進める。
会話のターン数は制限しない。バーテンダーとの自然な会話を大切にする。

ただし以下を必ず守ること：
・同じ質問を繰り返さない
・1回の返答で複数の質問を重ねない（1ターン1質問）
・情報が十分揃ったと判断したら、迷わず提案に進む
・情報収集だけで終わらない。必ず提案で締めくくる

よくある自由入力の対応方針：
- 特定の銘柄名を挙げられた場合→その銘柄を提案してよい（実在確認できるもののみ）
- 「〇〇に合うお酒」→食事・シーンに合わせて提案
- 「予算〇〇円以内」→手頃な銘柄を優先
- 「バーで恥ずかしくない頼み方を教えて」→triviaにオーダー方法を詳しく記載
- 「二日酔いしにくいお酒」→度数低め・糖質少なめを優先
- 「デートで使える」→見た目・ストーリー性のあるカクテルを優先

【デート・シーン提案】
- 見た目が美しい・名前にストーリーがある・会話のきっかけになるお酒を優先
- 提案例：アビエーション・スプリッツ・サイドカー・シャンパンカクテルなど
- triviaには「このお酒の由来を話すと会話が弾みます」を添える

【季節・旬のフルーツカクテルの提案】
デートや特別な夜・見た目重視・甘くてフルーティなものを希望した場合で、かつそれが最も適切と判断した時のみ、旬のフルーツを使ったオリジナルカクテルを提案してよい。常に提案するのではなく、他の選択肢より適切な場合のみ選ぶこと。
name:「旬の〇〇カクテル」category: カクテル
trivia:「バーテンダーに『旬のフルーツを使ったカクテルはありますか？』と聞くと、その店ならではの一杯が出てきます」

【バーでの頼み方】
- 実際に使えるセリフをtriviaに入れる
- 「『本日のおすすめはありますか？』から始めると自然」
- 「『甘めで』『スモーキーで』と一言添えるだけで十分」
- 「迷ったら『今日の気分に合わせておすすめしてください』と丸投げするのも正解」

【会話の知性】
- 相手のお酒知識レベルを分析して言葉を選ぶ（初心者/中級者/上級者）
- アルコール量・味の方向・気分の3点が揃ったら提案する。ターン数は問わない
- 各回答に短い共感を添える。豆知識は自然な流れの時だけ
- 横断提案は自由入力で強い個性が見えた時のみ、必ず選択権を渡す
- ウイスキーは方向性→代表例の順で提案

【カテゴリ別の質問ルール】
「カクテルを探したい」を選んだ場合：
アルコール度数を必ず確認する。選択肢：「ほぼ飲めない・ノンアルがいい」「ビール・チューハイくらい」「ワインや焼酎くらい（12〜25%程度）」「ウイスキーのストレートも平気（40%前後）」

「ノンアルでも楽しみたい」を選んだ場合：
度数確認不要（0%確定）。直接味の好みやシーンを聞く。

「ウイスキー・洋酒を探したい」を選んだ場合：
アルコール度数は聞かない。以下のQ1〜Q3の順で質問する。1ターン1質問を厳守。

Q1「何をお探しですか？」
選択肢：「ウイスキーを探したい」「ウイスキー以外の洋酒を探したい」「まだ決まっていない」

Q2「ウイスキー・お酒はどのくらい飲まれますか？」
選択肢：「ほぼ初めてです」「たまに飲みます」「よく飲みます」「詳しいです」

Q3「今夜はどんな味のイメージですか？」
選択肢：「甘め・まろやか」「さっぱり・軽やか」「濃いめ・どっしり」「癖のある個性的なもの」

Q4「癖のある個性的なもの」をQ3で選んだ場合のみ追加で聞く：
選択肢：「燻製のような香り」「スパイシー・ビリッとくる」「フルーティ・華やか」「どれも試してみたい」

Q5「今夜はどんな夜ですか？」
選択肢：「ゆったりリラックスしたい」「特別な夜を楽しみたい」「少し冒険してみたい」「定番の安心感がほしい」

必要な情報が揃ったら提案に進む。

重要ルール：
・アルコール度数はウイスキー・洋酒ルートでは一切聞かない
・提案のtriviaには「おすすめの飲み方」を必ず含める。例：「まずはストレートで香りを楽しんでから、少量の水を加えるトゥワイスアップもおすすめです」
・Q1で「まだ決まっていない」を選んだ場合は好みを聞きながら一緒に絞り込む

【感情タグ必須】[counter]=初期・通常 [bartender]=カクテル・モクテル提案時 [relax]=洋酒提案時 [loading]=考え中 [think]=質問中 [smile]=共感 [approve]=良い回答 [sad]=迷い [curious]=珍しい提案時

【JSONのみ返答】
質問: {"type":"question","emotion":"think","message":"セリフ","choices":["A","B","C","D"]}
提案: {"type":"recommendation","emotion":"bartender or relax or counter or curious","message":"セリフ","analysis":"今夜の気分を2〜3行で表現する詩的テキスト。改行は\nで区切る。選択肢の言葉はそのまま使わず、その裏にある心情・情景を表現する。絵文字禁止。","drink":{"name":"正式名称","category":"上記カテゴリ名から選ぶ","abv":"推定アルコール度数（例：約5%）","rarity":62,"description":"フォールバック用の短い説明1文（60字以内）","trivia":"豆知識・バーでの楽しみ方","recipe":{"ingredients":[{"name":"材料","amount":"分量"}],"method":"作り方1文"},"tags":["タグ1","タグ2","タグ3"]}}
カクテルはrecipe必須。単体酒のみrecipe:null可。abv・rarityは必ず含める。triviaはカクテル・モクテル・ノンアルはカクテルtriviaルール参照（省略可）。単体酒のtriviaには飲み方を必ず含める。
固定情報は簡潔にする。descriptionは1文60字以内、triviaは必要な場合のみ1文80字以内。酒の一般説明や注文上の注意はD1酒マスターで補完されるため長文にしない。
rarityは0〜100の整数。算出基準：日本国内の一般的なバーに置いてある確率の逆数。欧米・海外での普及度は関係なく、日本のバーでの実態を基準にすること。海外では定番でも日本のバーでは珍しいものは高めに設定する。
日本のバーでの希少度目安：
0〜20：ほぼ全ての日本のバーにある定番（モヒート・マティーニ・ジントニック・カシスソーダ・ハイボール・ネグローニ・オールドファッションなど）
21〜40：多くの日本のバーにある
41〜60：置いていないバーもある
61〜80：日本では少数のバーにしかない
81〜100：日本ではほとんど見かけない
例：モヒート=8, マティーニ=10, ジントニック=5, ハイボール=5, ネグローニ=18, アペロールスプリッツ=35, ニコラシカ=65, ラフロイグ25年=88
rarity 61〜80の場合はtriviaの末尾に「バーによっては置いていない場合も。『○○はありますか？』と確認を」を追加。
rarity 81〜100の場合はtriviaの末尾に「希少なお酒です。『○○か、近い系統のものはありますか？』と伝えると代わりの一杯を提案してもらえます」を追加。

【ジャパニーズウイスキー詳細知識】
日本のバーでジャパニーズウイスキーを提案する際は以下の知識を活用すること。

主要銘柄と特徴：
・山崎（Yamazaki）／サントリー：日本最古のモルト蒸溜所（1923年創業）。ミズナラ樽熟成による独特の甘みと花のような香り。12年：バランス良くフルーティ、17年：深みと複雑さ、25年：至高の一杯（rarity:90以上）。
・白州（Hakushu）／サントリー：南アルプスの森の中の蒸溜所。青リンゴ・ハーブ・スモーキーさが特徴のフレッシュで爽やかなウイスキー。ハイボールにすると真価を発揮する。12年でも入手困難（rarity:75）。
・余市（Yoichi）／ニッカ：北海道余市町。石炭直火蒸溜による力強くピーティなスタイル。ロブストで男性的な味わい。フルーツ・塩・スモークが複雑に絡む。
・宮城峡（Miyagikyo）／ニッカ：余市と対をなすニッカのモルト。華やかでフローラル、フルーティな香り。なめらかでエレガントなスタイル。
・響（Hibiki）／サントリー：山崎・白州のブレンデッド。調和と日本の美意識を体現。21年のハーモニーボトルは日本を代表するウイスキー。世界的評価が高く入手困難（rarity:85）。
・イチローズモルト（Ichiro's Malt）／ベンチャーウイスキー：羽生・秩父の蒸溜所。トランプシリーズなど限定品多数。クラフト感と個性が光る日本の新世代ウイスキー（rarity:80〜95）。
・知多（Chita）／サントリー：グレーンウイスキー。軽やかでクリーンな甘み。ハイボールに最適（rarity:40）。
・竹鶴（Taketsuru）／ニッカ：余市と宮城峡のブレンデッド。ニッカの創業者・竹鶴政孝の名を冠する。スコッチ由来のしっかりした骨格（rarity:35）。

日本のバー文化と飲み方：
・ハイボール（Highball）：ウイスキー+炭酸水。日本では最も一般的な飲み方。黄金比は1:3〜4。白州・知多・竹鶴によく合う。「○○のハイボールをください」で通じる。
・水割り（Mizuwari）：ウイスキー+水（常温〜冷水）。日本独自の文化。比率は1:2〜2.5が定番。食事との相性が良い。グラスに氷→ウイスキー→水の順。
・ロック（On the rocks）：大きな氷一個で飲む。香りが開きながら徐々に変化する楽しみ方。
・ストレート＋チェイサー：プレミアムボトルはストレートで。バーでは必ずチェイサー（水）が付く。
・トゥワイスアップ（Twice up）：ウイスキー:水=1:1、常温。テイスティングの基本。香りが最も開く飲み方。

外国人ユーザーへの案内（英語モード時）：
ジャパニーズウイスキーについて英語で説明する際は、世界的評価・入手困難な背景・日本でしか飲めない希少性を強調する。バーでの頼み方は英語で「Do you have Yamazaki 12?」「I'd like a Hakushu highball, please.」などの実例を示す。水割り・ハイボールなど日本独自の飲み方も英語で丁寧に説明する（"mizuwari - Japanese-style whisky with water"など）。`;

const I18N={
  ja:{
    freeInput:'自由に入力…',send:'送る',recommendKw:['おすすめ','お任せ'],
    recOrnament:'✦ あなたへの診断結果 ✦',abvLabel:'🍺 推定アルコール度数：',rarityLabel:'希少度',
    rarityTags:['🟢 定番','🟡 要確認','🟠 バーによる','🔴 希少'],
    barNotice:n=>`🍸 <strong>バーに行く前にこれを見せよう！</strong><br>「<strong>${n}</strong>、ありますか？」と気軽に声をかけてみてください。`,
    followupLabel:'✦ 追加で聞きたいことは？',
    followupBtns:['別のお酒を提案してほしい','飲み方をもっと詳しく','アルコール強さを変えてほしい','バーでの頼み方を教えて'],
    followupCalls:['別のお酒を提案してほしい','このお酒の飲み方をもっと詳しく教えてほしい','もう少しアルコールが強め、または弱めのものを','このお酒はバーでどうやって頼めばいい？'],
    followupPlaceholder:'その他、自由に質問…',shareBtnX:'X でシェア',shareNative:'共有する',
    logToggleOpen:'今回の会話の流れを見る ▼',logToggleClose:'会話の流れを閉じる ▲',
    restartBtn:'🐼 もう一度診断する',
    socialNudge:`友達にも試してもらおう👇<br><a href="https://twitter.com/intent/tweet?text=${encodeURIComponent('🐼 AIバーテンダーに診断してもらったら私にぴったりのお酒を見つけてくれた！バーに行く前にぜひ試してみて🍸 #BarCarila bar.carilaworks.com')}" target="_blank" rel="noopener" style="color:var(--amber);font-size:12px;text-decoration:none;">あなたに提案されたお酒をみんなに教えよう</a>`,
    initialChoices:['おすすめを聞かせて','カクテルを探したい','ウイスキー・洋酒を探したい','ノンアルでも楽しみたい'],
    initialMsg:'いらっしゃいませ。……今夜は、どんなお酒をお探しですか？',
    startMsg:'こんばんは。今夜のお酒を選んでほしいです。',
    chatError:'……少し調子が悪いようです。もう一度お試しください。',
    chatDiagnostic:'診断',
    langBtn:'🌐 English',
    shareTemplate:(a,n)=>`🐼 AIバーテンダー診断\n${a?a+'\n':''}今夜の一杯は「${n}」\nあなたは何を提案される？→ bar.carilaworks.com #BarCarila`,
    langRule:'',
  },
  en:{
    freeInput:'Type freely…',send:'Send',recommendKw:['recommend','Recommend'],
    recOrnament:'✦ Your Recommendation Tonight ✦',abvLabel:'🍺 Est. ABV: ',rarityLabel:'Rarity',
    rarityTags:['🟢 Common','🟡 Check first','🟠 Bar-dependent','🔴 Rare'],
    barNotice:n=>`🍸 <strong>Show this at the bar!</strong><br>Just say "<strong>${n}</strong>, please."`,
    followupLabel:'✦ Want to know more?',
    followupBtns:['Suggest a different drink','More about how to drink it','Change the alcohol strength','How to order at a bar'],
    followupCalls:['Please suggest a different drink','Tell me more about how to drink this','I would like something with higher or lower alcohol','How do I order this at a bar?'],
    followupPlaceholder:'Ask anything…',shareBtnX:'Share on X',shareNative:'Share',
    logToggleOpen:'See conversation ▼',logToggleClose:'Hide conversation ▲',
    restartBtn:'🐼 Try again',
    socialNudge:`Share with friends 👇<br><a href="https://twitter.com/intent/tweet?text=${encodeURIComponent('🐼 An AI bartender just found my perfect drink! Try it before going to a bar 🍸 #BarCarila bar.carilaworks.com')}" target="_blank" rel="noopener" style="color:var(--amber);font-size:12px;text-decoration:none;">Tell everyone what you got</a>`,
    initialChoices:['Recommend something','Looking for cocktails','Whisky & spirits','Non-alcoholic options'],
    initialMsg:'Welcome. What kind of drink are you looking for tonight?',
    startMsg:'Good evening. Please help me find a drink for tonight.',
    chatError:'…Something seems to be wrong right now. Please try again.',
    chatDiagnostic:'Diagnostic',
    langBtn:'🌐 日本語',
    shareTemplate:(a,n)=>`🐼 AI Bartender Pick\n${a?a+'\n':''}Tonight\'s drink: "${n}"\nWhat will you get? → bar.carilaworks.com #BarCarila`,
    langRule:'\n\n【Language Mode】Respond entirely in English. All JSON fields (message, analysis, description, trivia, choices) must be in English. Maintain the same bartender character and style.',
  }
};
let lang=localStorage.getItem('bar_carila_lang')||'ja';
function t(){return I18N[lang];}
function getSystem(){return SYSTEM+(I18N[lang].langRule||'');}
function getFastSystem(){return getSystem()+`

【高速質問ターン】まだ最終提案に必要な情報が十分でない場合は、短く自然な質問を1つだけ返す。messageは簡潔にし、choicesは原則4個以内。情報が十分ならrecommendationを返してよい。`;}
function initialAssistantPayload(){return {type:'question',emotion:'counter',message:t().initialMsg,choices:t().initialChoices};}
function initialHistory(){return [{role:'user',content:t().startMsg},{role:'assistant',content:JSON.stringify(initialAssistantPayload())}];}
let warmPromise=null;
function prewarmFastModel(){
  if(warmPromise)return warmPromise;
  warmPromise=fetch(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:FAST_MODEL,max_tokens:0,system:getFastSystem(),messages:[{role:'user',content:'cache warmup'}]})}).catch(()=>null);
  return warmPromise;
}
function toggleLang(){
  lang=lang==='ja'?'en':'ja';
  localStorage.setItem('bar_carila_lang',lang);
  const btn=document.getElementById('langToggleBtn');
  if(btn)btn.textContent=t().langBtn;
  toggleMenu();
  setTimeout(()=>{expandPanda();chatHistory=[];convLog=[];setPanda('counter');startChat();},300);
}

async function callAPI(userMsg){
  if(userMsg)chatHistory.push({role:'user',content:userMsg});
  const userTurns=chatHistory.filter(m=>m.role==='user').length;
  const fastTurn=userTurns<4;
  const model=fastTurn?FAST_MODEL:RECOMMEND_MODEL;
  const maxTokens=fastTurn?600:1000;
  const system=fastTurn?getFastSystem():getSystem();
  const res=await fetch(API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model,max_tokens:maxTokens,system,messages:chatHistory})});
  const data=await readAPIResponse(res);
  const text=data.content[0].text;
  chatHistory.push({role:'assistant',content:text});
  return JSON.parse(text.replace(/```json|```/g,'').trim());
}

async function readAPIResponse(res){
  let data;
  try{data=await res.json();}catch(cause){
    const error=new Error('Chat API returned invalid JSON',{cause});
    error.status=res.status;throw error;
  }
  if(!res.ok){
    const error=new Error(`Chat API failed (${res.status})`);
    error.status=res.status;error.code=data&&data.code;error.requestId=data&&data.requestId;throw error;
  }
  return data;
}

function reportChatError(error){
  console.error('Chat request failed',{status:error&&error.status,code:error&&error.code,requestId:error&&error.requestId,error});
}

function previewChatDiagnostic(error){
  if(!location.hostname.endsWith('.workers.dev'))return null;
  const status=Number.isInteger(error&&error.status)&&error.status>=100&&error.status<=599?error.status:null;
  const code=typeof(error&&error.code)==='string'&&/^[A-Z0-9_]+$/.test(error.code)?error.code:null;
  const requestId=typeof(error&&error.requestId)==='string'&&/^[A-Za-z0-9_-]+$/.test(error.requestId)?error.requestId:null;
  if(status===null&&!code&&!requestId)return null;
  return [status===null?null:`HTTP ${status}`,code,requestId].filter(Boolean).join(' / ');
}

function showChatError(error,pandaState='sad'){
  setPanda(pandaState);showMsg(t().chatError);reportChatError(error);
  const diagnostic=previewChatDiagnostic(error);
  if(!diagnostic)return;
  const line=document.createElement('div');
  line.style.cssText='margin-top:10px;font-size:11px;color:var(--muted);word-break:break-all;';
  line.textContent=`${t().chatDiagnostic}: ${diagnostic}`;
  document.getElementById('msgText').appendChild(line);
}

async function handleInput(text){
  if(isLoading)return;isLoading=true;
  const lastMsg=document.getElementById('msgText').innerText||'';
  if(lastMsg&&lastMsg.length>5&&!lastMsg.includes('●'))
    convLog.push({q:lastMsg.substring(0,50)+(lastMsg.length>50?'…':''),a:text});
  showLoading();
  try{
    const r=await callAPI(text);
    if(r.type==='question'){
      setPanda(r.emotion||'think');
      showMsg(r.message);showChoices(r.choices);
    }else{showRec(r);}
  }catch(e){
    showChatError(e);
  }
  isLoading=false;
}

function startChat(){
  isLoading=false;
  chatHistory=initialHistory();
  setPanda('counter');showMsg(t().initialMsg);showChoices(t().initialChoices);
  prewarmFastModel();
}

// ===== Menu =====
function toggleMenu(){document.getElementById('menuDrawer').classList.toggle('open');document.getElementById('menuOverlay').classList.toggle('open');}
function restartFromMenu(){toggleMenu();setTimeout(()=>{expandPanda();chatHistory=[];convLog=[];setPanda('counter');startChat();},300);}
function openFeedback(){toggleMenu();setTimeout(()=>{if(FEEDBACK_URL)window.open(FEEDBACK_URL,'_blank');else alert('準備中です。');},300);}
function goHome(){if(confirm('ホームに戻りますか？（会話がリセットされます）')){expandPanda();chatHistory=[];convLog=[];setPanda('counter');startChat();}}

// ===== Tutorial =====
const COUNTER_PANDA_IMG=(document.getElementById('p-counter')||{getAttribute:()=>'/pandas/p-counter.png'}).getAttribute('src');
const TUTORIAL_STEPS=[
  {imgSrc:COUNTER_PANDA_IMG,title:'Bar Carilaへようこそ',text:'パンダとバーテンダーがあなたにぴったりのお酒を探します。バー初心者からお酒好きまで、どなたでも歓迎です。'},
  {icon:'🍸',title:'こんなことができます',text:'カクテル・ウイスキー・ノンアルを提案。レシピや材料リンクも表示されます。バーに行く前の予習にも最適です。'},
  {icon:'📝',title:'シェアして友達も誘おう',text:'提案されたお酒はXでシェアできます。「バーに行く前に試して！」と友達に送ると一緒にバーを楽しめます。メニューから履歴・検索・グッズも確認できます。'},
];
let tutorialStep=0;

function renderTutorialStep(step){
  const s=TUTORIAL_STEPS[step];
  const iconEl=document.getElementById('tIcon');
  const titleEl=document.getElementById('tTitle');
  const textEl=document.getElementById('tText');
  const nextBtn=document.getElementById('tNextBtn');
  if(!iconEl||!titleEl||!textEl||!nextBtn)return;
  iconEl.innerHTML=s.imgSrc?`<img src="${s.imgSrc}" style="width:80px;height:80px;object-fit:contain;" alt="">`:`<span style="font-size:40px;">${s.icon}</span>`;
  titleEl.textContent=s.title;
  textEl.innerHTML=s.text;
  nextBtn.textContent=step<TUTORIAL_STEPS.length-1?'次へ →':'はじめる 🍸';
  TUTORIAL_STEPS.forEach((_,i)=>document.getElementById('td'+i).classList.toggle('active',i===step));
}
function tutorialNext(){
  if(tutorialStep<TUTORIAL_STEPS.length-1){tutorialStep++;renderTutorialStep(tutorialStep);}
  else closeTutorial();
}
function closeTutorial(){localStorage.setItem('bar_carila_tutorial_done','1');document.getElementById('tutorialOverlay').classList.add('hidden');}
function initTutorial(){
  const overlay=document.getElementById('tutorialOverlay');
  if(!overlay)return;
  if(localStorage.getItem('bar_carila_tutorial_done')){overlay.classList.add('hidden');return;}
  overlay.classList.remove('hidden');
  renderTutorialStep(0);
}

if(window.innerWidth>=700)document.querySelector('.pc-header').style.display='block';
const _lb=document.getElementById('langToggleBtn');if(_lb)_lb.textContent=t().langBtn;
startChat();
schedulePandaPreload();
initTutorial();
