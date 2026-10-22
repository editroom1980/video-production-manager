# プロンプトテンプレート集

`{波括弧}` を差し替えて使います。英語で書いたほうが安定するモデルが多いので、本文は英語、台詞とメモは日本語にしています。
モデル別の書き方（時間の区切り、参照の書き方、パラメータ）は [02-models.md](02-models.md) を見てください。推奨モデルは Higgsfield のモデルIDで書いています。

共通の約束:
- カットの数は内容で決めます。テンプレートのショット数は例です。足しても減らしてもかまいません。
- 曲（BGM）は生成させません。`No music` と書き、曲は支給か使用許諾のある音源を編集で入れます。効果音と環境音は生成させてかまいません。
- 実在の建物・ロゴ・商品・文字は、実物の写真を参照に渡し、出た絵を写真と照合します（[01 §8](01-prompt-fundamentals.md)）。

---

## T1. 地域情報番組の情景カット（オープニング・つなぎ）

推奨: `veo3_1_lite`（試作）→ `kling3_0` か `seedance_2_5`、16:9

```
{Aerial drone shot | Slow crane up}, wide establishing shot. {季節} morning
over {地名の情景: e.g. a mountain valley town with terraced rice fields
and a winding river}. {天候: thin mist rising from the water}. Natural,
documentary look, soft {golden hour | overcast} light, palette of {3色}.
Gentle, unhurried pacing.
Audio: {ambient: birdsong, distant river}. No music.
```
実在の場所を写す場合は、その場所の写真を start_image か参照に渡し、地形や建物が写真と合っているか照合します。

## T2. 人物紹介・職人の手元（文化番組）

推奨: `seedance_2_5` / `kling3_0`、16:9。本人の映像の代わりに使う場合は、番組の中でAI生成と明示します。

```
Macro close-up, static camera. The hands of {職業: a traditional
indigo dyer} {動作: lift a length of cotton cloth out of a dark vat}; the
fabric slowly oxidizes from green to deep blue. {場所: a dim wooden
workshop}, a single shaft of window light from the left. Documentary
style, shallow depth of field, 35mm film grain.
Audio: dripping water, cloth rustling. No music.
```

## T3. CM（時間で区切る形）

推奨: `seedance_2_5`（参照あり）/ `minimax_h3`、16:9 または 9:16。ショットの数は内容で決めます（15秒に十数カットでもかまいません）。1回で入りきらなければ生成を分けます。

```
GLOBAL STYLE: {bright, clean commercial look}, natural skin texture. No music, no subtitles.
SCENE: {一行のあらすじ}.
CHARACTERS: {人物} from the reference, identical features in every shot, zero drift.
PRODUCT: inherited exactly from the reference: {形・色・素材・ラベルの文字}. Lettering stays sharp and correctly spelled whenever visible.
LOCATION: {場所}.
FORMAT: {N} segments, hard cuts only.
0.0s to {t1}s: {ショット1: 画角, カメラ, 動作}. HARD CUT.
{t1}s to {t2}s: {ショット2}. HARD CUT.
…
{tn-1}s to {tn}s: {締めのカット: T11 を参照}.
AUDIO: {効果音・環境音}. {台詞があれば時刻と口調つきで}. No BGM.
```

## T4. スポーツダイジェストのイメージカット

用途: オープニングや章の区切り。実際の試合映像の代わりにはしません。
推奨: `kling3_0`、16:9

```
Low angle, slow motion. An empty indoor {競技: volleyball} arena just
before a match, spotlights sweeping across the court, dust particles
floating in the beams. The camera slowly pushes in toward the net.
Dramatic, high-contrast lighting, palette of {チームカラー}.
Audio: a deep low boom, distant crowd anticipation. No music.
```
チームのロゴや会場の看板を写す場合は、支給データか写真を参照に渡して照合します。

## T5. 写真を動かす（I2V）

推奨: `veo3_1_lite`（試作）/ `kling3_0` / `minimax_h3`（start_image）。見た目は書かず、動きだけを書きます。出力の縦横比は写真の比に引っ張られるので、写真を先に目的の比に切っておきます（手元で確認）。

```
Subtle parallax push-in. {動く要素: the clouds drift slowly to the right,
the flags on the stall gently flutter, steam rises from the food stall}.
The people stay mostly still. Camera movement stays slow and smooth.
```
`very slowly` は動きが消えることがあるので使いません（手元で確認）。

## T6. 縦型ショート（9:16、SNS告知）

推奨: `kling3_0` / `seedance_2_5`、9:16

```
Vertical 9:16 framing, subject centered. Handheld, energetic.
Beat 1: {イベントの見どころ1}.
Beat 2: quick whip pan to {見どころ2}.
Beat 3: {人物} turns to camera and says in Japanese: "{告知の一言}"
Vibrant, saturated colors, smartphone vlog look.
Audio: crowd ambience, a whoosh on the whip pan. No music, no subtitles.
```
whip pan が効くかは未確認です（07）。台詞を作り込みたい場合は T10 の手順にします。

## T7. 再現VTR（ナレーション用の芝居）

推奨: `seedance_2_5` / `kling3_0`、16:9

```
Style: {時代: 1970s} Japanese home drama, warm faded film look.
A small tatami living room in the evening, a low table with tea cups.
Camera: static medium shot, eye level.
Beats: (1) {人物A: a mother in her 40s in an apron} sets down a letter,
(2) {人物B: her teenage son} picks it up and reads it silently,
(3) he looks up, eyes wet.
Lighting: a single warm ceiling lamp. Palette: amber, olive, faded cream.
Audio: a clock ticking, paper rustling. No music.
```
ナレーションは ElevenLabs v4 で別に作ります（01 §6）。

## T8. つなぎ・トランジション素材

推奨: `veo3_1_lite` / `kling3_0`（start_image と end_image を渡す）

```
The camera moves smoothly from the first frame to the last frame:
{動きの道筋: a slow push-in through falling cherry petals that ends on the
pink festival lantern}. Macro, shallow depth of field, soft pastel light.
```
最初と最後の画像を渡すときは、2枚の説明ではなく、間の動きの道筋を書きます（MiniMax H3 公式ガイド）。

## T9. 商品の見せ場（開始と終了の画像で作る）

推奨: `minimax_h3` / `seedance_2_5` / `kling3_0`（start_image ＋ end_image）

手順（Higgsfield 公式の CM 解説の流れ）:
1. 商品だけの画像を作る、または撮る（台座の上、照明を決める）。実物の写真が基本です。
2. 場面の画像に商品を置いた「開始の画像」と「終了の画像」を作る。商品は手前、背景は別の照明にして、商品の見え方を変えない。1回の編集で変えるのは1か所だけにし、変えない所を書く。
3. 2枚の間の動きを、1カットで生成する。

```
The camera holds the same angle and the same lens perspective. {動作: a hand
enters from the right, lifts the bottle from the pedestal and removes the
cap}. The product keeps its exact shape, color, label and proportions in
every frame; the pedestal stays the same size, height and position.
Lighting on the product does not change. Audio: a soft glass click. No music.
```
出た絵は商品の写真と並べて照合し、1か所でも違えば使いません。

## T10. 会話シーン（台詞を1行ずつ音声にして渡す）

手元で試作して確かめた手順（RKJ VIDEO の手法）:
1. 台詞を1行ずつ `elevenlabs_v4` で作る。1行につき3テイク以上作り、耳で選ぶ。数と助数詞は仮名で書く。
2. 選んだ音声を、その行を話す人物と対応づけて、`seedance_2_5` の `audio_references` に渡す。
3. 音は伸縮しない。尺が合わなければ、原稿か絵の尺を直す。

```
<人物と音声の対応を参照の書き方で明記する: 例 "Audio 1 is the line spoken by
the woman; Audio 2 is the line spoken by the man.">
Medium two-shot, static. {場所}. The woman speaks first (Audio 1), then the
man answers (Audio 2). Their lips match the reference audio exactly. No other
lines are spoken. Audio: quiet room tone. No music, no subtitles.
```
Higgsfield で参照を指すときは `<<<uuid>>>` の書き方を使います（`@名前` では届きません）。

## T11. 締めのカット（CM の最後）

外部の作り手の手法から（06 に出典）:
- 最後に何で終わるかを決めて書く（商品で終わる／人物で終わる／どちらでもない）。
- 最後の動きと止め方を書く（例: `hold for one second, then hard cut to black`、`cut on the last frame, no fade`）。
- 商品で終わるなら、商品は手前でくっきり、人物は奥でぼかす構図が使いやすい。
- 価格や問い合わせ先などの文字を後で重ねるなら、その余白を空けておく。

```
Final shot, locked-off. {商品} sharp in the foreground, inherited exactly from
the reference; {人物} softly out of focus behind it. Empty space on the {left}
third of the frame for an end card. Hold for one second, then hard cut to black.
```

---

## 生成後のチェックリスト（納品前）

- [ ] 手指・顔・人数が崩れていないか（指は5本か、人数は合っているか）
- [ ] 実在の建物・ロゴ・商品・文字を、実物の写真と並べて照合したか。1か所でも違えば使わない
- [ ] ショットをまたいで、人物の顔・服・持ち物が変わっていないか
- [ ] 曲が入っていないか（入っていたら差し替えるか、生成をやり直す）
- [ ] 字幕が勝手に焼き込まれていないか
- [ ] 各サービスの商用利用条件・クレジット表記の要否を確認したか
- [ ] 解像度・フレームレートが本編と合っているか
- [ ] 生成に使ったプロンプト・モデルID・参照素材・テイク番号を記録したか
