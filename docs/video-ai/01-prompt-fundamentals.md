# プロンプトの基本（全モデル共通）

根拠の書き方: 確認済み（公式）／第三者の記事／未確認／手元で確認（生成して確かめた）。モデル別の根拠は 02 にあります。

## 1. 基本構造

各社のガイドは並び順こそ少しずつ違いますが、要素はほぼ共通です。迷ったらこの順で書きます。

```
[カメラ/ショット] + [被写体] + [動作] + [場所・時間・天候] + [照明・色] + [スタイル] + [音]
```

| 要素 | 書くこと | 例 |
|---|---|---|
| ショット・カメラ | 画角、アングル、カメラの動き（1ショットに1つ） | `Slow dolly-in, medium close-up, eye level` |
| 被写体 | 誰／何か。見た目の特徴を2〜3個 | `an elderly craftsman in an indigo apron` |
| 動作 | 現在形の動詞を1つ。必要なら拍（ビート）や時間帯で分ける | `he lifts the bowl, turns it once, smiles` |
| 場所・時間 | 屋内外、時間帯、季節、天候 | `a wooden workshop at dusk, light rain outside` |
| 照明・色 | 光源と光の質。色は3〜5色で指定 | `warm tungsten key light, soft window fill; palette: amber, indigo, cream` |
| スタイル | 質感・時代・フォーマット | `documentary, 35mm film grain, natural skin tones` |
| 音 | 環境音・効果音・台詞を別の文で書く | `Ambient: rain on the roof. SFX: the wheel hums.` |

Google の Veo 3.1 ガイドは「カメラ → 被写体 → 動作 → 場所 → スタイル」の順を勧めています（確認済み（公式）、2025-10-16）。Seedance 2.5 の解説でも「ショットを最初に書く」が要点として挙がっています（第三者の記事、Runware、2026-08-07）。

## 2. 書き方の原則

1. 単語の羅列ではなく文章で書く。キーワードを並べると、要素がバラバラに描画されやすくなります（Seedance／Kling のガイド）。
2. カメラの動きと被写体の動きは、別の節に分けて書く（Seedance 2.5・MiniMax H3 の解説）。1ショットの中では、カメラの動き1つと動作1つにすると崩れにくくなります。
3. 目に見える具体的な言葉を使う。「速く動く」ではなく「自転車を3回漕いでブレーキをかける」のように書きます。
4. 感情は形容詞でなく体の動きで表す。「悲しい」ではなく「肩が落ちる」「視線が下がる」と書きます。
5. 否定形で書かない。除外したいものは、ネガティブプロンプト欄があればそこに名詞で書きます。欄がなければ、末尾に制約としてまとめます（Seedance 2.5 は末尾の制約がいちばん効くという解説があります。第三者の記事）。
6. 画像から動画を作るとき（I2V）は、見た目を書き直さない。画像が被写体・構図・色を決めるので、プロンプトには「そこから何がどう動くか」を書きます。
7. 長さは、単純なものなら 60〜150 語、時間帯で区切る長い尺なら 350〜500 語が目安です（後者は MiniMax H3 公式ガイドの参照生成の目安）。
8. 変更は1回につき1か所。惜しい結果が出たら、それを参照にして差分だけ指示します。
9. 速い動きは崩れやすい。ゆっくりした連続した動きのほうが安定します。ただし `very slowly` は動きそのものを消すことがあります（手元で確認：5秒まるごと止まった）。`slow` か、動きの量を具体的に書くほうが安全です。
10. 時間で区切る書き方（`[0-3s] …`）は、Veo 3.1・Seedance 2.5・MiniMax H3 の公式・解説がそろって勧めています。区切りは途切れなく続け、1区切りに入れる出来事は1つか2つにします。
11. 各プロンプトは単独で読んで分かるように書く。生成は1本ずつ独立して行われ、モデルは前後のショットを知りません。場所・人物・トーン・画風を毎回書き直します（PJ Accetturo の手法。08 を参照）。
12. 中身のない言葉（`cinematic`、`epic`、`masterpiece`、`dynamic camera`、`4K`）は使わない。代わりに、具体的なレンズ・光・動きを書きます（smixs/visual-skills、jnMetaCode/ai-shortfilm-prompts）。

## 2.5 書く前に決めること（演出）

プロンプトより先に、場面として成り立っているかを決めます。smixs/visual-skills（Serge Shima、CC BY 4.0）の dramaturgy.md・universal-rules.md の要点です。詳しくは `.claude/skills/visual-video/references/` を読んでください。

- 場面の式: 欲しいもの、障害、位置関係、視線、リズムを1文ずつ決める。
- ショットの仕事: どのショットも、感情を変える／行動を進める／圧力を上げる、のどれかをする。どれもしないショットは切る。
- 細部の決まり: 1ショットに、環境からの圧力1つ、体の小さな動き1つ、音か絵の手がかり1つ。
- 編集の階段: ショットをだんだん短くし、一度止めてから山場に入る。止めのほうが速さより効く。
- 最後の絵: 締めのカットで何が見えているかを先に決める。
- 物語が先: 作り手の多くが「プロンプトの書き方より物語が効く」と述べています（08）。

## 3. カットの数

カットの数は秒数で決め打ちしません。作品の内容で決まります（15秒に十数カットもあります）。上限は設けません。

- 1回の生成に何カット入るかはモデルによって違います（02 を参照）。入りきらないときは、生成を分けて編集でつなぎます。
- 1カットごとに新しい情報があるようにします。小さな変化しかないなら、カットではなくカメラの動きで見せます（MiniMax H3 公式ガイド）。

## 4. カメラ語彙（日英対訳）

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
| フィックス | static shot / locked-off | 失敗が少ない |
| パン | pan left / pan right | |
| ティルト | tilt up / tilt down | |
| ドリーイン／アウト | dolly in / dolly out (push in / pull out) | ズームとは違い、遠近感が変わる |
| トラック（横移動） | truck left / truck right | |
| ペデスタル（上下移動） | pedestal up / down | |
| ズーム | zoom in / zoom out | |
| クレーン | crane up / crane down, crane reveal | |
| 空撮 | aerial drone shot | |
| 追従 | tracking shot, camera follows from behind | |
| 回り込み | orbit / arc shot | |
| 手持ち | handheld | ドキュメンタリー感が出る |
| ウィップパン | whip pan | 効くかは未確認（07） |
| めまいショット | dolly zoom / vertigo effect | 効くかは未確認（07） |
| フォーカス送り | rack focus | 効くかは未確認（07） |

動きの大きさと速さは、`with small amplitude` / `with large amplitude`、`at slow speed` / `at fast speed` のように書き添えます（MiniMax H3 公式ガイド）。

### レンズ・光学
`wide-angle lens`、`telephoto`、`shallow depth of field`（背景ボケ）、`deep focus`、`anamorphic lens flare`、`fisheye`、`85mm portrait lens`、`tilt-shift miniature`。画角を度数で書き、`no lens drift mid-segment` と添えるやり方もあります（Higgsfield の Seedance 2.5 ガイド）。

### 編集用語（複数ショット時）
`match cut`、`jump cut`、`montage`、`cut to`、`HARD CUT`、`shot-reverse-shot`、`cross-dissolve`

## 5. 照明・色・質感

- 時間帯: `golden hour`、`blue hour`、`midday harsh sun`、`overcast soft light`、`night, sodium street lights`
- 照明: `soft key light`、`rim light`、`backlit`、`practical lights`、`volumetric light through fog`。光源は1つに決めて方向と質を書き、「何ではないか」も添えると安定します（Higgsfield の Seedance 2.5 ガイド）。
- 質感: `35mm film grain`、`16mm documentary`、`VHS`、`clean digital`
- スタイル: `photorealistic`、`cinematic`、`documentary`、`Japanese anime style`、`stop-motion claymation`、`1990s TV commercial`
- 色: パレットを3〜5色で指定すると、ショット間で色が揃いやすくなります。

## 6. 音

### 効果音・環境音
動画のモデルが作れます。映像の説明とは別の文で書きます。書き方の例:
- Veo 3.1: `SFX: thunder cracks in the distance`、`Ambient noise: the quiet hum of a starship bridge`（確認済み（公式））
- Seedance 2.5: `Audio: …` の節にまとめ、`No BGM, only ambient and action sounds` のように混ぜ方まで書く（第三者の記事）
- MiniMax H3: `overall_soundscape`（環境音・物音）と `non_diegetic_music`（劇伴）を分けて書く（確認済み（公式））

### BGM（曲）
Higgsfield では作れません（手元で確認：sonilo_music の説明が「Game pipeline only.」）。支給の曲か、使用許諾のある音源を編集で入れます。生成時は `No music` / `No BGM` と書いて、動画のモデルに曲を付けさせないようにします。

### 日本語の台詞・ナレーション
生成してかまいません。手元の運用は次のとおりです。

- 良い道具で作る。いまの第一候補は ElevenLabs v4（Higgsfield では `elevenlabs_v4`）。
- 1句につき3テイク以上作り、耳で選ぶ。
- 数と助数詞は仮名で書く（「八分」が「ばふん」と読まれた。「はっぷん」と書くと直った）。Higgsfield の narration ワークフローも「数は文字で書く」としています。
- 音は伸縮させない。合わなければ原稿か絵の尺を直す。Higgsfield の narration ワークフローも、時間の伸縮を禁じ、文を書き直して合わせる方針です（確認済み（公式）、v1.1）。
- 会話シーンは、台詞を1行ずつ音声にして、Seedance 2.5 の `audio_references` で渡す（RKJ VIDEO の手法。手元で試作して確かめた）。

動画のモデルに台詞まで作らせる場合の書き方:
- 話者のラベルを最後まで統一し、代名詞や言い換えは使わない。動作を台詞より先に書く（Kling 3.0 の解説）。
- 言語を明記する。Kling 3.0 は日本語の台詞に対応（確認済み（公式））。MiniMax H3 は `<d>[Japanese] …</d>` の形で、台詞を訳さずそのまま書く（確認済み（公式））。
- 字幕を焼き込ませたくないときは `No subtitles` と書く（Seedance 2.5 の解説。第三者の記事）。

## 7. 一貫性（人物・商品・場所）

- 被写体を最初に定義し、全ショットで同じ表現を使い回します（「赤い法被の青年」と決めたら、途中で「若い男性」と言い換えない）。
- 参照画像には役割を付け、何を決めて何を無視させるかを書きます（例: 「Image1 は顔だけを決める。背景は無視」）。
- 人物の参照は、顔のアップと全身の組み合わせが有効です。Kling は正面の画像1枚＋別の角度1〜3枚を勧めています（確認済み（公式））。
- Higgsfield の参照要素は `<<<uuid>>>` の書き方で届き、`@名前` では届きません（手元で確認）。各社の `@Image1` などの書き方は、そのサービスの画面で使う場合の話です。
- 実在の著名人の画像は拒否されることが多いです。出演者を使う場合は、本人の許諾と各サービスの規約を確認してください。

## 8. 実在の建物・ロゴ・商品・文字

手元の規則（9b、2026-10-21 改訂）に合わせます。禁じているのは「生成すること」ではなく「間違えること」です。

- 実物の写真を参照に渡して生成し、出た絵を写真と並べて照合します。1つでも違えば使いません。
- ロゴや文字は崩れやすいので、仕上げで支給データを重ねるのが確実な道です。ただし、生成させること自体は禁止ではありません。
- 生成させるときは、文字の綴りをそのまま書き、`stays sharp and correctly spelled whenever visible` のように崩さない指示を添えます（Higgsfield の Seedance 2.5 ガイド）。MiniMax H3 は画面上の文字を英語の二重引用符で、原文のまま書く決まりです（確認済み（公式））。
- 編集で重ねる前提なら、締めのカットに文字を置く余白を空けておきます。

## 出典
- Google Cloud「The ultimate prompting guide for Veo 3.1」2025-10-16 https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-veo-3-1
- Google Cloud「Veo / Gemini Omni Flash prompt guide」 https://docs.cloud.google.com/vertex-ai/generative-ai/docs/video/video-gen-prompt-guide
- MiniMax「MiniMax-H3 prompt writing guide（base / ref）」2026-10-22 閲覧 https://huggingface.co/MiniMaxAI/MiniMax-H3
- Kling「VIDEO 3.0 Model User Guide」2026-02-06 https://kling.ai/quickstart/klingai-video-3-model-user-guide
- Kling「Element Library 3.0 User Guide」2026-02-05 https://kling.ai/quickstart/klingai-element-library-3-user-guide
- Higgsfield「Seedance 2.5: Complete Prompting Guide」2026-08-13 https://higgsfield.ai/blog/seedance-2-5-prompting-guide
- Runware「Seedance 2.5 Prompting」2026-08-07 https://runware.ai/docs/models/bytedance-seedance-2-5/guides/prompting
- Runway「Seedance 2.0 Prompt Guide」 https://runway.com/resources/seedance-2-0-prompt-guide
- OpenAI「Sora 2 Prompting Guide」 https://developers.openai.com/cookbook/examples/sora/sora2_prompting_guide
- Higgsfield MCP `get_workflow_instructions`（narration v1.1）2026-10-22 取得
