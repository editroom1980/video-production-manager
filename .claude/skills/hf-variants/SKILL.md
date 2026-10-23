---
name: hf-variants
description: Plan several variants of a product CM or ad (different hooks, ad formats, audiences, aspect ratios) from product photos, draft them cheaply on Higgsfield and finish only the chosen ones. Use when the user asks for 複数パターン, ABテスト用の動画, フック違い, 商品CMをいくつか, or variants of an existing ad.
---

# 商品 CM の複数パターン

`docs/video-ai/11-claude-higgsfield-canvas.md` の §0（共通の決まり）、§2 ①、§4-3 に沿って進める。返答は日本語、太字や劇的な断定を避けた普通の文で。

## 手順
1. 受け取るもの: 商品の実物の写真、伝えたいこと、本数、縦横、媒体、予算。足りなければ一度だけまとめて聞く（11 §0 の5）。
2. 変える軸を決めて案を出す（フック、広告の形式、相手、トーン、縦横）。軸に迷ったら、最初の候補として3方向を示す: スタジオで撮ったような商品映像／価格と機能を前に出した SNS 広告／実際に使う場面（11 §4-3）。A/B テスト用なら縦型（9:16）も。形式は `docs/video-ai/visionreel-提案.md` の2章と `09-genre-playbook.md` を参照。案は表にして、選んでもらう。
3. 選ばれた案ごとに、`video-prompt` スキルの決まりでプロンプトを書く。商品は「参照のとおり」と書き、文字は崩さない指示を添える。
4. 当たりの見積もり: `seedance_2_0_mini` 4秒 480p を案の数だけ。`get_cost: true` で1本ずつ引き、合計を示す。
5. 生成は承認のあと。手元では VISIONREEL の承認待ちに置く（`visionreel_request_generation`）。VISIONREEL が無ければ、承認を得てから生成のまとめ投入で。
6. 当たりを見て、良い案だけ `seedance_2_5` の下書き（480p）→ 承認 → 1080p に仕上げる。
7. 既存の広告の冒頭・最後だけを変えるなら Ad Multiplier（`get_workflow_instructions` の `ad-multiplier`、sections）。静止画のバナーも要るなら `ads-studio`。

## 守ること
- 商品・ロゴ・文字は実物の写真と照合し、1か所でも違えば使わない（規則9b）。
- 曲は生成させない（`No music`）。
- 効果を言い切る表現や比較は、根拠の確認を勧める（法的な判断はしない）。
