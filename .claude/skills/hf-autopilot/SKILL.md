---
name: hf-autopilot
description: Run unattended, scheduled video work (daily trend research, idea shortlists, scripts and prompts, cost estimates, new-product-folder checks) that stops before any credit is spent and reports for human approval. Use when the user asks for 毎朝, 定期的に, 自動で回す, 寝ている間に, スケジュール実行, Dots のように, or wants a recurring Higgsfield job set up.
---

# 定期実行で、承認の手前まで進める

`docs/video-ai/16-chatgpt-dots-to-claude.md` の §2 に沿って進める。返答は日本語、普通の文で。

## 守ること（最優先）
- 生成（クレジットを使う操作）はしない。`generate_*` は `get_cost: true` の見積もりだけ。`execute_preset`、`ai_influencer_generate`、`dubbing`、`remove_background` など、課金のある道具も呼ばない。
- `get_cost: true` は必ず `params` の中に入れる（`{"params": {"model": ..., "get_cost": true}}`）。`params` の外に置くと無視され、そのまま生成されて課金される（2026-10-27 の定期実行で起きた。30 クレジット）。返りに `id` と `status: pending` が出たら見積もりではなく生成なので、すぐ依頼者に知らせる。
- 1回の実行で見積もる合計は、頼まれた上限まで（指定が無ければ100クレジット）。
- 結果は「承認待ち」として残す。手元では VISIONREEL の承認待ちに置く（`visionreel_request_generation` など）。それが無ければ、報告ファイルか通知で知らせる。

## 設定するとき
1. 3点を聞く（足りないものだけ）: 何を作るか／いつ・どのくらいの頻度で／どこで人に確かめるか（必ず生成の前）。
2. 置き場を選ぶ:
   - Mac を閉じていても動かすなら、クラウドの定期実行。使うコネクター（Higgsfield、Google Drive）を作るときに指定する。
   - 手元の素材や VISIONREEL を使うなら、Mac の `claude -p` を launchd で回す。
3. 定期実行に渡す指示文は、それだけ読んで分かるように書く。このスキルの名前、上限、止める所を必ず入れる。
4. 設定は、依頼者が頼んだときだけ作る。作ったら、名前・時刻・止める所を一言で伝える。

## 1回の実行ですること（例: 毎朝のネタ出し）
1. 調べる: AI 動画と案件の分野の新しい話題（出典の URL と日付を残す）。
2. ネタを3つ出し、伸びそうな理由を一言ずつ。いちばん良い1本を選ぶ。
3. 台本とカット割り、カットごとのプロンプトを書く（`video-prompt` スキルの決まり）。
4. カットごとに `get_cost: true` で見積もり、合計を出す。
5. 報告を残す: ネタ3つ、選んだ理由、台本、プロンプト、見積もり、承認したら何が起きるか。

## フォルダを見る型（例: 新商品の写真が入ったら）
- 前回の実行時刻を記録しておき、それより新しいファイルだけを扱う。
- 商品の写真ごとに、広告の型（`hf-variants` の3方向や4形式）を決め、最初のコマの静止画の案と動画の見積もりを出す。動画にするのは、人が静止画を承認したあと。
