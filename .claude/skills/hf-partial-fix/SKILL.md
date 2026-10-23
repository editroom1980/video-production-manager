---
name: hf-partial-fix
description: Fix only the broken part of an AI-generated clip (a bad hand, a flicker, a wrong object for a few seconds) by cutting that segment out, editing it with Seedance 2.5 video_edit or Kling 3.0 Omni Edit on Higgsfield, and splicing it back. Use when the user says ここだけ直したい, 一部だけ作り直したい, 手だけおかしい, or 部分修正.
---

# 作った動画の一部だけ直す

`docs/video-ai/11-claude-higgsfield-canvas.md` の §0 と §2 ④ に沿って進める。返答は日本語、普通の文で。

## 手順
1. 崩れた所を特定する。完成動画から十数コマを切り出して並べ、崩れている秒数と内容を書く（例: 3.0〜5.0秒、右手の指が6本）。
2. 直す区間を ffmpeg で切り出す。前後に余白を足し、4秒以上にする（Seedance 2.5 の下限）。切る位置は動きの途中に。
3. 直し方を選び、`get_cost: true` で見積もる:
   - `seedance_2_5`、`mode: video_edit`（料金は渡した区間の長さぶん）。プロンプトは元の動画を直接指す: 「In @Video 1, change only {直す所} to {直したい形}; keep everything else unchanged.」
   - `kling_video_edit`（Kling 3.0 Omni Edit）。文章の指示と、必要なら参照画像。
4. 承認のあと直す（手元は VISIONREEL の承認待ち）。
5. ffmpeg で、直した区間を元の動画に差し込む。つなぎ目は数フレーム重ねる。
6. もう一度コマを切り出し、直った所とつなぎ目を確かめる。直らなければ、区間を短くするか、もう一方の直し方を試す（同じ指示を繰り返さない）。

## 守ること
- 直す所以外を変えない指示を必ず入れる。
- 商品・ロゴが写る区間は、直したあとも実物の写真と照合する（規則9b）。
