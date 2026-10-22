# CM の品質を上げる手法（外部の作り手と公式ガイドから）

2026-10-22 に集めたものです。各項目に出典と根拠の種類を付けています。手元で確かめていないものは、使う前に 07 の一覧で試す対象にしてください。

根拠: ✅ 確認済み（公式）／ ⚠️ 第三者の記事／ ❔ 未確認

## 1. 商品の見せ方

- 承認済みの商品写真を最初のフレームか参照に固定し、プロンプトでは動きだけを指示する。ラベル・形・照明は変えないと書く ⚠️（Luma ほか、商品動画のプロンプト集）
- 変えてはいけないものを列挙する: 形、比率、ラベル、色、素材 ⚠️（同上）
- 商品は「参照のとおり」と明記し、浮いているとき・手に取ったとき・身につけたときの見え方まで書く ✅（Higgsfield Seedance 2.5 ガイド）
- 商品の文字は `stays sharp and correctly spelled whenever visible` と書く ✅（同上）
- 見せ場の効果は1つに絞る（例: `one clean light pulse`）。手の変形などを禁じる ✅（同上）
- 商品だけの画像（台座の上、照明を決めたもの）を先に作り、場面の画像の手前に置く。背景は別の照明にして、商品の見え方を変えない ✅（Higgsfield の CM 解説、Cinema Studio 2.5）
- 「同じアングル、同じレンズの遠近感」「台座の大きさ・高さ・位置は同じ」と書いて固定する ✅（同上）
- 開始の画像と終了の画像を作り、その間の動きを1カットで生成する ✅（同上）
- 同じ商品・同じ人物のまま、ショットの節だけを変えて何本か作ると、1回の撮影で撮ったように揃う ⚠️（Runware、Seedance 2.5）

## 2. 人物の同一性の保ち方

- 人物の設定画を先に作る: ミディアムショット＋正面と背面の全身、無地の背景。以後の生成で参照に使う ✅（Higgsfield の CM 解説）
- 顔・髪・服・持ち物を参照に固定し、服の品目を列挙する。`identical features in every shot, zero drift` と添える ✅（Higgsfield Seedance 2.5 ガイド）
- 架空の人物なら `a wholly original, invented face` と書く ✅（同上）
- 指の数（`Exactly five fingers per hand`）、人数（`exactly four members`）を固定し、鏡や反射で人が増えないようにする ✅（同上）
- 状態の変化を引き継ぐ（汚れた服は、次のショットで勝手にきれいにならない）✅（同上）
- 参照は1つの役割に1つ。多人数の場面は、1人あたりの参照を増やす。上限まで詰め込まない ✅（同上）
- Kling の要素: 正面の画像1枚＋別の角度1〜3枚。説明には「無視してよい特徴」も書く ✅（Kling Element Library、2026-02-05）
- Veo 3.1: `Using the provided images for {A}, {B} and {C}, create …` の形で、参照を使い回して別のショットを作る ✅（Google Cloud、2025-10-16）

## 3. カメラワーク

- ショットを最初に書く。カメラの動きと被写体の動きは別の節に書く ⚠️（Runware、Seedance 2.5）
- 画角を度数で書き、`no lens drift mid-segment` と添える ✅（Higgsfield Seedance 2.5 ガイド）
- 画面の向き（被写体は常に右から左へ、など）を決めて、カットをまたいで保つ。カメラは軸の片側に置く ✅（同上）
- 台詞や緊張の場面はカメラを止め、アングルの変化を度数で書く（例: 右へ45度）✅（Higgsfield の CM 解説）
- 動きの大きさと速さを言葉で書く（`with small amplitude`、`at slow speed`）✅（MiniMax H3 公式ガイド）
- スローモーションは名前を付けた見せ場だけにして、それ以外は `no speed ramps` と書く ✅（Higgsfield Seedance 2.5 ガイド）

## 4. 締めのカット

- 最後に何で終わるか（商品／人物／どちらでもない）を決めて書く ✅（Higgsfield Seedance 2.5 ガイド）
- 最後の動きと止め方を書く（`hold`、`hard cut to black`、`cut on the last frame, no fade`）✅（同上）
- 商品をくっきり手前、人物をぼかして奥に置く締めの構図 ✅（Higgsfield の CM 解説）
- 価格や問い合わせ先は、余白を空けた絵を生成し、編集で重ねる。商品は動かさず、全体が見えるようにする ⚠️（商品動画のプロンプト集）

## 5. 全体の組み立て

- 節の順番: GLOBAL STYLE → SCENE（一行のあらすじ）→ CHARACTERS → LOCATION → FIRST FRAME AND BLOCKING → ショットごと → OPTICS → CAMERA → PHYSICS → LIGHTING → AUDIO ✅（Higgsfield Seedance 2.5 ガイド）
- 場所は人物と分けて書く。場所があいまいだと、カットの間で場所がずれる ✅（同上）
- 1つの照明の源を決め、方向と質を書く ✅（同上）
- 台詞の数を明記する（`Exactly two scripted spoken lines, nothing else spoken`）✅（同上）
- 音を消して見ても伝わるか確かめる。配信先の縦横比と、文字を置ける安全な範囲を確かめる ⚠️（商品動画のプロンプト集）

## 6. 手元の規則との関係

- 商品・ロゴ・建物を生成させるときは、上の手法で崩れにくくしたうえで、必ず実物の写真と照合します（規則 9b）。
- 曲は生成させません。プロンプトには `No music` を入れます（規則：BGM）。
- カットの数は内容で決めます。上の手法の「5つの区切り」などは例です。

## 出典
- Higgsfield「Seedance 2.5: Complete Prompting Guide」2026-08-13 https://higgsfield.ai/blog/seedance-2-5-prompting-guide
- Higgsfield「$350.000 AI Commercial - Full Prompts」2026-03-26 https://higgsfield.ai/blog/ai-commercial-youtube-guide
- Runware「Seedance 2.5 Prompting」2026-08-07 https://runware.ai/docs/models/bytedance-seedance-2-5/guides/prompting
- MiniMax「MiniMax-H3 prompt writing guide」2026-10-22 閲覧 https://huggingface.co/MiniMaxAI/MiniMax-H3
- Kling「Element Library 3.0 User Guide」2026-02-05 https://kling.ai/quickstart/klingai-element-library-3-user-guide
- Google Cloud「The ultimate prompting guide for Veo 3.1」2025-10-16 https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-veo-3-1
- Luma「25 AI Prompts for Video Ads in 2026」 https://lumalabs.ai/news/ai-prompts-video-ads
- Magic Hour「AI product video prompts: 8 shots for product photos」 https://magichour.ai/blog/ai-product-video-prompts
- Promptessor「15 AI Product Video Prompts for Ecommerce Ads (2026)」 https://promptessor.com/blog/ai-product-video-prompts-2026
