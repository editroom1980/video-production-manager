# Topview Canvas の5つの使い方を、Claude と Higgsfield で行う

出典: YouTube「【2026年最新版】Topview Canvasを使った最新Seedance2.5の活用5選と完全自動化ワークフローを解説します」（チャンネル「動画編集の中の人」、2026-09-03 公開、12分40秒、Topview の紹介リンクつき） https://www.youtube.com/watch?v=ze9HHzP3a6s 。依頼者が文字起こしを貼ったもの（2026-10-23）。
Higgsfield 側の機能は、2026-10-23 に `models_explore` / `get_workflow_instructions` / `get_cost` で確かめた（✅）。

## 0. 共通の決まり（どの使い方でも）

1. 生成（クレジットを使う操作）は、費用を見積もって人が承認してから。手元では VISIONREEL の承認待ち（`visionreel_request_generation` などの道具）に置き、Higgsfield を直接叩かない。VISIONREEL が使えない場所では、`get_cost: true` の見積もりを示して承認を取る
2. 当たりは安いモデルで、本番だけ高いモデルで（動画の「共通テクニック1」）

   | 段 | Higgsfield のモデル | 費用の目安（2026-10-23 の `get_cost`） |
   |---|---|---|
   | 当たり（構図と動き） | `seedance_2_0_mini` 4秒 480p | 2 |
   | 当たり（参照が多い・2K の質感） | `minimax_h3` 4秒 | 8 |
   | 下書き（本番と同じモデル） | `seedance_2_5` 5秒 480p `draft: true` | 15 |
   | 本番 | 下書きの `draft_job_id` で `seedance_2_5` を 1080p に仕上げる | `get_cost` で確認 |

   Seedance 2.5 の下書きは、7日以内なら同じジョブを 1080p に仕上げられる ✅。当たりを Mini で作った場合は、本番で絵が変わることがある（07 の M1）
3. 生成の前に必ず費用を見る（動画の「共通テクニック2」）。`get_cost: true` は、ジョブを送らずに費用だけを返す ✅
4. うまくいった流れは、スキルとして保存する（5章）

## 1. 対応表

| Topview Canvas の機能 | Claude と Higgsfield での代わり | スキル |
|---|---|---|
| AI エージェントと会話しながら作る | Claude Code ＋ Higgsfield の MCP（手元は VISIONREEL の MCP も） | — |
| 工程がキャンバスに地図のように残る | VISIONREEL の「関係図」（資産 → カット → プロンプトの版 → テイク）。Higgsfield 側はフォルダとプロジェクト | — |
| 生成ボタンの横に費用が出る | `get_cost: true`、VISIONREEL の承認待ちの札 | すべて |
| ① 商品 CM の複数パターン | Claude が案を出し分け → 生成のまとめ投入。Marketing Studio の動画（1回に1〜4本）、既存の広告から作り直す Ad Multiplier、静止画広告の Ads Studio | `hf-variants` |
| ② モーショングラフィックス（テンプレート、4〜120秒） | 文字・ロゴ・図解はコード（手元の code-motion か Higgsfield の編集ワークフロー Higgsedit）。動きの背景は Marketing Studio の `2d_motion` / `hypermotion`（5〜15秒）か Seedance 2.5 / MiniMax H3 で文字なしに作る | `hf-motion` |
| ③ 脚本から AI 映画 | Claude が脚本 → 場面 → ショット一覧 → 人物の設定画 → 元になる画像 → 動画 → つなぎ。演出は `visual-video`、静止画は `visual-image` | `hf-script-to-film` |
| ④ 作った動画の一部だけ直す | 崩れた区間を切り出し、Seedance 2.5 の `video_edit` か Kling 3.0 Omni Edit で直して、元に戻す | `hf-partial-fix` |
| ⑤ うまくいった流れをスキルとして覚えさせる | Claude のスキル（`.claude/skills/<名前>/SKILL.md`） | `workflow-to-skill` |
| MCP で名前を付けてフォルダに保存 | VISIONREEL の置き場（`素材/`、`完成素材/`、生成ログ）。Higgsfield 側は `create_folder` など | — |

## 2. 使い方ごとの手順

### ① 商品 CM の複数パターン（`hf-variants`）
1. 商品の写真（実物）と、伝えたいことを受け取る。写真は参照に使い、出た絵は写真と照合する（規則9b）
2. Claude が、変える軸を決めて N 案を出す。軸の例: フック（最初の2秒）、広告の形式（visionreel-提案.md の2章、09 の7ジャンル）、相手、トーン、縦横
3. 案ごとにプロンプトを書く（`video-prompt` スキルの決まりで。1本ずつ単独で読めるように）
4. 当たりを安く作る: `seedance_2_0_mini` 4秒 480p（1本 2）を N 本。合計を `get_cost` で示して承認
5. 良い案だけ本番: `seedance_2_5` の下書き → 1080p
6. 既にある広告から作るなら Ad Multiplier: 冒頭だけ（4〜15秒）・最後の呼びかけだけ（4〜5秒）の作り直し、人物や言語を変えた作り直し（Pro プラン以上）✅
7. バナーも要るなら Ads Studio（商品の URL か写真から、複数サイズの静止画広告）✅

### ② モーショングラフィックス（`hf-motion`）
1. 文字・ロゴ・数字・図解は生成しない。コードで作る（手元の code-motion。0クレジット）か、Higgsfield の編集ワークフロー（Higgsedit。文字、図形、キーフレーム、トランジション、2.5D カメラ）✅
2. 動きのある背景や質感だけを生成する:
   - Marketing Studio の `marketing_studio_v2_video`、`type: 2d_motion` か `hypermotion`（5〜15秒、1回に1〜4本、5秒で 29.8）✅。テンプレートは `get_presets`（`source: marketing_studio`、`category: motion`）で選ぶ
   - または `seedance_2_5` / `minimax_h3` で文字なしの背景を作る（Topview の動画でも、モーショングラフィックスに MiniMax H3 を挙げていた ⚠️）
3. 秒単位で動きの区切り（色が変わる、図形が弾ける）を決め、色は3色（メイン・アクセント・背景）に絞る（09 ⑤）
4. 文字を、区切りの時刻に合わせてコードで重ねる。サイズ違いはリフレーム（`reframe`）✅ かコードの書き出し設定で

### ③ 脚本から AI 映画（`hf-script-to-film`）
1. あらすじか脚本の書きかけを受け取る。Claude が台本の形に整える（場面、台詞、秒数の目安）
2. 場面ごとにショット一覧を作る（`visual-video` の role-modes.md と dramaturgy.md の型。ショットの仕事・最後の絵を決める）
3. 人物の設定画を作る（Higgsfield の `character-sheet` ワークフロー、または `visual-image`。三面図は参照に使い、開始の画像にはしない）
4. 場所の画像、各ショットの元になる画像を作り、ここで承認を取る（09 の5つの工程）
5. 声と曲を先に決める（台詞は ElevenLabs v4、曲は支給か許諾済み）
6. ショットごとに動画にする。人物が続く場面は Seedance 2.5 の参照で、1本で作る長さと分ける長さを決める（06 §6 の3）
7. つなぐ（手元の編集ソフトか、Higgsfield の `video-montage` ワークフロー）
- ナレーションが主の説明動画や物語動画なら、Higgsfield の `faceless-video` ワークフローも使える ✅

### ④ 一部だけ直す（`hf-partial-fix`）
1. 崩れた所を見つける: 完成動画から十数コマを切り出して並べる（10 §3）。崩れている秒数（例: 3.0〜5.0秒の手）を決める
2. 直す区間を切り出す: ffmpeg で、崩れた区間の前後に余白を足して切り出す。Seedance 2.5 は4秒以上なので、区間は4秒以上にする ✅（`seedance_2_5` は4〜30秒）
3. 直す:
   - `seedance_2_5` の `mode: video_edit`（料金は渡した動画の長さぶん ✅）。プロンプトは「@Video 1 の、{直す所} だけを {直したい形} にし、ほかはそのまま」と、元の動画を直接指して書く（Runway の Seedance ガイドの書き方）
   - または `kling_video_edit`（Kling 3.0 Omni Edit。文章の指示と参照画像で直す）✅
4. 元の動画に戻す: ffmpeg で、直した区間を差し込む。つなぎ目は動きの途中にし、数フレームの重ねで目立たなくする
5. 切り出したコマで、直った所と、つなぎ目を確かめる
- 費用の考え方: 全体を作り直すより、直す区間の長さぶんで済む。区間を短くするほど安い

### ⑤ うまくいった流れをスキルにする（`workflow-to-skill`）
1. うまくいった1本の流れを、Claude に振り返らせる（使ったモデルと設定、参照素材とその役割、プロンプト、何回目で通ったか、費用）
2. 迷った場面と、そこで選んだものを書き出す（09 §4.5: これが無いと自動化で止まる・質が落ちる）
3. `.claude/skills/<名前>/SKILL.md` に、決まった形で保存する（`workflow-to-skill` スキルの雛形）
4. 次の案件で、商品や人物を差し替えて使う。うまくいかなかった所は、スキルに書き足す

## 3. 料金の比べ方
- Topview の動画では、Seedance 2.5 の 720p が1秒あたり約19円、10秒で約190円と紹介されていた ⚠️
- Higgsfield では、`seedance_2_5` の 5秒 720p が 35 クレジット（1秒あたり 7 クレジット）✅。クレジットの円換算はプランで変わるので、ここでは書かない。比べるときは、手元のプランの1クレジットの値段で換算する
