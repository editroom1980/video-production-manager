---
name: hf-motion
description: Make a motion-graphics shot or spot (animated text, logos, numbers, diagrams over moving backgrounds) by coding the text layers and generating only textless backgrounds on Higgsfield. Use when the user asks for モーショングラフィックス, テキストアニメーション, アプリやサービスの説明CM, or a typography spot.
---

# モーショングラフィックス

`docs/video-ai/11-claude-higgsfield-canvas.md` の §0 と §2 ②、`09-genre-playbook.md` の ⑤ に沿って進める。返答は日本語、普通の文で。

## 手順
1. 伝えること、尺、縦横、ブランドの色（3色: メイン・アクセント・背景）、文言を決める。
2. 秒単位の区切り表を作る（何秒に色が変わる、図形が弾ける、文字が出る）。
3. 文字・ロゴ・数字・図解はコードで作る。手元にコードで作るカットのスキル（code-motion）があればそれを使う。無ければ Higgsfield の `video-editing` ワークフロー（Higgsedit）を `get_workflow_instructions` で読んで使う。
4. 動きのある背景だけを生成する場合:
   - `marketing_studio_v2_video` の `type: 2d_motion` か `hypermotion`（5〜15秒）。テンプレートは `get_presets`（`source: marketing_studio`、`category: motion`）で選ぶ。
   - または `seedance_2_5` / `minimax_h3` で文字なしの背景。プロンプトに区切りの時刻を書く。
   - どちらも `get_cost: true` で見積もり、承認のあと（手元は VISIONREEL の承認待ち）。
5. 背景の上に、区切りの時刻に合わせて文字を重ねて書き出す。サイズ違いは書き出し設定か `reframe`。

## 守ること
- 映像と文字は切り離す。コピーの修正は文字の差し替えだけで済むようにする。
- ロゴは支給データを使う（規則9b）。
