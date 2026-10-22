# プロンプトテンプレート集

`{波括弧}` を差し替えて使います。英語で書いたほうが安定するモデルが多いので、本文は英語、台詞とメモは日本語にしています。
モデル別の調整（マルチショットの書き方、参照タグ、API パラメータ）は [02-models.md](02-models.md) を見てください。

---

## T1. 地域情報番組の情景カット（オープニング・つなぎ）

用途: しそうチャンネルなどの番組冒頭や、コーナー間の空舞台。
推奨: Veo 3.1 / Kling 3.0、16:9、5〜8秒

```
{Aerial drone shot | Slow crane up}, wide establishing shot. {季節} morning
over {地名の情景: e.g. a mountain valley town with terraced rice fields
and a winding river}. {天候: thin mist rising from the water}. Natural,
documentary look, soft {golden hour | overcast} light, palette of {3色}.
Gentle, unhurried pacing.
Audio: {ambient: birdsong, distant river}. No music.
```
ネガティブ: `text, subtitles, watermark, people close to camera`

## T2. 人物紹介・職人の手元（文化番組）

用途: 「いま、輝いてます。」のような人物ドキュメンタリーのイメージカット。
推奨: Sora 2 / Veo 3.1、16:9。**本人の映像の代わりに使う場合は、番組の中でAI生成と明示すること。**

```
Macro close-up, static camera. The hands of {職業: a traditional
indigo dyer} {動作: lift a length of cotton cloth out of a dark vat}; the
fabric slowly oxidizes from green to deep blue. {場所: a dim wooden
workshop}, a single shaft of window light. Documentary style, shallow
depth of field, 35mm film grain.
Audio: dripping water, cloth rustling.
```

## T3. CM・短編（15秒・3ショット）

用途: 職員募集CM、商品やサービスのCM。
推奨: Kling 3.0（マルチショット）/ Seedance 2.0（参照素材あり）、16:9 または 9:16

```
Shot 1: Wide shot, slow dolly-in. {場面1: a city hall lobby in morning
light, staff greeting residents}.
Shot 2: Medium shot, tracking. {主人公: a young staff member in a navy
cardigan} {動作: walks a senior resident to the counter, smiling}.
Shot 3: Close-up, static. {主人公} looks into the camera and says in
Japanese {"{キャッチコピー}"}.
Bright, clean commercial look, warm natural light, palette of {ブランド色}.
(upbeat acoustic guitar music)
Keep it subtitle-free, do not generate a logo or watermark.
```
メモ: テロップとロゴは後の編集で入れます。生成段階で文字を入れると崩れやすいためです。

## T4. スポーツダイジェストのイメージカット

用途: シーズンダイジェストのオープニングや、章の区切り。**実際の試合映像の代わりにはしません。**
推奨: Kling 3.0（動きに強い）、16:9、5秒

```
Low angle, slow motion, 120fps look. An empty indoor {競技: volleyball}
arena just before a match, spotlights sweeping across the court, dust
particles floating in the beams. The camera slowly pushes in toward the
net. Dramatic, high-contrast lighting, palette of {チームカラー}.
Audio: deep cinematic boom, distant crowd anticipation.
```

## T5. 写真を動かす（I2V）

用途: 過去の記録写真、提供写真、空撮の静止画に動きをつける。
推奨: Runway Gen-4.5 / Veo 3.1（最初のフレーム指定）/ Kling 3.0
**見た目は書かず、動きだけを書きます。**

```
Subtle parallax push-in. {動く要素: the clouds drift slowly to the right,
the flags on the stall gently flutter, steam rises from the food stall}.
The people stay mostly still. Camera movement stays slow and smooth.
```

## T6. 縦型ショート（9:16、SNS告知）

推奨: Sora 2 (`720x1280`) / Kling 3.0、9:16、8〜12秒

```
Vertical 9:16 framing, subject centered. Handheld, energetic, quick
whip pan between beats.
Beat 1: {イベントの見どころ1}.
Beat 2: whip pan to {見どころ2}.
Beat 3: {人物} turns to camera and says in Japanese: "{告知の一言}"
Vibrant, saturated colors, smartphone vlog look.
Audio: crowd ambience, a whoosh on each whip pan.
```

## T7. 再現VTR（ナレーション用の芝居）

推奨: Sora 2（芝居と台詞）、16:9

```
Style: {時代: 1970s} Japanese home drama, warm faded film look.
A small tatami living room in the evening, a low table with tea cups.
Camera: static medium shot, eye level.
Beats: (1) {人物A: a mother in her 40s in an apron} sets down a letter,
(2) {人物B: her teenage son} picks it up and reads it silently,
(3) he looks up, eyes wet.
Lighting: a single warm ceiling lamp. Palette: amber, olive, faded cream.
Dialogue:
- Mother (soft, hesitant): "{台詞}"
```

## T8. つなぎ・トランジション素材

```
Seamless {match cut | morph transition} from {A: a cherry blossom petal
falling} to {B: a pink festival lantern swaying}, macro close-up,
shallow depth of field, soft pastel light. 3 seconds.
```

---

## 生成後のチェックリスト（納品前）

- [ ] 手指・顔・文字・ロゴが崩れていないか
- [ ] 実在の人物や施設と誤認されないか。必要なら「イメージ映像」「AI生成」の表記を入れる
- [ ] 各サービスの商用利用条件・クレジット表記の要否を確認したか
- [ ] 解像度・フレームレートが本編（例: 1920x1080 / 29.97p）と合っているか。合っていなければアップスケール・変換の工程を入れる
- [ ] 生成に使ったプロンプト・シード・モデル名を記録したか（再生成や修正の対応に必要）
