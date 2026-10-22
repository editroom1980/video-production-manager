# プロンプトの基本（全モデル共通）

## 1. 基本構造

各社のガイドは並び順こそ少しずつ違いますが、要素はほぼ共通です。迷ったらこの順で書きます。

```
[カメラ/ショット] + [被写体] + [動作] + [場所・時間・天候] + [照明・色] + [スタイル] + [音]
```

| 要素 | 書くこと | 例 |
|---|---|---|
| ショット・カメラ | 画角、アングル、カメラの動き（1ショットに1つ） | `Slow dolly-in, medium close-up, eye level` |
| 被写体 | 誰／何か。見た目の特徴を2〜3個 | `an elderly craftsman in an indigo apron` |
| 動作 | 現在形の動詞を1つ。必要なら拍（ビート）で分ける | `he lifts the bowl, turns it once, smiles` |
| 場所・時間 | 屋内外、時間帯、季節、天候 | `a wooden workshop at dusk, light rain outside` |
| 照明・色 | 光源と光の質。色は3〜5色で指定 | `warm tungsten key light, soft window fill; palette: amber, indigo, cream` |
| スタイル | 質感・時代・フォーマット | `documentary, 35mm film grain, natural skin tones` |
| 音 | 環境音・効果音・台詞を別の文で書く | `Ambient: rain on the roof. He says: "This one took three days."` |

## 2. 書き方の原則

1. **単語の羅列ではなく文章で書く。** キーワードを並べると、要素がバラバラに描画されやすくなります（Seedance／Kling のガイド）。
2. **1ショットに、カメラの動き1つと被写体の動作1つ。** 複雑にすると破綻しやすくなります（Sora 2／Seedance）。
3. **目に見える具体的な言葉を使う。** 「速く動く」ではなく「自転車を3回漕いでブレーキをかける」のように書きます。
4. **感情は形容詞でなく体の動きで表す。** 「悲しい」ではなく「肩が落ちる」「視線が下がる」と書きます。
5. **否定形で書かない。** "no people" と書くと、かえって人が出ることがあります。除外したいものは、ネガティブプロンプト欄があればそこに名詞で書きます（例: `people, text, watermark`）。欄がなければ、末尾に制約としてまとめます（例: `Keep it subtitle-free, without logos or watermarks.`）。
6. **画像から動画を作るとき（I2V）は、見た目を書き直さない。** 画像が被写体・構図・色を決めるので、プロンプトには「そこから何がどう動くか」だけを書きます（Runway／Sora 2／Kling）。
7. **長さは 60〜150 語が目安。** 短いと意外な結果が出やすく、長いと制御しやすい反面、指示が衝突しやすくなります。
8. **変更は1回につき1か所。** 惜しい結果が出たら、それを参照にして差分だけ指示します。うまくいかないショットは、カメラを止める、動作を減らす、背景を整理する、の順で単純にしてから要素を足し直します。
9. **短い尺のほうが指示に従いやすい。** 8秒1本より4秒2本をつなぐほうが良い結果になることもあります（Sora 2 ガイド）。
10. **速い動きは崩れやすい。** ゆっくりした連続した動きのほうが安定します。全力疾走、大きなジャンプ、激しいアクションは失敗しやすくなります。

## 3. カメラ語彙（日英対訳）

### ショットサイズ
| 日本語 | 英語プロンプト |
|---|---|
| 超クローズアップ | extreme close-up (ECU) |
| クローズアップ | close-up (CU) |
| バストショット | medium close-up (MCU) |
| ミディアムショット（腰上） | medium shot (MS) |
| フルショット（全身） | full shot / long shot |
| 引きの画・状況説明 | wide shot / establishing shot |
| 超ロング | extreme wide shot |
| 肩越し | over-the-shoulder (OTS) |
| 主観 | point-of-view (POV) |
| マクロ | macro close-up |

### アングル
| 日本語 | 英語 |
|---|---|
| 目線の高さ | eye level |
| あおり | low angle |
| 俯瞰 | high angle |
| 真上から | bird's-eye view / top-down |
| 地面すれすれ | worm's-eye view |
| 斜め傾け | Dutch angle / canted angle |

### カメラワーク
| 日本語 | 英語 | メモ |
|---|---|---|
| フィックス | static shot / locked-off | 失敗が少ない。迷ったらこれ |
| パン（左右に振る） | pan left / pan right | |
| ティルト（上下に振る） | tilt up / tilt down | |
| ドリーイン／アウト | dolly in / dolly out (push in / pull out) | ズームとは違い、遠近感が変わる |
| トラック（横移動） | truck left / truck right | |
| ペデスタル（上下移動） | pedestal up / down | |
| ズーム | zoom in / zoom out | |
| クレーン | crane up / crane down, crane reveal | |
| 空撮 | aerial drone shot | |
| 追従 | tracking shot, camera follows from behind | |
| 回り込み | orbit / arc shot | |
| 手持ち | handheld | ドキュメンタリー感が出る |
| ウィップパン | whip pan | つなぎに使える |
| めまいショット | dolly zoom / vertigo effect | |
| フォーカス送り | rack focus | |

### レンズ・光学
`wide-angle lens`、`telephoto`、`shallow depth of field`（背景ボケ）、`deep focus`、`anamorphic lens flare`、`fisheye`、`85mm portrait lens`、`tilt-shift miniature`

### 編集用語（複数ショット時）
`match cut`、`jump cut`、`montage`、`cut to`、`shot-reverse-shot`、`cross-dissolve`、`split diopter`

## 4. 照明・色・質感

- 時間帯: `golden hour`、`blue hour`、`midday harsh sun`、`overcast soft light`、`night, sodium street lights`
- 照明: `soft key light`、`rim light`、`backlit`、`practical lights`、`neon glow`、`volumetric light through fog`、`chiaroscuro`
- 質感: `35mm film grain`、`16mm documentary`、`VHS`、`clean digital, 4K`、`shot on ARRI Alexa`（効き目はモデルによる）
- スタイル: `photorealistic`、`cinematic`、`documentary`、`Japanese anime style`、`stop-motion claymation`、`watercolor`、`1990s TV commercial`
- 色: パレットを3〜5色で指定すると、ショット間で色が揃いやすくなります（Sora 2 ガイド）。例: `palette: teal, warm orange, off-white`

## 5. 音声（ネイティブ音声生成があるモデル）

- 音は映像の説明とは**別の文**で書きます。
- 台詞は話者と一緒に書きます: `The detective says: "Your story has holes."`
- 複数人の場合は、話者のラベルを最後まで統一し、代名詞や言い換えは使いません。動作を台詞より先に書きます（Kling 3.0）。
- 日本語の台詞は `says in Japanese: "…"` のように言語を明記すると安定します。
- 尺に対して台詞を詰め込みすぎないこと。4秒なら短い1〜2往復までです。
- BGM・効果音・環境音は分けて書きます: `Ambient: festival crowd murmur. SFX: taiko drum hit on the cut. Music: none.`

## 6. 一貫性（キャラクター・商品）

- 被写体を最初に定義し、全ショットで**同じ表現**を使い回します（「赤い法被の青年」と決めたら、途中で「若い男性」と言い換えない）。
- 参照画像はラベルを付け、何を参照させるかを明示します（例: `@Image1 の人物の顔と衣装`）。ラベルがないと、色や背景まで真似されることがあります。
- 人物の参照には、顔のアップと全身の2枚を組み合わせるのが有効です（Seedance ガイド）。
- 実在の著名人の画像は拒否されることが多いです。出演者を使う場合は、本人の許諾と各サービスの規約を確認してください。

## 出典
- Google Cloud「Veo / Gemini Omni Flash prompt guide」 https://docs.cloud.google.com/vertex-ai/generative-ai/docs/video/video-gen-prompt-guide
- OpenAI Cookbook「Sora 2 Prompting Guide」 https://developers.openai.com/cookbook/examples/sora/sora2_prompting_guide
- fal「Kling 3.0 Prompting Guide」 https://blog.fal.ai/kling-3-0-prompting-guide/
- Runway「Seedance 2.0 Prompt Guide」 https://runway.com/resources/seedance-2-0-prompt-guide
- Krea「Runway prompt gallery」 https://www.krea.ai/models/runway/prompt-gallery
- Runware「Runway Gen-4.5: Directing motion」 https://runware.ai/docs/models/runway-gen-4-5/guides/directing-motion
