---
name: hf-batch
description: Produce many videos of a fixed format on Higgsfield from a project sheet (one row per video) - estimate every row, get one approval for the total, submit in batches, then download, rename by rule, sort into folders and log each row. Use when the user asks 同じ形式で何本も, まとめて生成, 一括で作って, 量産, or to rename and sort generated files.
---

# 決まった形の動画を繰り返し作る

`docs/video-ai/11-claude-higgsfield-canvas.md` の §0 と §4-5 に沿って進める。返答は日本語、普通の文で。

## 手順
1. 指示書を受け取る（1行が1本: 案件、カット番号、商品・人物、縦横、秒数、モデル、プロンプトの元、参照素材）。無ければ Claude が表を作り、確かめてもらう。
2. 各行のプロンプトを `video-prompt` スキルの決まりで書く。1本ずつ単独で読めるように。
3. 見積もり: 各行の `get_cost: true` と合計を表で示し、まとめて承認を取る。承認した合計を超えない。手元では VISIONREEL の承認待ちに1行ずつ置く。
4. 生成: 承認のあと `generate_video_batch`（1回に2〜12本）→ `jobs_wait`。失敗した行は理由を記録し、作り直すかは聞く。
5. 保存と名前: `{案件}_{カット番号}_{モデル}_{秒数}s_t{テイク}.mp4` の形に付け直す（案件の決まりがあればそちらを使う）。手元は VISIONREEL の `素材/` に、Higgsfield 側は `create_folder` のフォルダに振り分ける。
6. 記録: 行ごとにプロンプト、モデルと設定、参照とその役割、ジョブ ID、保存先、費用を残す（`docs/video-ai/04-workflow.md` §7）。
7. 検品: 十数コマを切り出して並べ、文字・ロゴ・商品を実物の写真と照合する（規則9b）。

## 商品の一覧から全商品の動画を作るとき（16 §1 ⑫）
- 一覧の表は「商品名・写真・特徴・価格」の4列があればよい。
- カテゴリーごとに元になる広告を1本だけ作り、承認する。その1本を `hf_mult_replace_object`（`hf-remix` スキル）で商品だけ差し替える。
- フック違いは `ad_multiplier_v2`（`mode: sections`、`section: hook`）、言語違いは `hf-localize`。掛け算で本数が増えるので、合計の見積もりを必ず先に出す。
- 価格・商品名・数字は映像に生成させない。テロップで後から入れる。

## 守ること
- 最後の確認と仕上げの編集は人が行う。
- 曲は生成しない。
