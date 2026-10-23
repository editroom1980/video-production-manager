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

## 6. AIっぽさを消す5つ（「動画編集の中の人」より）

出典: YouTube「【2026年最新版】AI臭を99％消す方法5選！プロが実践する自然なAI動画・画像の作り方を徹底解説」（チャンネル「動画編集の中の人」、2026年夏以前の公開、15分50秒） https://www.youtube.com/watch?v=Ar8P3gaJIzI 。依頼者が文字起こしを貼ったもの（2026-10-23）。根拠はすべて本人の経験談（⚠️）。

1. 物理の決まりをプロンプトに入れる（人や動物の動き）
   - 壊れてはいないが「現実ではありえない」動きが、AIっぽさの元。例: 月面なのに地球と同じ速さで歩く、登山なのに軽々と速く登る
   - 少なくとも「重心を安定させる」「動きに重さ（重力・負荷）を出す」の2つを書く。直した登山の動画は、歩きがゆっくりで、きつそうに見えるようになった
   - 質感も同じ。肌にしわも毛穴もないと人形のように見えるので、あえてノイズや肌の質感を入れる
   - 資料との関係: Higgsfield の Seedance 2.5 ガイドの PHYSICS の節（重さや布・髪の動きを書く）、ai-shortfilm-prompts の「不完全さを書く」、`visual-image` の de-slop.md と同じ方向
2. カメラを固定して動きを抑える
   - 動きが付きすぎてわざとらしい、見ていて酔う、という失敗が多い（特に日本語のプロンプトをそのまま入れたとき）
   - 使う言い方の例: `static camera`、`slow push-in`、手ぶれを足したいときは `handheld micro-movement`
   - 注意: 固定しすぎると、付けたい動きまで遅くなる。カメラの固定は最後の手段。先に、動きに合ったモデルを選ぶ
   - 資料との関係: 手元で `very slowly` が動きを消した件（01 §2 の9）と同じ注意
3. 1カット1動作に分ける
   - 10秒に「走る → 爆発 → また走る」のように詰めると、精度も再現性も落ちる。例: カップを持ち上げる → 飲む → 表情が変わる → 微笑む、を1本に入れると所々おかしくなった
   - 動作ごとに1本ずつ生成し、編集でつなぐのがいちばん確実
   - Kling 3.0 のマルチショットは便利だが、3カットのうち真ん中だけ崩れたときに、そこだけ直すのが大変。基本は1カット1動作
   - 資料との関係: 01 §2 の2（1ショットに動作1つ）と同じ。09 の「30秒を1回で作ると人物が揃う」とは引き換えの関係にある。人物の一貫性を優先するなら1回で、直しやすさを優先するなら分けて作る
4. 禁止の指示で、勝手に付いた派手さを消す
   - 指定していない所は、AI が勝手に派手にする。例: 途中で左上から不自然な光が当たる → 「左上から光を当てない」で直った。花火の場面で歯を見せて笑いすぎる → 「歯を見せて笑わない」で直った
   - 資料との関係（食い違いあり）: 01 §2 の5 では「否定形で書かない」としている。Google の Veo 公式ガイドは「ないもの」でなく「あるもの」で書くよう勧め、Seedance 2.5 の解説は否定の制約を末尾にまとめると効くとしている。ここでは、(1) まず肯定の言い方（`closed-mouth smile`、`the lighting stays constant from camera right`）を試す、(2) 効かなければネガティブ欄か末尾の制約に名詞や短い禁止文で入れる、の順にする。どちらが効くかは 07 の U3 で確かめる
5. 意図 → 構図 → 質感 → 動き の順に決める（LLM との壁打ち）
   - 意図・構図・質感を ChatGPT などと壁打ちして決め、元になる画像を作る。そのあとで動き（何をどう動かすか、どのモデルか、何秒か）を決めて動画のプロンプトを作る
   - 画像を作るモデルが別なら、そのモデル名をはっきり伝えてプロンプトを作らせると精度が上がる
   - 元になる画像の一部だけ直したいときは、Nano Banana Pro に画像を読み込ませ、全体は変えずに一部だけ作り直す。全体を変えたいときは作り直す
   - 資料との関係: 09 の5つの工程、04 の流れ（音 → 画像 → 動画）と同じ方向

## 7. 手元の規則との関係

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
