---
name: hf-model-compare
description: Compare 2-3 Higgsfield video models on the same scene with the same prompt and references at cheap settings, then record which model suits which shot type. Use when the user asks どのモデルがいいか, 作り比べ, モデル比較, シネマティックな映像をどれで作るか, or wants to pick a model for a project.
---

# 同じ場面をモデルで作り比べる

`docs/video-ai/11-claude-higgsfield-canvas.md` の §0 と §4-4 に沿って進める。返答は日本語、普通の文で。

## 手順
1. 比べる場面を1つ決める（動きの多いカットか、静かなカットか）。足りないことは一度だけまとめて聞く。
2. 候補を2〜3つ選ぶ。`models_explore` の `get` で、尺・解像度・渡せる素材を確かめる。`docs/video-ai/02-models.md` と `04-workflow.md` §4 の目安を使う。
3. プロンプトを1本書く（`video-prompt` スキル）。モデルごとの書き方のくせに合わせて言い回しだけ直し、中身と参照は揃える。
4. 揃えた安い設定（例: 5秒、480p〜720p）で、各モデルの `get_cost: true` を並べ、合計の承認を取る。手元では VISIONREEL の承認待ちに置く。
5. 承認のあと生成する。結果から十数コマを切り出して並べる。
6. 表で比べる: 動きの滑らかさ、構図、人物の安定、指示への従い方、文字・ロゴ、費用。良し悪しの理由を一言ずつ添える。
7. 結果を `docs/video-ai/07-unverified.md` の該当する項目（M3 など）に書き、決まったことを 02 と 04 §4 に書き戻すよう提案する。

## 守ること
- 1回の比べで分かるのはその場面のことだけ。ほかの場面にも当てはまるとは書かない。
- 安い設定と本番の設定で結果が変わることがある（07 の M1、W3）。
