# AI動画で成果を出している作り手と、その手順・スキル

2026-10-22 に調べたものです。手元の環境（Higgsfield ＋ Claude、CM と地域番組）で役に立つ順に並べています。

根拠: ✅ 確認済み（公式・本人）／ ⚠️ 第三者の記事（宣伝を含む）／ ❔ 未確認

## A. そのまま使える・取り込めるスキルと講座

### 1. smixs/visual-skills（Serge Shima）
- 何か: Claude Code などで使える、映像の演出用スキルの組。`video`（動画のプロンプト）と `image`（静止画のプロンプト）の2つ ✅
- 規模: GitHub のスター 552、2026-08-04 に Seedance 2.5 の資料を追加 ✅
- 中身（役に立つもの）:
  - 場面の式: プロンプトを書く前に「欲しいもの、障害、位置関係、視線、リズム」を1文ずつ決める
  - 細部の決まり: 1ショットに「環境からの圧力1つ、体の小さな動き1つ、音か絵の手がかり1つ」
  - ショットの仕事: 感情を変える／行動を進める／圧力を上げる、のどれもしないショットは切る
  - 編集の階段: ショットをだんだん短くし、一度止めてから山場。止めが速さより大事。15・30・60・90秒の配分例つき
  - 禁止語: `cinematic`、`epic`、`dynamic camera` のような、中身のない言葉を使わない
  - ショットカード: 1ショットにつき14項目（画角、カメラ、動く理由、視線の流れ、音など）
  - 書き出す前に、演出の6点チェックと細部の3点監査を通す
  - Seedance 2.5、Kling 3.0（Turbo・Omni）、Veo 3.1 の正確な書き方と、よくある失敗の直し方
- 使い方: `/plugin marketplace add smixs/visual-skills`、または `video` と `image` のフォルダを `.claude/skills/` に写す
- 条件: CC BY 4.0。商用利用・改変は可。作者名（Serge Shima）の表記を残す必要がある
- 手元への使いどころ: `video-prompt` スキルに「場面の式」「ショットの仕事」「禁止語」を取り込むと、CM の質を上げやすい
- 出典: https://github.com/smixs/visual-skills

### 2. Higgsfield Academy（Higgsfield 公式、無料）
- 何か: Higgsfield 公式の無料講座。長編『Hell Grind』のプロンプト、人物の設定画、カメラの指示、つながりのメモを教材として公開している ✅（TheWrap、2026-08）
- 「Build an Ultra-Realistic Short Film in 4K」の流れ（講座の各回の題から）✅:
  1. 監督として考える → 2. 見本の短編を見る → 3. 物語の構造で脚本を書く（Claude）→ 4. Soul Cinema で人物の設定画 → 5. 場所は3/4の角度で作る → 6. プロンプトを組み立てるスキルで Seedance の最初の生成 → 7. 失敗したテイクを読む → 8. ダッチアングルと、テイクの組み合わせ → 以降、マッチカット、手のリアルさ、スピードランプ、whip pan と読める文字、回想のための人物の年齢変更、ナレーションの演出、最後の場面を3ショットで
- 「The AI Filmmaking Pipeline」は Claude Cowork を使う前提の講座と報じられている ⚠️（中身は未確認 ❔）
- 手元への使いどころ: 手元と同じ Higgsfield ＋ Claude の構成。「失敗したテイクを読む」「テイクの組み合わせ」「whip pan と読める文字」は、07 の未確認項目を確かめる材料になる
- 出典: https://higgsfield.ai/academy/courses/santiago-cinematic/emotional-short-film-showcase 、 https://thewrap.com/creative-content/movies/create-ai-movies-for-free-higgsfield-academy

### 3. jnMetaCode/ai-shortfilm-prompts
- 何か: 案から動画のプロンプトを作る Claude Code スキル。短編『Zombie Scavenger』（Mx-Shell、下の 8）の作り方をまとめたと作者は述べている ✅（作者の主張。実際に同じ手順かは ❔）
- 規模: スター 480、MIT ライセンス。ただし Mx-Shell の元のプロンプトは著作権あり、商用利用は要連絡 ✅
- 中身:
  - 5段の構成: テーマ（スタイルの言葉3〜6個）→ 人物と場面 → 雰囲気と画質 → カメラの決まり → 秒ごと・ショットごとの絵コンテ
  - ジャンル別のテンプレート21種（車の CM、ミュージックビデオ、ドローン、ダンスなど）、カメラの動き50種
  - 実在のカメラとレンズの名前で書く（「cinematic」ではなく、カメラ本体・35mm・f/4 など）
  - 傷や汚れなどの不完全さを書く。終わりは台詞も爆発もない「空の終わり」にする
  - モデルごとの落とし穴: Kling は禁止語の検閲で全体が弾かれることがある、Veo のネガティブ欄は名詞だけ、など
  - 10項目の自己チェック
- 出典: https://github.com/jnMetaCode/ai-shortfilm-prompts

### 4. gbeyrouti/seedance-prompting-claude-skill
- 何か: Seedance 2.5 / 2.0 用の Claude スキル。説明はフランス語、出力は英語 ✅
- 規模: スター 7、MIT。利用者が少ないので、取り込む前に中身を確かめる必要がある
- 中身:
  - 6つの区画: 被写体、動作、場所、スタイル、カメラ、音
  - 8〜10秒を超えると人物がずれやすいので、段に分け、各段の終わりの体と気持ちの状態を書く
  - 除外の指示が効くのは、素材・音・製造上の欠陥まで。目に見える物や絵の欠陥には効きにくいので、「ぼけない」ではなく「くっきり」と書く
  - 手持ちのスマホ動画らしく見せる7段の手順（UGC 向け）
  - 症状から直し方を引く表（中身は未確認 ❔）
- 出典: https://github.com/gbeyrouti/seedance-prompting-claude-skill

## B. 作り手の手順

### 5. PJ Accetturo（PJ Ace、Genre.ai）
- 実績: Kalshi の CM を Veo 3 で作り、NBA ファイナルの中継で放送（2025-06）✅（本人のニュースレター）
- 手順 ✅（本人、2025-06-11）:
  1. 脚本は自分で書く（参考作品を見てから）
  2. Gemini か ChatGPT に、各ショットを Veo 3 のプロンプトに変換させる。条件は「前後のショットを知らない前提で、各プロンプトが単独で場面を説明しきること」。場所・人物・トーンを毎回書き直す
  3. 一度に変換させるのは3〜5本まで（多いと質が落ちる）
  4. 3つの窓で同時に生成し、結果を見て直したいことを言葉で伝え、LLM に直したプロンプトを作らせる。その間に次のショットを進める
  5. 300〜400回の生成で、使えるのは15クリップ
  6. 編集ソフトでつなぐ
- 音のコツ: プロンプトに BGM を書かせない（大きく混ざる）。Veo の音は薄いので、圧縮と低音を足す。訛りは名前を何度か繰り返す
- 画のコツ: アップスケールで顔が崩れたので、フィルムグレインでごまかした
- 解決できなかったこと: 「字幕なし」と書いても字幕が出た
- 本人の言葉: 「プロンプトは過大評価されている。大事なのは物語」 ⚠️（インタビュー）
- 出典: https://pjace.beehiiv.com/p/i-can-t-believe-disney-allowed-us-to-run-this-ai-ad-during-the-nba-finals-f77e73388ab4ca62

### 6. Higgsfield の「音を先に作る」手順（Higgsfield 公式、2026-09-01）
- 手順 ✅: 道具を決める → 参照画像（人物・商品・場所）を作る → 声・台詞・曲を先に作る → その音と参照画像を渡して動画を作る（Seedance 2.5 など）→ 細部は Genjutsu で部分修正 → 確認して書き出す
- 理由: 音の長さが、各ショットをどれだけ保つかを決めるため
- 手元の規則との関係: 台詞を先に作って `audio_references` で渡す手元のやり方と同じ考え方。曲は手元では生成しないので、支給の曲を先に決めて尺を合わせる形になる
- 出典: https://higgsfield.ai/blog/generate-voice-edit-ai-video-one-place

### 7. Higgsfield コンテストの受賞作（『Grandma vs Wasp』、賞金15万ドル）
- 手順 ⚠️（宣伝の投稿。受賞者名も記事によって食い違う）:
  Sora 2 で雰囲気を試す（ラフな絵コンテ代わり）→ Nano Banana で人物のデザインを固める → 場面ごとに3×3のグリッド（9コマの絵コンテ）を1枚の画像で作り、構図を決めてから生成 → 動きの大半は Kling → 速いアクションは Seedance → Cinema Studio で人物の参照と仕上げ
- 3×3 グリッドの手法 ⚠️: 1枚の画像に9つの角度を並べて描かせ、使うコマを選ぶ。コマは切り抜かずにアップスケールしてから動画にする。各コマで人物や照明がずれることがあるので、1コマずつ確かめる
- 出典: https://www.linkedin.com/posts/deykhan_two-creators-won-150000-with-this-2-min-activity-7454662310293471232-K1LS 、 https://help.morphic.com/workflows/storyboarding/storyboarding-using-a-grid

### 8. Mx-Shell『Zombie Scavenger』（中国・雲南の個人）
- 実績: 3分の短編。PJ Ace が「ここ数年で最高の短編の1つ」と評した（2026-05-10）⚠️
- 手順 ⚠️: Seedance 2.0。参照画像や開始・終了のフレームはほとんど使わず、文章だけで生成。10日、約400ドル。修正は200回以上。15秒の1ショットに丸1日かけたものもある
- 出典: https://www.kucoin.com/news/flash/ai-short-film-zombie-scavenger-sparks-industry-disruption-with-400-production-cost

### 9. Higgsfield『Hell Grind』（長編）
- 規模 ⚠️: 最初の25分に1万6千回以上の生成で、使ったのは253ショット。プロンプトは1本あたり約3,000語で、3D と映画的な制約を入れた。費用は50万ドル未満（うち計算が約40万ドル）、生成は14日
- 評価: 批評家の多くは否定的（絵が作り物っぽい、物語が弱い）⚠️
- 学べること: 生成の量で物語の弱さは補えない。教材は Higgsfield Academy で公開されている（上の 2）
- 出典: https://letsdatascience.com/news/higgsfield-debuts-95-minute-ai-generated-feature-54064725 、 https://runtimewire.com/article/higgsfield-ai-hell-grind-ai-film-alex-mashrabov

### 10. Runway AI Film Festival 2026 の受賞作
- グランプリ: Robert Gaudette『A Face Only A Mother Could Love』✅（Runway 公式）
- 手順 ⚠️: 30秒以上の場面を、ショットが合うまで大量に生成して組み立てた（THR の報道とされる。未確認）
- 広告部門の最優秀: UNVEIL® の Salomon のキャンペーン ✅
- 出典: https://aif.runway.com/

### 11. The Dor Brothers（ベルリンの映像スタジオ）
- 手順 ⚠️: ChatGPT などで案からプロンプトを作る → Midjourney などで画像 → Runway や Veo で動画 → 満足するまで生成し直し、良いものを通常の編集ソフトでつなぐ。レトロなフィルターで粗を隠す
- 実績: 商業案件で年間100万ドル超の売上 ⚠️（NYT）
- 出典: https://www.deeplearning.ai/the-batch/meta-google-and-other-giants-slice-up-text-to-video 、 https://thenightly.com.au/from/the-new-york-times/the-new-york-times-how-a-video-studio-embraced-ai-and-stormed-the-internet-c-19429091

### 12. Hashem Al-Ghaili
- 手順 ⚠️: 『The Visitors』を8時間で作った。Veo 3（映像）、ElevenLabs（声）、Suno（曲）、ChatGPT（脚本かプロンプト）
- 出典: https://media-and-learning.eu/type/tools/google-veo-3-a-next-step-in-ai-generated-video/

### 13. Rory Flynn（Systematiq）
- 手法 ⚠️: 広告の画像を、ショットの種類・被写体・環境・レンズ・照明の部品で組み立てる。ChatGPT でプロンプト作りを仕組みにする。動画（Seedance など）の具体的な手順は見つからなかった
- 出典: https://adworldprime.com/speaker/roryflynn 、 https://systematiq.beehiiv.com/p/kling-2-o-wow-multiple-consistent-character-workflow

## C. 日本の作り手・記事

### 14. Claude Code × Higgsfield MCP で30秒の動画（deliciousnotes、2026-06-26）
- 手元とほぼ同じ構成の実例 ⚠️
- 手順: Higgsfield の MCP を Claude Code に登録 → GPT Image 2 で設定画 → Seedance 2.0 で15秒を2本 → ffmpeg でつなぐ → 曲を合成 → YouTube に上げる。指示は日本語だけ
- 役に立つ点:
  - ロゴは、後から貼るより、本物のロゴ画像を渡して「スーツにプリントして」と生成させたほうが自然だった（手元の規則 9b の「写真を渡して生成し、照合する」と同じ方向）
  - 自動審査で、問題のない構図でも弾かれることがある。引きや後ろ姿は通りやすく、正面のアップは引っかかりやすかった
  - 勝手にプリセットを提案されたときは「通常生成で」と明示した
  - 同時に動かせる生成は8本まで
- 出典: https://www.deliciousnotes.com/hp-blog/claude-code-higgsfield-seedance-30s-movie/

### 15. かしお「AI動画はいきなり作り出さない」（note、2026-05-20）
- 手順 ⚠️: Claude でカット割り・効果・カメラワークを言葉にする → Higgsfield で最初のフレームの画像を作る → Seedance 2.0 で動画 → 微調整
- 役に立つ点: 動きが不自然なときは「ワンカットで撮影した」と書き足す。参考画像は Pinterest や Shotdeck で集める。人物の顔は Soul 2.0 / Soul Cinema で固定する
- 出典: https://note.com/kasio_aio/n/nfebdef7ad2d0

### 16. AI動画広告の作り方（Kling 3.0 と Seedance 2.5 の比較、lifrell-tech）
- 手順 ⚠️: 先に人物の静止画で見た目を決め、動きが必要なカットだけ動画にする。サービスの画面は実際の画面の録画を合成する。その案件では Kling 3.0 のほうが指示どおりに動いた
- 出典: https://lifrell-tech.com/2090/

### 17. RKJ VIDEO（取り込み済み）
- 会話シーン、Katana、CM の広告の形式10種、プリビズ、配布スキル3つ、コードで作る映像。手元の資料に反映済み

## D. 調べたが確かめられなかったもの ❔

- 学習向けの YouTube チャンネル（Theoretically Media、Tao Prompts、Curious Refuge、MattVidPro など）は名前が知られているが、今回の検索では2026年の手順を確かめられなかった
- Henry Daubrez（Veo の短編『Kitsune』）、Paul Trillo、Dave Clark（Promise）の手順は、一次資料が見つからなかった
- 「Sora は2026年3月に提供終了」という記事がある ⚠️（mstudio ほか）。Higgsfield の一覧に Sora がないことと合っているが、OpenAI の発表は確かめていない

## E. 共通している手順（多くの作り手に見られるもの）

1. 物語と脚本が先。プロンプトの書き方より物語が効く（PJ Ace、Hell Grind の評価）
2. ショットの一覧を LLM でプロンプトに変換する。各プロンプトは単独で読んで分かるように、場所・人物・トーンを毎回書く（PJ Ace）
3. 人物の設定画と場所の画像を先に作り、参照として使い回す（Higgsfield の講座と CM 解説、かしお）
4. 3×3 のグリッドで構図を先に決める（コンテストの受賞作）
5. 音を先に作り、その長さに絵を合わせる（Higgsfield 公式）
6. 使うクリップ1本あたりの生成回数は多い。PJ Ace は約20〜27回、Hell Grind は約63回。見積もりにはこの比率を入れる
7. モデルを使い分ける（動きは Kling、速いアクションは Seedance、など）
8. 失敗したテイクを読んで原因を言葉にし、プロンプトを直す（Higgsfield の講座、PJ Ace）
9. 粗はフィルムグレインやレトロな質感で目立たなくする（PJ Ace、Dor Brothers）

## F. 手元に取り込む候補（提案）

まだ取り込んでいません。採用するものを決めてから、資料とスキルに反映します。

| 候補 | 中身 | 手間 |
|---|---|---|
| F1 | `video-prompt` スキルに、smixs の「場面の式」「ショットの仕事」「禁止語」「細部の決まり」を足す（CC BY 4.0、作者表記が必要） | 小 |
| F2 | 「各プロンプトは単独で読んで分かるように書く」を 01 の原則に足す（PJ Ace） | 小 |
| F3 | 04 の工程に「音を先に決める」と「3×3 グリッドで構図を決める」を足す | 小 |
| F4 | 04 の見積もりに「使う1本あたり20〜60回の生成」の目安を足す | 小 |
| F5 | smixs/visual-skills を、そのまま手元のスキルとして入れる | 中（中身の確認が必要） |
| F6 | Higgsfield Academy の講座を受け、07 の未確認項目と照らし合わせる | 手元で |
