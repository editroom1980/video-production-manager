# VISIONREEL への提案（2026-10-22）

「VISIONREEL の現状（2026-10-22）」のメモ §11 で頼まれた4つへの返答です。VISIONREEL のコードは見ていません。メモの記述をもとにした資料と提案です。

根拠の印: ✅ 確認済み（公式）／ ⚠️ 第三者の記事／ ❔ 未確認／ 🔧 手元で確認（メモに「根拠:実行」とあるもの）
費用はすべて 2026-10-22 に Higgsfield の `get_cost: true` で引いた値です（ジョブは送っていない）。プロンプトは仮の文、参照素材なしで引いたので、参照や音声を付けると変わる可能性があります（❔）。

---

## 1. 企画（§3）の質問項目の突き合わせ

### 1-1. 実務のブリーフの項目と比べて、足りないもの

広告の企画書（クリエイティブブリーフ）の項目は、どの資料でもおおむね次のとおりです（⚠️ Arcalea、Wikipedia「Creative brief」、Milanote ほか）。背景と目的、相手と気づき（インサイト）、伝える1つのこと（シングルマインデッド・プロポジション）、それを信じる理由、見た人にしてほしいこと、トーン、必須事項、納品物、日程・予算・承認。
解説動画のブリーフも、目的、相手、伝える要点、台本の下書き、絵コンテの下書き、日程、予算が中心です（⚠️ Canny Creative、WordStream、Content Snare）。
MV の企画書（トリートメント）は、構想、雰囲気の参考、絵コンテの要約、カメラの言葉、出演者、美術、効果、衣装、音、最後の場面です（⚠️ Wrapbook、Robin Piree）。

VISIONREEL の企画8段（メモ §3）と照らすと、すでにある項目は多く、足りないのは次のものです。

| 足りない項目 | 中身 | どのジャンルで | 根拠 |
|---|---|---|---|
| 背景と目的 | なぜ今これを作るのか。売上・認知・採用・来場など、何が変われば成功か | 全部 | ⚠️ ブリーフの共通項目 |
| 見た人にしてほしいこと | 見終わったあとの行動（検索する、来店する、応募する、続きを見る）。CM の「締め」とは別に、行動として1つ書く | CM・SNS・PV・解説 | ⚠️ ブリーフの「desired response」 |
| それを信じる理由 | 伝える1つのことの裏付け（数字、受賞、成分、実績）。言い切る表現には根拠が要る | CM・PV | ⚠️ ブリーフの「reasons to believe」 |
| 相手の気づき（インサイト） | 「誰に」の次に、その人が感じている本音を1行 | CM・SNS | ⚠️ 同上 |
| トーンの参考と「違う例」 | 形容詞だけでなく、参考作品1つと「こうではない」例を1つ | 全部 | ⚠️ ブリーフの解説（形容詞だけでは伝わらない） |
| 必須事項 | 外せないもの：ロゴの位置、法的な注記、商品カット、協賛の表示、言ってはいけない言葉 | CM・PV | ⚠️ ブリーフの「mandatories」 |
| 媒体と見られ方 | テレビ／SNS（音なしで見られる前提か）／会場の大画面など。字幕の要否がここで決まる | CM・SNS | ✅ TikTok 公式は文字の重ね・字幕を勧める。⚠️ Meta は音なし視聴も前提に、という記事が多い |
| 尺と画面比の派生 | 本編のほかに作る版（15秒・30秒・6秒、縦横） | CM・SNS | ⚠️ 実務の慣習 |
| 放送の納品の決まり | テレビ CM なら音量 -24.0LKFS（民放連の規準、CM 素材搬入基準）、光の点滅の基準（NHK・民放連「アニメーション等の映像手法に関するガイドライン」）、考査 | テレビ CM・番組 | ✅ 音量は ARIB TR-B32 と民放連の規準。点滅の数値は今回確かめられず ❔ |
| 権利と表記 | 出演者の許諾、使う写真や曲の許諾、「AI生成」の表記の要否 | 全部 | 手元の規則に沿う |
| 日程・費用の上限・承認者 | 締切、使ってよいクレジットの上限、誰が承認するか | 全部 | ⚠️ ブリーフの共通項目。VISIONREEL の承認待ちとつなげやすい |
| 成果の見方 | 何で良し悪しを判断するか（再生の完了率、応募数、来場数） | CM・SNS・PV | ⚠️ 自治体の CM 提案要領も効果の根拠を求めている |

MV にだけ足したい項目:
- 曲の構成と BPM（Aメロ・サビの位置）。カットの密度と山場の位置は曲で決まる。
- 歌い手の出方（演奏の場面と物語の場面の割合）。本人を生成で出すなら許諾。
- 歌詞と合わせたい所（何秒の歌詞に何を見せるか）。

解説動画にだけ足したい項目:
- 相手の前提知識（初めての人か、知っている人か）。
- 伝える要点は3つまで。
- 画面に出す文字（用語・数字）の一覧。

### 1-2. 順番の改善

今の順番: 基本（表現・尺・比率・納品先）→ 内容 → 登場するもの → 音 → カット割り → 生成 → 確認

提案する順番:
1. 目的と相手（背景と目的、誰に、相手の気づき、見た人にしてほしいこと）
2. 伝えること（伝える1つ、信じる理由、必須事項）
3. 媒体と納品（媒体と見られ方、尺と画面比、派生、放送の決まり、締切、費用の上限）
4. 表現とトーン（表現の種類、トーンの参考と違う例、広告の形式）
5. 登場するもの（実在の印と写真）
6. 音（ナレーション・台詞・曲を先に決める）
7. カット割り（音の長さから割り振る）
8. 生成 → 確認

理由:
- ブリーフはどれも「目的と相手」から始まります。表現の種類（実写かアニメか）を最初に聞くと、目的より先に見た目が決まってしまいます。
- 音を先に決めると、カットの尺が音から決まります（Higgsfield 公式の「音を先に作る」手順。08 の 6）。今の「尺から割り振る」は、音の段が終わってから行うほうが合います。
- 費用の上限と締切を早めに聞くと、「生成」の段（試作か本番か、本数）が自然に決まります。

---

## 2. CM の広告の形式に足すもの

今の10種: ハイパーモーション、ASMR、世界観、レビュー、開封、街頭インタビュー風、リアクション、使い方、試着、ドラマ。

足す候補（役に立つ順）:

| 形式 | 中身 | 撮り方 | 生成の注意 | 根拠 |
|---|---|---|---|---|
| 課題→解決 | 困っている場面 → 商品で解決 → 解決後の顔 | 3段。困っている場面を短く、解決を見せる時間を長く | 解決の効果を言い切るなら根拠が要る（景品表示法・薬機法の対象になり得る ❔）。誇張した変化を生成で作らない | ⚠️ 成果の出る形式としてよく挙がる |
| 比較・ビフォーアフター | 使う前と後、他の方法と商品 | 同じ構図・同じ照明で2つを並べる。分割画面か、同じカメラ位置で切り替え | 「後」を生成で盛らない。実物の写真と照合（9b）。他社名を出す比較は考査に注意 ❔ | ⚠️ 同上 |
| 作り手の語り（創業者・職人） | 作った人が理由を語る | 本人を実写で撮り、手元や工程を生成やB-rollで補う | 実在の人物は生成しない。声も本人か許諾ありの録音で | ⚠️ 成果の出る形式として挙がる。地域の店・企業 PV と相性が良い |
| 舞台裏・作る工程 | 工場、厨房、畑の工程を見せる | マクロの手元、工程の順番どおりに短いカット | 実在の場所・機械は写真を参照に渡して照合（9b） | ⚠️ |
| 理由を数える（3つの理由） | 「選ばれる3つの理由」のように番号で区切る | 番号ごとに1カット＋文字 | 文字はコードで作るカット（code-motion）に回すと崩れない | ⚠️ |
| 告知・イベント | 日付・場所・見どころ | 冒頭3秒で何の告知かを出す。最後に日付と場所を大きく | 日付・地名の文字はコードで重ねる。実在の会場は写真と照合 | ✅ TikTok 公式は「主な提案は最初の3秒で」 |
| 採用・求人 | 働く人、職場、一日の流れ | 実際の職員を撮るのが基本。職場の雰囲気の補いに生成 | 実在の職員の代わりに生成した人物を「職員」として見せない。AI生成の表記を検討 | 手元の案件（職員募集 CM）に合う |
| 商品だけのデモ | 人を出さず、商品の動きと機能だけを見せる | 台座の上、回り込み、寄り、部品の動き | 06 の商品の見せ方（参照のとおり、文字は崩さない） | ✅ Higgsfield の CM 解説 |
| 文字が主役の縦型 | 音なしで見る前提。文字と短いカットで進む | 1秒に5〜10語ほどの文字 | 文字はコードで作る | ✅ TikTok 公式（文字の重ね、1秒あたりの語数）|

形式に共通する注意（TikTok 公式の勧め ✅）:
- 引きつける場面（フック）は最初の6秒以内、主な提案は最初の3秒以内。
- 作り込みすぎない見た目のほうが、SNS では溶け込みやすい。
- 文字の重ねや字幕で、音なしでも伝わるようにする。

外すことを考える例（⚠️）: 決まりきった「リングライトの前で話すレビュー」は見飛ばされやすくなった、という記事があります。今のレビュー形式に「場面を変える」注意を付けると良さそうです。

---

## 3. カット設計の語彙の直し方

### 3-1. 方針

- 名前だけで渡さない。名前＋動きの道筋を平文で書く。Seedance 2.5 は、珍しい用語には平らな説明を添えるよう勧めています（⚠️ Runware、2026-08-07）。
- 大きさと速さは決まった言葉で書く。MiniMax H3 の公式ガイドは `with small amplitude` / `with large amplitude`、`at slow speed` / `at fast speed` と書き、中くらい・普通は書かない決まりです（✅）。VISIONREEL の「強さ3段」はここに対応させます。
- `very slowly` は使わない（🔧 動きが消えた）。「弱」は `at slow speed`、「強」は `at fast speed` が安全です。
- 被写体との関係を書く。Kling 3.0 は、カメラが被写体を追う・止まる・保つを明示するよう勧めています（✅ 公式ガイド）。
- カメラの動きを積むときは、1ショットに主な動きは1つ。積むなら時刻で順番を書きます（例: `[0-2s] … [2-5s] …`）。smixs/visual-skills は「5秒に主な動き1つ」を目安にしています。24種を順に積める画面は便利ですが、2つ目以降は時刻つきにするか、注意を出すのが良いと思います。

### 3-2. 動きごとの書き方（Higgsfield のカメラ操作ページの名前に合わせた）

Higgsfield のカメラ操作ページには65種の名前があります（✅ 2026-10-22 閲覧）。VISIONREEL の24種がどれかは分からないので、よく使うものを挙げます。

| 画面の名前 | 共通の英文（推奨） | MiniMax H3 の決まった言い方 | 注意 |
|---|---|---|---|
| Static | `The camera is locked off and does not move.` | `Static Shot` | 失敗が少ない。迷ったらこれ |
| Dolly In / Out | `The camera physically moves toward (away from) the subject; the background perspective changes.` | `Push In` / `Pull Out` | Zoom と混ぜない |
| Zoom In / Out | `The lens zooms in (out); the camera position stays fixed.` | `Zoom In` / `Zoom Out` | Dolly との違いを平文で書く |
| Crash Zoom / Rapid Zoom | `A sudden, fast zoom in on {subject} within half a second.` | `Zoom In … at fast speed with large amplitude` | 時刻を指定する |
| Dolly Zoom | `Dolly zoom: the camera moves back while the lens zooms in, so {subject} stays the same size and the background stretches.` | 決まった言い方なし（2つを同時と書く） | 効くかは未確認（4章） |
| Pan Left / Right | `The camera pivots horizontally to the left (right) from a fixed position.` | `Pan Left/Right` | |
| Tilt Up / Down | `The camera pivots upward (downward) from a fixed position.` | `Tilt Up/Down` | |
| Dolly Left / Right | `The camera slides sideways to the left (right), parallel to the subject.` | `Truck Left/Right` | 名前の食い違いに注意（Higgsfield は Dolly、MiniMax は Truck） |
| Crane Up / Down、Jib | `The camera rises (descends) vertically on a crane, revealing {what}.` | `Pedestal Up/Down`（垂直移動） | 何が見えてくるかを書くと効きやすい（Veo のクレーンの作例） |
| Arc Left / Right、360 Orbit、Lazy Susan | `The camera arcs {90/180/360} degrees around {subject} to the left (right), keeping it centered.` | `Arc Shot` | 角度を数字で書く |
| Handheld、Wiggle | `Handheld camera with a light natural shake.` | `Shake Slightly` / `Shake Strongly` | 揺れの大きさを書く |
| Whip Pan | `A very fast whip pan to the right, with motion blur, landing on {subject}.` | `Pan Right at fast speed` | 効くかは未確認 |
| Head Tracking、Snorricam | `The camera stays locked on {subject}'s face as they move; the background moves behind them.` | `Tracking Shot` | 被写体との関係を書く |
| FPV Drone、Aerial Pullback | `A fast FPV drone flight low over {place}` / `The camera pulls back and rises into the sky, revealing {place}.` | `Pull Out` + `Pedestal Up` | 実在の場所は写真と照合 |
| Overhead | `Top-down view, the camera looks straight down at {subject}.` | `POV`（主観は別） | |
| Focus Change | `Rack focus: the focus shifts from {A in the foreground} to {B in the background}.` | 決まった言い方なし | 効くかは未確認 |
| Through Object In / Out | `The camera moves through {the window / the doorway} into (out of) the room.` | `Push In` | 通り抜ける物を書く |
| Dutch Angle | `The camera is tilted at a canted angle.` | `Roll Clockwise`（回転させる場合） | 傾きの固定と回転を分ける |
| Bullet Time | `Time freezes; the camera arcs around the frozen {subject}.` | `Arc Shot` | 効くかは未確認 |
| Hyperlapse、Timelapse | `Time-lapse: {clouds race / crowds blur} while the camera {moves/stays}.` | — | 速度変化の欄があるモデルは欄で渡す |

### 3-3. 照明

- 照明のプリセット名をそのまま入れず、光源を物として書く。例: `Window` → `soft daylight from a window on camera left`。
  - メモの記録では、屋上の場面に `Window` が入る不具合がありました（10月1日に直したもの）。光源を物で書けば、場所と食い違ったときに気づけます。
- 光源は1つに決め、方向と質を書く。添える内容は「何ではないか」（例: `not overhead fluorescent`）（✅ Higgsfield の Seedance 2.5 ガイド）。
- 時間帯の語（`golden hour`、`blue hour`、`overcast soft light`）は Google の公式ガイドの語と一致するので、そのまま使えます（✅）。

### 3-4. 表情（8つの感情と強さ）

- 感情の名前でなく、体の動きで書きます。Seedance の公式に近いガイドは「感情は形容詞でなく、肩が落ちる・笑みが出るといった体の動きで」としています（⚠️ Runway の Seedance ガイド）。smixs/visual-skills の「細部の決まり」も同じ考え方です。
- 強さは、動きの大きさで表します。

| 感情 | 弱 | 強 |
|---|---|---|
| 喜び | `the corners of her mouth lift slightly` | `she breaks into a wide smile, eyes crinkling` |
| 悲しみ | `his gaze drops and his shoulders sink a little` | `his chin trembles and he presses his lips together` |
| 怒り | `her jaw tightens` | `her nostrils flare and she grips the edge of the table` |
| 驚き | `his eyebrows rise slightly` | `he freezes mid-step, eyes wide, mouth open` |
| 恐れ | `she glances over her shoulder` | `she steps back, breath quick, hands raised` |
| 落ち着き | `his breathing slows, face relaxed` | `he closes his eyes and exhales slowly` |
| 決意 | `she straightens her back` | `she sets her jaw and steps forward` |
| 照れ | `he looks away with a small smile` | `he rubs the back of his neck, cheeks flushed` |

VISIONREEL の8つの感情の名前が違えば、対応する行に差し替えてください。
- 台詞がある場合は、Kling 3.0 の書き方（話者の名前、括弧で口調、それから台詞）を使います（✅ 公式ガイド）。

---

## 4. まだ確かめていないことを、試す順に

試し方は、どれも最も安い組み合わせにしています。1回の費用は 2026-10-22 の `get_cost` の値です。撃つのは手元で、承認を取ってからにしてください。

| 順 | 確かめること | 試し方 | 1回の費用（クレジット） | 回数の目安 | 合計の目安 |
|---|---|---|---|---|---|
| 1 | Cinema Studio の項目を英語の文にしたものが効くか（カメラの動き） | 3-2 の書き方で、よく使う動き6つ（Dolly In、Pan、Crane Up、Arc、Handheld、Whip Pan）を `kling3_0` 3秒 std 音なしで | 3.75 | 6〜12 | 23〜45 |
| 2 | 同じ動きを別のモデルでも効くか | 1 で効いた書き方を `seedance_2_0_mini` 4秒 480p で | 2 | 6 | 12 |
| 3 | ⛓ で束ねたとき、狙いどおりにカットが割れるか | 3カットを `seedance_2_5` 15秒 480p で1本に | 45 | 1〜2 | 45〜90 |
| 4 | プリビズの1行（配置とカメラだけ従う）が守られるか | グレーボックスの動画を `video_references` で渡し、`seedance_2_5` 5秒 480p。参照ありで費用が変わるか、先に `get_cost` で確かめる | 15（参照なしの値）| 1〜2 | 15〜30 |
| 5 | 広告の形式ごとの出来 | 形式ごとに1本、`seedance_2_5` 5秒 480p（draft） | 15 | 10〜19 | 150〜285 |
| 6 | 文字・ロゴの崩れ（07 の L1〜L3） | 同じ商品写真で `minimax_h3` 4秒、`kling3_0` 3秒、`seedance_2_0_mini` 4秒 | 8 / 3.75 / 2 | 3 | 約14 |
| 7 | 照明を物として書いたときの効き目（3-3） | `kling3_0` 3秒 音なし | 3.75 | 3 | 約11 |
| 8 | 表情の書き方（3-4） | `kling3_0` 3秒 音なし、8感情×弱強のうち4つ | 3.75 | 4 | 15 |
| 9 | 動画の実アップロード | `media_upload` に小さな動画を1本。生成はしない | 0 の見込み ❔ | 1 | 0 ❔ |
| 10 | 日本語のリップシンク | Higgsfield の `sync_so`（Sync Lipsync 3）。入力の動画と音声が要るので、手元で `get_cost` を引いてから | ❔ | 1 | ❔ |

費用の参考（2026-10-22 の `get_cost`）:

| モデル・設定 | クレジット |
|---|---|
| `seedance_2_0_mini` 4秒 480p | 2 |
| `kling3_0` 3秒 std 音なし | 3.75 |
| `seedance_2_0` 4秒 480p fast | 4 |
| `veo3_1_lite` 4秒 | 6 |
| `minimax_h3` 4秒 2K | 8 |
| `kling3_0` 5秒 std 音あり | 8.75 |
| `cinematic_studio_video_4_0` 4秒 480p | 12 |
| `seedance_2_5` 5秒 480p（draft も同じ） | 15 |
| `seedance_2_5` 5秒 720p | 35 |
| `seedance_2_5` 15秒 480p | 45 |

順番の考え方:
- 1・2 は安く、VISIONREEL のカット設計のほぼ全部の出来に効くので最初にします。
- 3・4 は VISIONREEL の独自の機能（⛓、プリビズ）の土台です。
- 5 は費用が大きいので、1〜4 で書き方を固めてからにします。
- 判定の「盲検の実力」の更新は、Web で取り直すだけなので費用はかかりません（Artificial Analysis）。

---

## 5. 手元で直す候補（コードを見ていないので、確認のうえで）

- `検査/評価/evals.json` の「日本語ナレーションを生成しようとする」の項は、規則9c の改訂（生成してよい）より前の書き方のままとメモにありました。9c に合わせて直す。
- 直前検査の禁止語に、`very slowly` と中身のない言葉（`cinematic`、`epic`、`masterpiece`、`4K`）を足すか検討する。ただし、規則を増やす6問の関門を通してから。前者は手元の失敗（動きが消えた）が根拠。後者は作り手の勧めで、傾向に近いので、注意（止めずに知らせる）にとどめるのが安全です。
- カメラの動きを2つ以上積んだときに、時刻つきの書き方にするか、注意を出す（3-1）。
- 照明のプリセットを、光源を物として書く文に変換する（3-3）。

---

## 出典
- Arcalea「Creative Brief」 https://arcalea.com/tools/creative-brief
- Wikipedia「Creative brief」 https://en.wikipedia.org/wiki/Creative_brief
- Milanote「Advertising brief template」 https://www.milanote.com/templates/advertising-brief-template
- Canny Creative「The Video Brief Template」 https://www.canny-creative.com/resources/the-video-brief-template/
- Content Snare「Video production questionnaire」 https://contentsnare.com/form-templates/video-production-questionnaire/
- Wrapbook「Music video treatment template」 https://www.wrapbook.com/resources/music-video-treatment-template
- Robin Piree「How to Write a Music Video Treatment」 https://robinpiree.com/blog/how-to-write-music-video-treatment
- TikTok「Creative best practices for performance ads」 https://ads.tiktok.com/help/article/creative-best-practices
- ARIB「TR-B32 概要」 https://www.arib.or.jp/english/std_tr/broadcasting/desc/tr-b32.html
- 日本広告業協会「CM素材搬入基準」関連資料 https://www.jaaa.ne.jp/wp-content/uploads/2018/09/705e4a578fad74eafd3fabe482b4e15d1.pdf
- 総務省「映像表示手法の在り方」 https://www.soumu.go.jp/main_sosiki/joho_tsusin/policyreports/japanese/papers/press/Japanese/Housou/0626J16.html
- ScanNetSecurity「NHK の PR 映像が光点滅ガイドラインの基準を超える」 https://scan.netsecurity.ne.jp/article/2013/08/06/32228.html
- 京都府 CM 制作の提案要領 https://www.city.kyoto.lg.jp/hokenfukushi/cmsfiles/contents/0000212/212697/bessi2.pdf
- Stackmatix「Short-Form Video Ads in 2026」 https://www.stackmatix.com/blog/short-form-video-ads-performance-data
- Vidico「10 Best Creative Video Ads in 2026」 https://vidico.com/news/creative-video-ads/
- Higgsfield「Camera Controls」2026-10-22 閲覧 https://higgsfield.ai/camera-controls
- MiniMax「MiniMax-H3 prompt writing guide（base）」 https://huggingface.co/MiniMaxAI/MiniMax-H3
- Kling「VIDEO 3.0 Model User Guide」2026-02-06 https://kling.ai/quickstart/klingai-video-3-model-user-guide
- Runware「Seedance 2.5 Prompting」2026-08-07 https://runware.ai/docs/models/bytedance-seedance-2-5/guides/prompting
- Higgsfield「Seedance 2.5: Complete Prompting Guide」2026-08-13 https://higgsfield.ai/blog/seedance-2-5-prompting-guide
- Google Cloud「The ultimate prompting guide for Veo 3.1」2025-10-16 https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-veo-3-1
- Runway「Seedance 2.0 Prompt Guide」 https://runway.com/resources/seedance-2-0-prompt-guide
- smixs/visual-skills（Serge Shima、CC BY 4.0） https://github.com/smixs/visual-skills
- Higgsfield MCP `get_cost`（2026-10-22）
