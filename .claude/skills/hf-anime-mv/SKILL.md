---
name: hf-anime-mv
description: Make a short anime-style music video from a character image and a supplied song on Higgsfield - ask for tempo and cut count, time cuts to the beat, keep the character with references, draft cheaply, fix only failed cuts, and pass each cut's last frame to the next as the start image. Use when the user asks for アニメMV, キャラクターのMV, 静止画と曲から動画, 曲に合わせて動かしたい, or a lyric/music video with an original character.
---

# 静止画と曲からアニメ MV

`docs/video-ai/11-claude-higgsfield-canvas.md` の §0 と §4-2 に沿って進める。返答は日本語、普通の文で。

## 手順
1. 受け取るもの: 人物の元になる画像（三面図があれば一緒に）、使う曲。曲は支給か許諾済みに限る。曲は生成しない。
2. 足りないことを一度だけまとめて聞く: 曲のどの区間か（秒）、BPM、カット数、各カットの動き、縦横、予算。
3. カット表を作る: 1拍は 60÷BPM 秒。切り替えは小節の頭。各カットの秒数・動き・カメラ・最後の絵を表にする。4秒より短いカットは4秒で作って編集で切る。プロンプトは `video-prompt` スキルの決まりで（1カット1動作、曲は入れない）。
4. 人物を固定する: 人物の画像を `image_references` に入れる。繰り返し使うなら `manage_reference_elements` で要素にし、プロンプトに `<<<要素のID>>>` と書く（`@名前` は効かない）。三面図は参照に使い、開始の画像にはしない。
5. 見積もり: カットごとに `get_cost: true`、合計を示して承認を取る。手元では VISIONREEL の承認待ちに置く。
6. 当たり: `seedance_2_0_mini` 4秒 480p。動きと構図を見て、通ったカットだけ次へ。
7. 本番: `seedance_2_5` の `draft: true` → 承認 → `draft_job_id` で 1080p。`generate_audio: false`。
8. つなぎ: 前のカットの最後のコマを次の開始の画像にする。`ffmpeg -sseof -0.1 -i cutNN.mp4 -frames:v 1 -q:v 2 cutNN_last.png` → `media_upload` → 次のカットの `start_image`（`image_references` の人物と一緒に渡してよい）。MiniMax H3 は start_image と参照を同時に渡せない（422）ので使わない。続く動きなら `video_extension`（`extension_mode: forward`）も候補。
9. 崩れたカットだけ作り直すか、`hf-partial-fix` で区間だけ直す。
10. 編集で元の曲に合わせてつなぐ。十数コマを切り出して検品する（顔、衣装、指、文字）。

## 守ること
- 実在の人物や有名なキャラクターに似せない。特定の作品の「〇〇風」と書かない。
- 仕上げの編集と最後の確認は人が行う。
