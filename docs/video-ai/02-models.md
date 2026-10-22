# モデル別チートシート

> 2026-10 時点の情報です。仕様の確度を次の印で示します。
> ✅ 公式ドキュメントで確認済み / ⚠️ 第三者の記事による（要確認）

## 早見表

| モデル | 強み | 尺 | 音声 | 主な入力 | 向いている用途 |
|---|---|---|---|---|---|
| Veo 3.1 / Gemini Omni Flash (Google) | 映画的な画、プロンプトへの忠実さ、価格（Omni Flash） | ⚠️ 〜8秒程度、延長あり | あり | テキスト、最初の1枚、最初と最後の1枚、参照画像、延長、編集 ✅ | 情景カット、CMのイメージ映像 |
| Sora 2 / Sora 2 Pro (OpenAI) | 物理表現、台詞つきの芝居、キャラクター機能 | ✅ 4/8/12/16/20秒、延長で最長120秒 | あり | テキスト、`input_reference` 画像、キャラクター ✅ | ドラマ・再現VTR、インタビュー風 |
| Kling 3.0 (Kuaishou) | 動きとカメラワーク、最大6ショットのマルチショット、多言語の台詞 | ✅ 最大15秒 | あり | テキスト、画像、要素（エレメント）参照 | アクション、ダンス、スポーツ風 |
| Runway Gen-4.5 | 画像から動画（I2V）でのカメラワーク、編集ツールとの連携 | ⚠️ 2〜10秒 | ⚠️ | テキスト、開始画像 | 素材写真を動かす、B-roll |
| Seedance 2.0 / 2.5 (ByteDance) | 参照素材（画像・動画・音）の組み合わせ、マルチショット、動画の編集 | ✅ 2.0: 5〜15秒 / 2.5: 最大30秒 | あり（同時生成） | `@Image` `@Video` `@Audio` の参照 | 既存素材の差し替え・編集、CM |
| Wan 2.7 (Alibaba, オープン) | Apache 2.0 のオープンウェイト、ローカル実行、最初と最後のフレーム指定 | ⚠️ 最大15秒・1080p | ⚠️ あり | テキスト、画像、最初と最後のフレーム | 社内GPUでの量産、検証 |

順位はリーダーボード（Artificial Analysis Video Arena など）で頻繁に入れ替わります。2026年には Gemini Omni Flash と Seedance 2.0 がそれぞれ首位と紹介されています ⚠️。

---

## Google Veo 3.1 / Gemini Omni Flash

**プロンプトの要素（公式）✅**: 被写体、動作、場所と文脈、カメラアングル、カメラの動き、レンズと光学効果、ビジュアルスタイル（照明・トーン・画風・雰囲気）、時間の要素（スローモーション、タイムラプス）、映画用語（match cut、jump cut、montage）

- 全部の要素を毎回書く必要はありません。要素ごとに分けて考えます。
- **音声**: 音が欲しいときは明記し、映像とは別の文で書きます。台詞は `The seasoned detective says: Your story has holes.` の形式です ✅
- **ネガティブプロンプト**: "no" や "don't" は使いません。除外したい要素を名詞で並べます（例: `urban background, man-made structures, dark, stormy atmosphere`）✅
- 生成モード ✅: Text to video / First frame image to video / First and last frames to video / Generate from references / Extend / Edit
- 運用のコツ ⚠️: 試すときは Fast 版を使い、本番だけ高品質版で生成するとコストを抑えられます。
- 長さの目安 ⚠️: 100〜150語

```
Slow dolly-in, medium shot, eye level. An elderly potter in an indigo apron
shapes a tall vase on a spinning wheel, wet clay glistening under a single
warm tungsten lamp. A small wooden workshop at dusk; rain streaks the window
behind him. Documentary style, shallow depth of field, 35mm film grain,
palette of amber, indigo and cream.
Audio: soft rain on the roof, the hum of the wheel. He says quietly in
Japanese: "土は、急かすと割れるんです。"
```
ネガティブ: `text, subtitles, watermark, logo, extra fingers`

---

## OpenAI Sora 2 / Sora 2 Pro

**API パラメータ ✅**（プロンプト文ではなくリクエスト側で指定）
- `model`: `sora-2` / `sora-2-pro`
- `size`: sora-2 は `1280x720` / `720x1280`。pro はこれに加えて `1792x1024` / `1024x1792` / `1920x1080` / `1080x1920`
- `seconds`: `"4"`（既定）/ `"8"` / `"12"` / `"16"` / `"20"`
- `input_reference`: 最初のフレームになる画像（JPEG/PNG/WebP、`size` と同じ解像度にする）
- `characters`: Characters API の ID を最大2つ（720p〜1080p、2〜4秒の MP4 をアップロードして作成）
- 延長: 1回あたり最大20秒、最大6回で合計120秒

**書き方 ✅**
- 絵コンテを描くように書きます。構図、被写界深度、動作のビート、照明、パレット。
- スタイル（時代・フォーマット）を最初に決めると、ほかの要素がそれに沿います。
- パレットは3〜5色で指定します。
- 台詞は映像の説明とは分けた `Dialogue:` ブロックに書き、話者のラベルを統一します。
- 公式ガイドの例: `In a 90s documentary-style interview, an old Swedish man sits in a study and says, "I still remember when I was young."`

```
Style: 1990s Japanese TV documentary, 4:3 look, slight tape softness.
A rural train station platform in early spring, cherry petals drifting.
Camera: static, medium wide, eye level.
Beats: (1) a station master in a navy cap checks his pocket watch,
(2) looks down the track, (3) raises a white-gloved hand as the train arrives.
Lighting: overcast soft daylight. Palette: navy, pale pink, concrete grey.
Dialogue:
- Station master (calm, warm): "定刻どおり。今日もいい日だ。"
```

> 注意: 取得した Cookbook ページには「アーカイブ済み」の表示がありました。実装の前に最新の API リファレンスを確認してください。

---

## Kling 3.0

- **シーンの演出指示として書く。** 物の一覧ではなく、カメラが何をどう撮るかを書きます ✅（fal ガイド）
- **マルチショット**: 1回の出力で最大6ショットです。`Shot 1 (Duration: 3 seconds): …` のようにラベルを付け、ショットごとに画角・被写体・動きを書きます。
- **カメラと被写体の関係を書く**: tracks / follows / pans / freezes / holds a medium shot のように書きます。長回しでは、カメラの立ち位置を決めておくと破綻が減ります。
- **指示がないと固定画角になりがち**です ⚠️。カメラワークは必ず書きます。
- **台詞**: 話者ラベルを統一し、動作を台詞より先に書きます。台詞ごとに声のトーンを書き添え、話者が替わるところは明示します。多言語の切り替えにも対応しています。
- 尺: 最大15秒。長尺では、時間とともに何がどう進むかを書きます。

```
Shot 1 (3s): Wide establishing shot, slow crane down. A mountain shrine
festival at night, hundreds of paper lanterns glowing orange.
Shot 2 (4s): Tracking shot, camera follows from behind. [Taro], a young man
in a red happi coat, carries a portable shrine with five others, shouting
in rhythm.
Shot 3 (3s): Close-up, handheld. [Taro] wipes sweat from his brow and grins
at the camera.
[Taro] (breathless, joyful, Japanese): "まだまだいけるぞ!"
Audio: taiko drums, crowd cheers, wooden creak of the shrine poles.
```

---

## Runway Gen-4.5

- **「何があるか」より「どう動くか」を書く。** 動きを中心に書き、映画用語（dolly-in など）を使います ⚠️
- **開始画像があるときは、見た目を書き直さない。** プロンプトに書くのは、次の数秒でフレームがどう変わるかだけです ⚠️
- 書く順: カメラの動き → 被写体の動き → 照明・雰囲気・フィルムの質感 を1つずつ足します。
- 尺 ⚠️: 2〜10秒。アスペクト比は 16:9 / 9:16 など。長いものはクリップをつないで作ります。
- 比較するときはシードを固定します。否定形の指示は避けます ⚠️

```
(開始画像: 姫路城の静止画)
Slow push-in toward the main keep. Clouds drift quickly behind the castle
as the light shifts from midday to warm golden hour. A flock of birds
crosses the frame from left to right. Subtle cinematic film grain.
```

---

## Seedance 2.0 / 2.5

- **8つの要素をつながった文章で書く** ✅: 被写体、動作の詳細、場面、照明と色、カメラの動き、映像スタイル、画質、制約
- **2層構造** ✅: 外側に `Shot 1:` などのショットのラベル、内側に散文。ショット内は カメラ → 動作と表情 → 空間の変化 → 音 の順に書きます。
- **1ショットにカメラの動き1つ。** 秒数の厳密な指定は不安定なので、展開から尺を決めさせます ✅
- **参照タグ** ✅: `@Image 1` `@Video 1` `@Audio 1` を付け、それぞれが何を決めるのか（顔、衣装、カメラワーク、BGM）を明示します。被写体は、安定した特徴を2〜3個で定義してからラベルで呼びます。素材は4〜5個までにします。
- **編集** ✅: `Remove the mug from the table in @Video 1, keeping the rest of the video content unchanged.` のように、元の動画を直接指して書きます。
- **音の記号** ✅: `{台詞}`、`(音楽)`、`<効果音>`、`「字幕」`。英語・中国語以外の台詞には言語名を付けます。
- **上限** ✅: 2.0 は 5〜15秒、画像9・動画3・音声3まで。参照する動画と音声の合計は15秒まで。2.5 は最大30秒、参照は50個まで、タイムスタンプ指定での編集と延長に対応。出力は 480p / 720p / 1080p（Fast と Mini は 720p まで）、アスペクト比は 21:9〜9:16。
- 制約は最後に肯定形でまとめます: `Keep it subtitle-free, do not generate a logo or watermark.`

```
@Image 1 is the main character: a woman in her 30s with short black hair
and a mustard-yellow cardigan. @Audio 1 is the background music.
Shot 1: Close on her hands. She pours hot water over coffee in a glass
dripper; steam curls upward. <gentle pouring sound>
Shot 2: Slow pull-out to a medium shot. She lifts the cup, closes her eyes
and her shoulders relax. She says in Japanese {やっと、朝が来た。}
Soft morning window light, warm beige and white palette, clean commercial
look, 1080p. Keep it subtitle-free, do not generate a logo or watermark.
```

---

## Wan 2.7（オープンソース）

- ⚠️ Apache 2.0 のオープンウェイト。最大15秒・1080p、音声の同時生成、最初と最後のフレーム指定に対応すると紹介されています。
- ComfyUI などでローカル実行できるので、外部サービスに素材を出せない案件（自治体、未公開の商品）に向いています。
- プロンプトの書き方は基本構造（01）に沿えば十分です。中国語・英語のどちらでも書けます。

---

## 出典
- Google Cloud Veo prompt guide: https://docs.cloud.google.com/vertex-ai/generative-ai/docs/video/video-gen-prompt-guide
- OpenAI Sora 2 Prompting Guide: https://developers.openai.com/cookbook/examples/sora/sora2_prompting_guide
- fal Kling 3.0 Prompting Guide: https://blog.fal.ai/kling-3-0-prompting-guide/
- Kling camera control: https://kling.ai/blog/kling-ai-camera-control-video-guide
- Magic Hour Kling 3.0 Reference Guide: https://magichour.ai/blog/kling-30-reference-guide
- imagine.art Kling 3.0 Prompt Guide: https://www.imagine.art/blogs/kling-3-0-prompt-guide
- Runway Seedance 2.0 Prompt Guide: https://runway.com/resources/seedance-2-0-prompt-guide
- fal Seedance 2.0: https://fal.ai/learn/tools/how-to-use-seedance-2-0
- Luma Seedance 2.0 Complete Guide: https://lumalabs.ai/learning-center/articles/seedance-2.0-complete-guide
- Krea Runway prompt gallery: https://www.krea.ai/models/runway/prompt-gallery
- Runware Gen-4.5 directing motion: https://runware.ai/docs/models/runway-gen-4-5/guides/directing-motion
- Scenario Gen4.5 essentials: https://help.scenario.com/articles/5854126955-runway-gen4-5-the-essentials
- frameo Veo 3 guide: https://frameo.ai/blog/google-veo-3-prompt-guide-best-practices/
- piapi Veo 3.1 guide (ja): https://piapi.ai/ja/blogs/veo-3-1-api-pricing-prompting-guide-2026
- VideoGen best models: https://videogen.io/best-ai-video-models
- Storista best AI video generators: https://storista.io/blog/best-ai-video-generators
- Atlas Cloud comparison: https://atlascloud.ai/blog/guides/best-ai-video-generation-models-2026
