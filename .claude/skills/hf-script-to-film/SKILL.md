---
name: hf-script-to-film
description: Turn a synopsis or rough script into a short AI film or drama on Higgsfield - script, shot list, character sheets, keyframes, voices, shots, assembly - with approval gates. Use when the user asks for AI映画, ショートドラマ, 再現ドラマ, 脚本から映像, or 物語の動画.
---

# 脚本から AI 映画

`docs/video-ai/11-claude-higgsfield-canvas.md` の §0 と §2 ③ に沿って進める。返答は日本語、普通の文で。

## 手順
1. あらすじか脚本を受け取り、台本の形に整える（場面、台詞、秒数の目安）。物語が先。誰に何を感じてほしいかを一言で書く。
2. 場面ごとにショット一覧を作る。`.claude/skills/visual-video/references/dramaturgy.md` と `role-modes.md` の型で、各ショットの仕事と最後の絵を決める。
3. 主人公を最初に固める（ここに一番時間をかける。18 §4）。続けて人物の設定画: Higgsfield の `character-sheet` ワークフロー、`ai_influencer_prepare`（見積もりだけ。1枚 1.125 前後。承認のあと `ai_influencer_generate`）、または `visual-image` スキル。繰り返し使う人物は `manage_reference_elements` で要素にする。三面図は参照に使い、開始の画像にはしない。
4. 場所の画像と、各ショットの元になる画像を作る。ここで承認を取る（動画にする前に）。
5. 声と曲を決める。台詞は ElevenLabs v4（1句3テイク以上、数は仮名、伸縮しない）。曲は支給か許諾済み。
6. ショットごとに動画にする。構図と人の動きを見せる作品では、カメラ固定（`static camera`）を基本にし、動かすのは意図があるときだけ。長い1本を何度も作り直すより、短くうまくいったクリップを `video_extension` で延ばす。人物が続く場面は Seedance 2.5 の参照で。1本で作るか分けるかは、人物の一貫性と直しやすさで決める。会話は台詞を1行ずつ `audio_references` で。
7. 下書きで通し、承認のあと本番。どの生成も `get_cost: true` で見積もり、手元では VISIONREEL の承認待ちに置く。
8. つなぐ（手元の編集ソフト、または Higgsfield の `video-montage` ワークフロー）。完成後、十数コマを切り出して検品する。

## 守ること
- 実在の人物・有名人に似せない。特定の作品の「〇〇風」にしない。
- 公開するときは、AI 生成の開示を確かめる（YouTube、EU 向けの配信）。
