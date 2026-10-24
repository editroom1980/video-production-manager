# VISIONREEL の改善案（2026-10-24）

VISIONREEL の現状メモ（2026-10-22、依頼者が貼ったもの）の §4・§7・§10 を起点に、Higgsfield の MCP（無料の `models_explore`・`get_cost`・`get_preset_instructions`・`transactions`）と公開の資料で調べた。生成はしていない。
VISIONREEL のコードは見ていないので、すでにできていることが含まれているかもしれない。手元のコードと突き合わせてから進める。

根拠: ✅ Higgsfield の MCP で確かめた（2026-10-24）／ ⚠️ 第三者の資料／ ❔ 未確認

## 0. 一覧（効果が大きく、実装が軽い順）

| 番号 | 何が変わったか | VISIONREEL の該当箇所 | 費用 |
|---|---|---|---|
| V1 | Cinema Studio 4.0 の項目（年代、カメラ、レンズ、絞り、テンポ、ジャンル、照明、色）を、MCP の欄として渡せる | §4 カット設計、§10「MCP には欄が無いので文に直している」 | 実装は0。生成は 5秒 720p で 35 |
| V2 | 口合わせ（Sync Lipsync 3、`sync_so`）が Higgsfield にある | §10「リップシンクは未対応」、§4 ⑤「口だけ動かす」 | 10秒で 36 |
| V3 | モデルの盲検の評価が更新された。Wan 3.0 が上位で安い | §4 ⑥ モデルの判定、§10「盲検の実力は 10-01 の値のまま」 | 0 |
| V4 | 仕上げの道具（コマ数の変換、明滅の除去、高解像度化、HDR 化、背景の切り抜き）が Higgsfield にある | §7 検品、04 の AF | 明滅の除去は 10秒で 2 |
| V5 | 商品の動画の公式の型が18種ある（2段の作り方、守る文、終わり方） | §3 CM の広告の形式、§4 ③ カメラの動き | 型どおりだと 6秒 1080p で 72 |
| V6 | クレジットの使用履歴（`transactions`）が取れる。ただしジョブ ID が無い | §8 台帳 | 0 |
| V7 | 採用テイクの並びを、FCP に読み込める形（FCPXML）で書き出せる | §2 プレビュー・完成素材 | 0 |
| V8 | 1本の生成でカットを割る道が増えた（Kling 4.0 のキーフレーム、FLUX 3 Video の複数コマ） | §4 ⛓ | 生成で確かめる |

## V1. Cinema Studio 4.0 の項目を欄で渡す
`cinematic_studio_video_4_0` の `models_explore` に、次の欄がある ✅。
- `era_id`（年代）、`camera_model_id`（カメラ本体）、`camera_lens_id`（レンズ）、`camera_aperture_id`（絞り）、`pacing_id`（編集のテンポ）、`genre_id`（ジャンル）
- `light`: `preset`（Cinema Studio の照明の型）／`user`（自分で保存した照明）／`custom`（自分で置く）
- `light_custom`: 灯りを順に並べる。最初の1つがキーライト。各灯りは `direction`（top、front-left、back-top-right など26方向）、`color`、`brightness`、`diffuse`
- `color_palette`: `preset` か `user` と、その ID
- ほかの欄は Seedance 2.5 と同じ（モード4つ、4〜30秒、480p〜1080p、`bitrate_mode`）

VISIONREEL への提案:
- カット設計の項目名は Cinema Studio に合わせてあるので、英語の文に直さず、欄として渡せる。とくに ④ の「光の向き」は `light_custom` の `direction` にそのまま写せる
- 分からないこと ❔: 各 ID の一覧を MCP から取る方法が見つからなかった。`get_cost` は、でたらめな `era_id` を渡しても値段を返した（ID を確かめていない）。ID は Higgsfield の画面か、手元にある既存のデータから取る必要がある。間違った ID が黙って無視されるのか、エラーになるのかも分からない
- 確かめる: 07 の S2（欄で渡す場合と、文で書く場合の比べ）

## V2. 口合わせ（Sync Lipsync 3）
`sync_so` ✅:
- 渡すもの: `input_video`（口を合わせる動画）と `input_audio`（台詞）
- `sync_mode`: 動画と音の長さが違うときの扱い。`bounce`（動画を往復）／`loop`（繰り返し）／`cut_off`（短いほうに合わせて切る）／`silence`（音に無音を足す）／`remap`（動画の速さを変える）。既定は `bounce`
- 費用: 10秒で 36（`get_cost`）

VISIONREEL への提案:
- ⑤ の台詞の扱い「口だけ動かす」のあとに、「口合わせ」を足す。流れは、ElevenLabs v4 で台詞を作る（1句3テイク以上）→ 口を閉じた芝居か、しゃべる芝居の動画を作る → `sync_so` で口を合わせる
- 規則9c（音を伸縮しない）に合わせ、`sync_mode` は `cut_off` か `silence` を既定にする。`remap` は動画の速さが変わるので、使うときは注意を出す
- Kling 4.0 も口の動きが良くなったと発表されている ⚠️（02）。どちらが自然かは 07 の S1 と M6 で比べる

## V3. モデルの判定の値を更新する
Artificial Analysis の Video Arena（同じプロンプトで作った2本を人が見比べる盲検。音ありと音なしは別に集計）から、2026-10-24 に取った値 ⚠️。Kling 3.0 1080p (Pro) を 1000 とした Elo。値段は Higgsfield の `get_cost`（5秒 720p、素材なし）✅。

| モデル（Arena の名前） | Higgsfield の ID | 画像から動画 | 文から動画 | 5秒の費用 | 1秒あたり |
|---|---|---|---|---|---|
| MiniMax H3 (768p) | `minimax_h3` | 1140（1位） | 1158 | 10（2K のみ） | 2 |
| FLUX 3 Max (720p) | `flux_3_video` か ❔ | 1138 | 1155 | 30 | 6 |
| Dreamina Seedance 2.5 | `seedance_2_5` | 1138 | 1158 | 35 | 7 |
| Gemini Omni Flash 1.1 | `gemini_omni_flash_1_1` | 1132 | 1130 | 15 | 3 |
| Wan 3.0 | `wan3_0` | 1127 | 1175（1位） | 8.75 | 1.75 |
| MiniMax H3 Max | `minimax_h3_max` | 1125 | 1154 | 12.5 | 2.5 |
| Dreamina Seedance 2.0 | `seedance_2_0` | 1121 | 1136 | `get_cost` で | — |
| Grok Imagine Video 1.5 | `grok_video_v15` | 1067 | 1056 | 22.5 | 4.5 |
| Veo 3.1 Lite | `veo3_1_lite` | — | 950 | 9（6秒） | 1.5 |
| Kling 3.0 Omni 1080p (Pro) | `kling_o3_image_reference` | 1004 | 1020 | — | — |
| Kling 3.0 1080p (Pro) | `kling3_0` | 1000（基準） | 1000（基準） | 8.75（10秒で 17.5） | 1.75 |
| Kling 4.0 | `kling4_0` | 載っていない | 載っていない | 2.5（10秒 720p で 5） | 0.5 |

読み方:
- Arena は Arena 側のプロンプトと設定で比べたもの。参照の守り方、日本語の台詞、商品のラベル、手元のプロンプトへの従い方は測っていない。判定の1つの材料にとどめる
- Wan 3.0 は、上位で値段が安い。VISIONREEL の判定の候補に無ければ足す。`enable_thinking`（プロンプトを読んでから作る。遅いが指示に従いやすい）の欄がある ✅。尺の自動（`-1`）は無料枠だけ ✅
- FLUX 3 Video（`flux_3_video`）は 5〜20秒、720p〜4K、21:9 あり ✅。Arena の「FLUX 3」と「FLUX 3 Max」のどちらに当たるかは分からない ❔
- 値段は変わる（Kling 4.0 は出たばかり）。判定の上位3つを `get_cost` で引き直す今の作りは、そのまま続ける
- 出典: https://artificialanalysis.ai/video/leaderboard/image-to-video 、 https://artificialanalysis.ai/video/leaderboard/text-to-video 、方法は https://artificialanalysis.ai/video/methodology

## V4. 仕上げの道具
Higgsfield にある ✅（費用は `get_cost`）:

| ID | すること | 欄 | 費用の目安 |
|---|---|---|---|
| `fps_boost` | コマ数を増やす（ByteDance か Topaz） | `variant`、`fps`（16〜120の整数。ByteDance は24以上） | 10秒 1080p 24→30 で ByteDance 20、Topaz 33 |
| `video_deflicker` | 明滅を除く | — | 10秒で 2 |
| `topaz_video` | 高解像度化（1080p／2160p）、コマの補間 | `resolution`、`enhancement`、`frame_interpolation` | `get_cost` で |
| `video_upscale`、`bytedance_video_upscale` | 高解像度化 | — | `get_cost` で |
| `topaz_hyperion_2_5` | SDR を HDR に（大きさとコマ数はそのまま） | — | `get_cost` で |
| `sam_3_video`、`video_background_remover` | 背景を切り抜く | — | `get_cost` で |
| `depth_anything_video` | 深度マップを作る（合成用） | — | `get_cost` で |

VISIONREEL への提案:
- 自動の検品で「明滅」が出たテイクに、`video_deflicker`（安い）を承認待ちに置く選択肢を出す
- 放送の 29.97p: `fps_boost` は整数しか受けないので、29.97 は直接作れない。30 にしてから手元の ffmpeg で 30000/1001 に直すか、最初から ffmpeg で変換する。どちらが自然かは 07 の S4 で比べる
- 費用のかかる仕上げ（高解像度化、HDR）は、採用テイクだけに。採否を付けたあとに出す

## V5. 商品の動画の公式の型（Higgsfield のプリセット18種）
`get_preset_instructions` で読める商品動画の型 ✅。どれも同じ作りになっている。
1. 下ごしらえ: `nano_banana_pro` で、商品の写真から開始の画像を作る。商品を中央に、全体が見えるように置く。画面の6〜7割の大きさにする。背景は継ぎ目のない単色で、色は商品・パッケージ・ロゴの特徴的な色から取る。柔らかいスタジオの光と、接地の影を1つ
2. 動画: `seedance_2_0`、6秒、1080p、`mode: std`、`bitrate_mode: high`、`generate_audio: false`、既定の縦横は 3:4。開始の画像を `start_image` に
3. プロンプトの形: 「動きの文（2〜3文）」＋共通の守る文＋共通の終わりの文
   - 守る文: 商品の形・比率・素材・色・ロゴの位置・パッケージ・読める文字を、全コマで保つ。動きは物理的にあり得るように、時間の一貫性は高く、輪郭は安定し、光は一貫させる。商品を溶かす・増やす・置き換える・作り直すことをしない。人・手・根拠のない効能・余計なロゴ・字幕・透かし・関係ない商品を足さない
   - 終わりの文: 「End on a clean, stable product frame suitable for social media.」

| 型 | 動き（要点） |
|---|---|
| crane-reveal | 手前の物の下か後ろから、カメラを垂直に上げて商品を見せ、構図を決めて少し止まる |
| detail-scan | 目立つ細部を2〜3か所、続けて見せる。ピント送りで移り、最後に商品の全体 |
| floating-roll | 無重力のように浮かせ、その場でゆっくり回す。上下の漂いは少しだけ |
| half-turn | カメラを固定し、商品を180度回す。動き始めと終わりを緩やかに |
| impact | 静止した商品のまわりに粒子が放射状に飛び、空中で止まる。カメラは短く弧を描く。商品は動かさない |
| label-trace | ラベル・ロゴ・文字の上をカメラがなぞり、文字は安定して読める。最後に正面全体へピントを移す |
| light-sweep | カメラと商品を固定し、光の帯が表面を横切る。反射は実際の形に沿う |
| liquid-wrap | 液体のリボンが商品に巻きつき、離れていく。商品を汚さず、曲げず、隠さない |
| macro-glide | マクロレンズで表面をゆっくり滑る。被写界深度は浅く、ピントの移りは控えめ |
| paint-wave | パッケージの色の絵の具の波が、商品のそばを通る。商品は動かさない |
| product-spin | カメラを固定し、回転台で360度を一定の速さで回す。見えない面は控えめに補う |
| pull-back | 商品の細部から、カメラを後ろへ引いて全体と周りを見せる |
| push-in | 周りが見える所から、商品の寄りまで、カメラをゆっくり一定に押す |
| shadow-motion | 商品を固定し、建物のような形の影が背景と表面をゆっくり動く |
| sunrise-pass | 冷たい暗さから、暖かい斜めの光へ、日の出のように移る |
| texture-track | 素材の質感の1か所を、斜めの光でなぞり、少し引いて商品全体につなぐ |
| topdown-dive | 真上から、降りながら傾けて、斜め45度の寄りへ1つの動きで移る |
| whip-pan | 隣の何もない所から、ぶれの出る速い振りで、商品にぴたりと止まる |

VISIONREEL への提案:
- CM の広告の形式（ハイパーモーションなど）と、カメラの動き24種の英文の書き方に、上の動きの文を取り入れる。とくに whip pan とピント送り（rack focus。型では `precise focus pulls`、`pulling focus`）は、手元で「効くか未確認」だった語なので、公式の型の書き方で試す（07 の S5）
- 「下ごしらえの開始画像」の決まり（単色背景、色は商品から取る、画面の6〜7割、接地の影1つ）を、商品カットの始点の画の注意として出す
- 守る文は否定（Do not）を含むが、手元の決まり（01 §2 の5）の「末尾の制約文」に当たるので食い違わない
- 本番で `bitrate_mode: high` を使っているかを確かめる（型はすべて high）
- 規則9b: 型を使っても、出た絵は実物の写真と照合する

## V6. クレジットの使用履歴と台帳
- `transactions` ✅: 新しい順に、`display_name`（モデル名。例「Kling v3.0」）、`credits`（使った量はマイナス）、`action`（spend／refund／grant／deduct）、`created_at`（時刻）が返る。ページは `next_cursor` で送る
- ジョブ ID は含まれない。台帳と照らすには、生成を出した時刻とモデル名で突き合わせる
- 提案: 生成を出すたびに、ジョブ ID・モデル名・時刻・見積もりを台帳に書いておき、1日の終わりなどに `transactions` と突き合わせて、実費と返金（refund）を埋める。見積もりと実費の差が出たら知らせる

## V7. FCP への受け渡し（FCPXML の書き出し）
- 採用テイクを順に並べた仮つなぎを、mp4 だけでなく FCPXML でも書き出すと、FCP で各カットを差し替えたり尺を詰めたりできる
- 道具の候補 ⚠️（手元で版と動作を確かめてから）:
  - `@chatoctopus/timeline`（npm、Node 18 以上）: FCPXML 1.8・FCP7 XML・OTIO を書き出す。時間の計算はコマ単位の分数。VISIONREEL のサーバーは Node なので組み込みやすい https://github.com/ChatOctopus/timeline
  - OpenTimelineIO の `fcpx_xml` アダプター（Python） https://pypi.org/project/otio-fcpx-xml-adapter
  - FCPXML の MCP サーバー（Python。動いている FCP に読み込ませる機能もある） https://glama.ai/mcp/servers/DareDev256/fcpxml-mcp-server
- 書き出しに入れるとよいもの: カットの名前、マーカー（カット番号、採用の理由）、元の生成のジョブ ID（メモ欄）、台詞の音声の別トラック

## V8. 1本の生成でカットを割る道（⛓ の別案）
- Kling 4.0（`kling4_0`）の説明に「順に並べたキーフレームから作る」とある ✅。何枚まで、どの役割で渡すかは書かれていない ❔（07 の M7）
- FLUX 3 Video（`flux_3_video`）の説明に「複数コマから動画」、タグに storyboard がある ✅。渡せる役割は start_image・end_image・image_references・video_references
- どちらも、⛓ で束ねる候補に足せるかを 07 の S3 で確かめる

## 1. 生成で確かめること（07 に足した S1〜S5）
撃つのは承認のあと。費用は 2026-10-24 の `get_cost`。

| 番号 | 確かめること | 試し方 | 費用の目安 |
|---|---|---|---|
| S1 | `sync_so` で、ElevenLabs v4 の日本語の台詞に口が合うか。`cut_off` と `silence` の違い | 5秒の口を閉じた芝居の動画＋台詞 | 動画 2〜10＋口合わせ 18前後 |
| S2 | Cinema Studio 4.0 で、照明を `light_custom` で渡す場合と、文で書く場合の比べ | 同じ場面、5秒 480p を2本 | 15×2 |
| S3 | Kling 4.0 のキーフレームと FLUX 3 Video の複数コマで、狙いどおりにカットが割れるか | 3枚の画像で 5秒 | 2.5＋30 |
| S4 | 24p の生成を 29.97p にするとき、`fps_boost`（30）＋ffmpeg と、ffmpeg だけの比べ | 10秒1本 | 20 |
| S5 | 公式の型の書き方で、whip pan とピント送りが効くか | `seedance_2_0_mini` 4秒で whip-pan と detail-scan の文を | 2×2 |
| S6 | Wan 3.0 を、手元の CM のプロンプトで Seedance 2.5 と比べる。`enable_thinking` の有無も | 5秒 720p | 8.75×2＋35 |

## 2. 分からないままのこと
- Cinema Studio 4.0 の各 ID の一覧の取り方
- `virality_predictor`（SNS 向けの反応の予測）と `video_analysis_create` を自分の動画に使うときの費用と精度
- Higgsfield の Arena 上の名前と ID の対応（FLUX 3 と FLUX 3 Max）
