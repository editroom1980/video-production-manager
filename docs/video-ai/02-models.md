# モデル別チートシート

根拠の印:
- ✅ 確認済み（公式）: メーカーの文書、または Higgsfield の `models_explore` / ワークフローから取ったもの
- ⚠️ 第三者の記事
- ❔ 未確認
- 🔧 手元で確認（生成して確かめた）

単価は書きません。使う前に Higgsfield の `get_cost`（無料）で確かめてください。モデルの仕様は変わるので、生成の前に `models_explore`（無料）でも引き直してください。

---

## 1. Higgsfield で使えるモデル（2026-10-22 時点）

手元の生成はすべて Higgsfield の MCP 経由です。以下の数値は、2026-10-22 に `models_explore` で引いたものです ✅。

### 早見表

| 用途 | 第一候補（Higgsfield のモデルID） | 次点 |
|---|---|---|
| 会話シーン、参照素材（顔・商品・声）を組み合わせる CM | `seedance_2_5` | `seedance_2_0`、`minimax_h3` |
| 参照を多く使う長めのカット、2K で欲しいもの | `minimax_h3` | `seedance_2_5` |
| 動きの多いカット、マルチショットを1回で | `kling3_0`、`kling_o3_image_reference`（Omni） | `kling4_0`（安い。出来は ❔） |
| 映画的な画作り（カメラ・レンズ・照明を項目で指定） | `cinematic_studio_video_4_0`（Cinema Studio 4.0） | `cinematic_studio_3_0` |
| 動きの試作（安く数を出す） | `veo3_1_lite` | `seedance_2_0_mini`、`kling3_0_turbo` |
| 日本語の台詞・ナレーション | `elevenlabs_v4` | — |

### MiniMax H3（`minimax_h3`）
- 尺: 4〜15秒（整数）。解像度: 2K のみ。1回に1〜4本 ✅
- 縦横比: auto、21:9、16:9、4:3、1:1、3:4、9:16 ✅
- 入力: start_image、end_image、image_references、video_references、audio_references ✅
- start_image と image_references は同時に渡せない（422 エラー）🔧
- 出力の縦横比は start_image の比に引っ張られる 🔧
- 公式のモデル本体の仕様: 24fps、音声 32kHz ステレオ、台詞は日本語を含む11言語。参照は画像9枚・動画3本・音声3本まで（動画・音声はそれぞれ合計15秒以内）、合わせて12ファイルまで ✅（MiniMax 公式。Higgsfield 経由で同じ上限かは ❔）
- 速い版: `minimax_h3_max`（5〜15秒、480p／768p）✅
- 書き方は §2 の MiniMax H3 を参照。

### Seedance 2.5（`seedance_2_5`）
- モード: `t2v`（文章だけ）、`omni_reference`（画像・動画・音声の参照）、`video_edit`（参照動画1本を編集。料金はその動画の長さ）、`video_extension`（前後に延長）✅
- 尺: 4〜30秒（整数）。解像度: 480p／720p／1080p（既定 720p）✅
- 音声の生成: 既定でオン（`generate_audio`）✅
- 下書き: `draft` をオンにすると 480p の下書きを作り、7日以内に `draft_job_id` で 1080p に仕上げられる ✅。下書きと仕上げで絵がどこまで同じかは ❔
- 縦横比: auto、21:9〜9:16 ✅
- 参照の上限は、画像30・動画10・音声10（合計50）という記事が多い ⚠️（Artlist、Runware）
- 会話シーンは、台詞を1行ずつ音声にして `audio_references` で渡す（RKJ VIDEO の手法）🔧
- `ad_multiplier`（Ad Multiplier）も中身は Seedance 2.5 ✅

### Seedance 2.0（`seedance_2_0`）／ 2.0 Mini（`seedance_2_0_mini`）
- 2.0: 4〜15秒、480p〜4K（1080p と 4K は `mode: std` のみ）、`genre`（action、horror、comedy、noir、drama、epic）の指定あり ✅
- 2.0 Mini: 4〜15秒、480p／720p、安い試作向け ✅
- 入力はどちらも start/end_image と画像・動画・音声の参照 ✅

### Kling 3.0（`kling3_0`）と Kling 3.0 Omni（`kling_o3_image_reference`）
- `kling3_0`: 3〜15秒、`mode` は std／pro／4k、`sound` はオン／オフ（オフで安くなる）、入力は start_image と end_image だけ、縦横比は 16:9／9:16／1:1 ✅
- `kling_o3_image_reference`（Omni）: 参照画像を7枚まで。`multi_shots` をオンにして、`multi_prompt` に `{prompt, duration}` を順に並べると、カットごとの指示と秒数を渡せる ✅
- `kling3_0_turbo`: 3〜15秒、start_image だけの速い版 ✅

### Kling 4.0（`kling4_0`）
Higgsfield の `models_explore` で 2026-10-23 に確かめたこと ✅:
- 3〜30秒（整数）、720p／1080p、縦横比は 21:9／16:9／9:16／1:1／auto
- `mode`: text-to-video／image-to-video／reference-to-video／video-edit
- 渡せる素材の役割: start_image、end_image、image_references、video_references。`kling_element_ids` は7つまで。音声の参照の役割は無い
- 説明に「順に並べたキーフレーム（ordered keyframes）から作る」とある。ただし、何枚まで渡せるか、キーフレームをどの役割で渡すかは書かれていない ❔
- 費用（`get_cost`、素材なし）: 10秒 720p が 5、10秒 1080p が 10、30秒 1080p が 30。1秒あたり 0.5〜1 で、`kling3_0` 10秒（17.5）や `seedance_2_5` 10秒 1080p（160）よりかなり安い。出たばかりの値段かもしれないので、使う前に毎回 `get_cost` で確かめる ❔

Kling の発表（2026-09-28）として紹介されていること ⚠️（「動画編集の中の人」の速報の回 wkyzJK38MGw と、第三者の記事 Atlas Cloud）:
- 1回で30秒。延長で2分まで（近日）。10ビットの HDR の書き出し（近日）
- キーフレームを10枚まで置ける（振り向く・驚く・走り出す、のように演技を1枚ずつ指定）。プロンプトは8000トークンまで
- 参照は合計15まで（画像10、動画5本で合計30秒、登場する物や人物の「要素」7つ）。要素ごとに声も指定できる
- 声がステレオに。口の動きの合い方が良くなった。話せる言語が増えた（3.0 の中国語・英語・日本語・韓国語・スペイン語に、ポルトガル語・ドイツ語・フランス語などが加わる）
- 一部だけ直す編集（表情、体の動き、カメラ、雰囲気や背景）と、既存の動画の構図やテンポをそのままに商品や人物を差し替える「Creative Recreation」
- 文字・絵文字・ロゴが崩れにくくなった
- 先に出た Flash 版は 20秒・720p で、キーフレームを複数置けない、という記事がある。Higgsfield の `kling4_0` は 30秒・1080p なので Flash 版ではなさそうだが、確かめていない ❔

手元での扱い:
- Higgsfield で使えるのは、上の ✅ の範囲。キーフレーム10枚、要素ごとの声、Creative Recreation は、Higgsfield の道具から使えるか分からない ❔。差し替えは今のところ Ad Multiplier か Seedance 2.5 の `video_edit` で行う
- 日本語の台詞の口の動きは、ElevenLabs v4 で作った台詞と合わせて、07 の M6 で確かめる
- 文字・ロゴが崩れにくくなったとしても、規則9b（実物の写真と照合）は変えない。文字は引き続きコードで重ねる
- Seedance 2.5 との使い分けは 07 の M3 で決める。それまでは、参照を多く組む CM と会話シーンは Seedance 2.5、安く長い試作や 21:9 の情景は Kling 4.0 を候補にする

### Cinema Studio
- `cinematic_studio_video_4_0`（Cinema Studio 4.0）: 4〜30秒、480p〜1080p。モードは Seedance 2.5 と同じ4つ。時代（`era_id`）、カメラ本体、レンズ、絞り、編集のテンポ、ジャンル、照明（プリセット／自分の配置）、カラーパレットを項目で指定できる。「プロンプトの演出を自動で補う」と説明されている ✅。自動の補いが手元のプロンプトをどこまで書き換えるかは ❔
- `cinematic_studio_3_0`（Cinema Studio Video 3.0）: 480p〜4K、`genre` あり、音声は既定でオフ ✅
- 手元のメモの `cinematic_studio` という ID は、2026-10-22 の一覧にはありませんでした。上の ID を使ってください。

### Veo 3.1 Lite（`veo3_1_lite`）／ Veo 3.1（`veo3_1`）
- Lite: 4／6／8秒、入力は start_image と end_image、縦横比は 16:9／9:16／auto、音声は既定でオフ。説明は「速く安い試作向け」✅
- `veo3_1`: 4／6／8秒、`quality`（basic／high／ultra）、`variant`（preview＝高品質／fast）、入力は start_image だけ ✅
- Higgsfield の `veo3_1` は参照画像（Google のいう Ingredients）と end_image を受けないので、Google 側の機能がそのまま使えるわけではありません ✅

### そのほか（一覧にあったもの）
- `gemini_omni_flash_1_1`（Gemini Omni Flash 1.1）: 3〜10秒、360p〜4K、参照・編集あり ✅
- `wan2_7`（Wan 2.7）: 2〜15秒、720p／1080p、start/end_image と音声の参照 ✅。手元のメモでは「Higgsfield で使えない」可能性があるとしていましたが、一覧にはありました。
- `wan3_0`（Wan 3.0）: 2〜30秒、480p〜1080p、参照（画像・動画・音声）と start/end_image、`enable_thinking`（遅いが指示に従いやすい）✅。5秒 720p で 8.75 と安く、盲検の評価で文から動画の1位（2026-10-24 ⚠️）。12 の V3
- `flux_3_video`（FLUX 3 Video）: 5〜20秒、720p〜4K、21:9 あり、複数コマから動画・続きを作る ✅。5秒 720p で 30
- `grok_video_v15`（Grok Video 1.5）: 2〜15秒、480p〜1080p、start_image と画像・音声の参照 ✅
- `minimax_h3_max`（MiniMax H3 Max）: 5〜15秒、速い版 ✅
- 口合わせの `sync_so`（Sync Lipsync 3）、仕上げの `fps_boost`・`video_deflicker`・`topaz_video`・`topaz_hyperion_2_5` などもある ✅（12 の V2・V4）
- Sora 2 は、Higgsfield の一覧にありませんでした ✅（2026-10-22）。§2 の Sora 2 の節は、ほかのサービスで使う場合の参考です。

### 4つのモデルを比べた作り手の例（参考）
「動画編集の中の人」が、壊れやすい動き（麺を放る・炎・湯気）の1本で Seedance 2.5、MiniMax H3、Wan 3.0、Kling 3.0 を比べた結果は 09 §4-2 にあります（⚠️ 1回ずつの比較）。カメラの1カットを守れたのは MiniMax H3 だけ、顔と服が崩れなかったのは Seedance 2.5 と MiniMax H3 でした。`wan3_0`（Wan 3.0、最大30秒）も Higgsfield にあります ✅。

### 音声
- `elevenlabs_v4`（Eleven v4）: 1回の台詞（`dialogue`）に最大10人の声、全体で1万字まで、1回に1〜4本。`stability` と `similarity_boost` を調整できる ✅
- BGM は Higgsfield では作れない（sonilo_music の説明が「Game pipeline only.」）🔧

### Higgsfield のワークフロー（`get_workflow_instructions`、2026-10-22 取得）✅
使いどころのあるもの:
- `narration`（v1.1）: 決まった尺に合わせたナレーション。時間の伸縮は禁止、合わなければ文を書き直す。数は文字で書く。1行あたりの試行は3回まで。
- `ad-multiplier`: 4〜30秒の既存の広告を、人物・商品・言語を変えて作り直す（編集モードと作り直しモード）。
- `katana`: 参考動画をもとに作り直す（手元の試作で 15秒 64.24 クレジット 🔧）。
- `product-photoshoot`: 商品の静止画（パッケージ写真、使用シーン、バナー）。
- `character-sheet`: 人物の設定画（正面・横・後ろ、表情）。
- `ugc-video`: 作り手が話す形式の短い動画（レビュー、開封、使い方）。
- `video-montage`: 既存のクリップをつなぐ、曲を差し替える、字幕を焼く。
- `video-editing`: 文字のアニメーション、タイトル、図形などのモーショングラフィックス。

---

## 2. 書き方のメーカー別のくせ（公式ガイドから）

### MiniMax H3（公式ガイド ✅、Hugging Face のリポジトリ、2026-10-22 閲覧）
- 参照の書き方: `<Subject N>`（人・物・場所・衣装・画風など、再利用する中身）、`<Picture N>`（その画像を実際の一コマとして使うとき）、`<Video N>`（元の動画の編集・続き・カメラワークの借用）、`<Audio N>`（声質や曲の参照）。ラベルの意味は全体で変えない。
- どこまで残すかを決まった言葉で書く: 映像は `fully_preserved`／`partially_preserved`／`attribute_transfer`／`weak_reference`、音は `fully_copy`／`partially_copy`／`reference`／`weak_reference`。
- カット: `[Shot 1]` には時刻を付けない。2つ目以降は `[Shot 2] At 00:03.500, the camera cuts to …` のように、切り替わる時刻を書く。
- 台詞: 話者に `(S1)` などの番号を振り、`<d>[Japanese] …</d>` で原文のまま書く。画面外のナレーションは `says in an off-screen voiceover` と書き、口は閉じたままと明記する。
- 画面上の文字は英語の二重引用符で原文のまま書く。
- 音は `overall_soundscape`（環境音・物音、1〜4文）と `non_diegetic_music`（劇伴、1〜3文。気分の言葉ではなく楽器・テンポで書く）に分ける。曲を使わないなら N/A。
- 最初と最後の画像を渡すとき（FL2VA）は、2枚の静止画の説明ではなく、その間の動きの道筋を書く。
- 参照生成の文章は 350〜500 語が目安。

### Seedance 2.5
- Higgsfield の公式ガイド（2026-08-13）✅: 節の順番は GLOBAL STYLE → SCENE → CHARACTERS → LOCATION → FIRST FRAME AND BLOCKING → ショットごとの内訳 → OPTICS → CAMERA → PHYSICS → LIGHTING → AUDIO。各ショットに `0.0s to 3.0s` のような時間と、最後に `HARD CUT` を書く。冒頭に `Five segments, hard cuts only.` のように区切りの数を宣言する。
- 時間の区切りは `[0-3s]` のように途切れなく続け、1秒くらいの細かさにする。詰め込みすぎると勝手にカットが入ったり、出来事が抜けたりする ⚠️（Runware、2026-08-07）
- 参照は1つの役割に1つ（顔・商品・場所・画風）。上限まで詰め込まず、少なく選ぶ ✅（Higgsfield）
- 文字の括弧の書き方（台詞・字幕・効果音を括弧の種類で分ける）は、記事によって食い違っています ⚠️。Higgsfield 経由で効くかは ❔（07 に記載）。

### Kling 3.0（公式ガイド ✅、2026-02-06）
- マルチショット（AI Director）: スイッチをオンにすると、場面の説明からカット割りを考える。カスタムにすると、カットの数と各秒数を決められ、指示によく従う。尺は合計 3〜15秒。
- 台詞: 話者の名前と、括弧で口調を書いてから台詞。日本語に対応。1本の中で言語を切り替えられる。
- 文字: 入力画像の看板・文字・ロゴを保ち、ぼかさない。見せたい文字は「カメラがその文字にとどまる」と書く。
- 要素（Element）: 正面の画像1枚＋別の角度1〜3枚で作る。声も結びつけられる（結びつけた場合は、プロンプトで声の調子を指定しない）。最初のフレームで使う要素は、そのフレームに写っている必要がある。Omni では動画の入力がなければ7つまで、あれば4つまで（2026-02-05）。

### Veo 3.1（Google Cloud 公式 ✅、2025-10-16）
- 式: `[カメラ] + [被写体] + [動作] + [場所] + [スタイルと雰囲気]`
- 音: 台詞は `A woman says, "…"`、効果音は `SFX: …`、環境音は `Ambient noise: …`
- 時間の区切り: `[00:00-00:02] …` で1回の生成の中にカットを割れる。
- 参照（Ingredients）: 最大3枚 ✅（Google Developers Blog）。プロンプトは `Using the provided images for the detective, the woman, and the office setting, create …` の形。
- 否定は「ないもの」を書かず、「あるもの」で書く（例: 「建物も道路もない荒れ地」）。
- Higgsfield の `veo3_1` / `veo3_1_lite` は参照画像を受けない点に注意 ✅

### Runway Gen-4.5（Higgsfield にはありません）
- 動きを中心に書き、開始画像があるときは見た目を書き直さない ⚠️

### Sora 2（Higgsfield にはありません）
- `seconds` は 4／8／12／16／20、`size` 指定、台詞は `Dialogue:` の節に分ける ✅（OpenAI Cookbook。アーカイブ表示あり）

---

## 3. 作例（Higgsfield のモデル向け）

### Seedance 2.5（omni_reference、CM の1カット）
```
GLOBAL STYLE: clean commercial look, natural skin texture, soft daylight. No music, no subtitles.
SCENE: a woman makes her first cup of coffee of the day.
CHARACTERS: the woman from the reference, identical features in every shot, zero drift.
LOCATION: a small bright kitchen with a white tile wall.
FORMAT: three segments, hard cuts only.
0.0s to 2.0s: macro close-up, static. Hot water pours over coffee in a glass dripper; steam rises. HARD CUT.
2.0s to 5.0s: medium shot, slow push-in. She lifts the cup with both hands and her shoulders relax. HARD CUT.
5.0s to 7.0s: close-up of the product on the counter, locked-off. The package is inherited exactly from the reference; its lettering stays sharp and correctly spelled.
AUDIO: water pouring, a ceramic cup set down, quiet room tone. No BGM.
```

### MiniMax H3（参照生成）
```
<Subject 1> is the woman in <Picture 1> (fully_preserved). <Subject 2> is the coffee package in <Picture 2> (fully_preserved).
[Shot 1] Medium shot. <Subject 1> stands at a bright kitchen counter and pours hot water over a dripper; the camera pushes in with small amplitude at slow speed.
[Shot 2] At 00:03.000, the camera cuts to a close-up of <Subject 2> on the counter, its printed text "…" unchanged.
overall_soundscape: Water pours steadily, a cup is set down on tile, a fridge hums softly.
non_diegetic_music: N/A
```

### Kling 3.0 Omni（multi_shots）
`multi_prompt` に次のように渡します（秒数は内容に合わせて決める）。
```
[{"prompt": "Wide shot, slow crane down over a mountain shrine festival at night, paper lanterns glowing.", "duration": 3},
 {"prompt": "Tracking shot from behind. [Taro], a young man in a red happi coat, carries the portable shrine with five others.", "duration": 4},
 {"prompt": "Close-up, handheld. [Taro] wipes his brow and grins. [Taro] (breathless, joyful, Japanese): \"まだまだいけるぞ!\"", "duration": 3}]
```

---

## 出典
- Higgsfield MCP `models_explore` / `get_workflow_instructions` 2026-10-22 取得
- MiniMax「MiniMax-H3」 https://huggingface.co/MiniMaxAI/MiniMax-H3 （ガイド: docs/VIDEO_PROMPT_WRITING_GUIDE_base_en.md、_ref_en.md）2026-10-22 閲覧
- Higgsfield「Seedance 2.5: Complete Prompting Guide」2026-08-13 https://higgsfield.ai/blog/seedance-2-5-prompting-guide
- Runware「Seedance 2.5 Prompting」2026-08-07 https://runware.ai/docs/models/bytedance-seedance-2-5/guides/prompting
- Artlist「Seedance 2.5 is live on Artlist」 https://artlist.io/blog/seedance-2-5-on-artlist-the-ai-video-model-moving-the-needle/
- Kling「VIDEO 3.0 Model User Guide」2026-02-06 https://kling.ai/quickstart/klingai-video-3-model-user-guide
- Kling「Element Library 3.0 User Guide」2026-02-05 https://kling.ai/quickstart/klingai-element-library-3-user-guide
- Google Cloud「The ultimate prompting guide for Veo 3.1」2025-10-16 https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-veo-3-1
- Google Developers Blog「Introducing Veo 3.1」 https://developers.googleblog.com/introducing-veo-3-1-and-new-creative-capabilities-in-the-gemini-api/
- OpenAI「Sora 2 Prompting Guide」 https://developers.openai.com/cookbook/examples/sora/sora2_prompting_guide
- Runware「Runway Gen-4.5: Directing motion」 https://runware.ai/docs/models/runway-gen-4-5/guides/directing-motion
