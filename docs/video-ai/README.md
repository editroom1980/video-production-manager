# 動画生成AI ナレッジベース

EditFlow（動画編集工程管理）と手元の制作環境で使うため、動画生成AIのプロンプト技法・モデル別の特性・ワークフローを集めた資料です。
手元の生成は Higgsfield の MCP 経由で行う前提で、手元の規則（生成は承認を取ってから、実在の物は写真と照合、BGM は生成しない、など）に合わせています。

最終更新: 2026-10-24。動画生成AIは数か月単位で仕様が変わります。モデルの仕様は `models_explore`、費用は `get_cost`（どちらも無料）で、使う前に引き直してください。出典は各ファイルの末尾にあります。

根拠の印: ✅ 確認済み（公式）／ ⚠️ 第三者の記事／ ❔ 未確認／ 🔧 手元で確認（生成して確かめた）

## ファイル構成

| ファイル | 内容 |
|---|---|
| [01-prompt-fundamentals.md](01-prompt-fundamentals.md) | どのモデルにも通じるプロンプトの基本、カメラ・照明の語彙（日英対訳）、音、一貫性、実在の物と文字の扱い |
| [02-models.md](02-models.md) | Higgsfield で使えるモデルの仕様と使いどころ、メーカー別の書き方のくせ、作例 |
| [03-templates.md](03-templates.md) | そのまま使えるプロンプトテンプレート（情景、CM、商品の見せ場、会話シーン、締めのカットなど） |
| [04-workflow.md](04-workflow.md) | AI生成を取り入れた制作の流れ、音の流れ、モデル選び、費用を下げる工夫 |
| [05-editflow-integration.md](05-editflow-integration.md) | EditFlow に組み込むための機能案・データ設計 |
| [06-cm-techniques.md](06-cm-techniques.md) | CM の品質を上げる手法（商品の見せ方、人物の同一性、カメラワーク、締めのカット） |
| [07-unverified.md](07-unverified.md) | 生成で確かめないと分からないことの一覧（試すときは承認を取ってから） |
| [08-creators.md](08-creators.md) | AI動画で成果を出している作り手の手順と、公開されているスキル（役に立つ順） |
| [09-genre-playbook.md](09-genre-playbook.md) | ジャンル別の作り方7つ（アニメ CM、企業紹介・予告、POV、構造分解、モーショングラフィックス、アプリ広告、MV 風）と、つなぎ方・工程の土台 |
| [10-direction-qc-compliance.md](10-direction-qc-compliance.md) | ディレクションの言語化、作業の仕分け、検品のチェックリスト、権利と開示（文化庁・法務省・EU・YouTube） |
| [11-claude-higgsfield-canvas.md](11-claude-higgsfield-canvas.md) | Topview Canvas と Renoise AI の使い方を Claude と Higgsfield で行う手順（作る前に聞く、複数パターン、モーショングラフィックス、脚本から映画、一部だけ直す、スキル化、アニメ MV、モデルの作り比べ、まとめて生成と整理） |
| [12-visionreel-改善案.md](12-visionreel-改善案.md) | VISIONREEL の改善案（Cinema Studio 4.0 の欄、口合わせ、モデルの評価の更新、仕上げの道具、商品動画の公式の型18種、台帳の照合、FCPXML の書き出し） |
| [13-visionreel-UI調査.md](13-visionreel-UI調査.md) | VISIONREEL の UI 文言の置き換え表、用語集の追加、現場と生成 AI の用語の対応、使い勝手の改善案（課題の番号つき）、手法の画面への入れ方 |
| [開発チャットへの依頼.md](開発チャットへの依頼.md) | 開発のチャット（映像制作フォルダ）に渡す依頼をまとめたもの。取り込み、点検、機能の検討、生成が要る確認 |
| [visionreel-提案.md](visionreel-提案.md) | VISIONREEL への提案（企画の項目、広告の形式、カット設計の語彙、確かめる順と費用の目安） |
| [`/data/video-ai-prompts.json`](../../data/video-ai-prompts.json) | 語彙・モデル・テンプレート・工程の機械可読版 |
| [`/.claude/skills/video-prompt/SKILL.md`](../../.claude/skills/video-prompt/SKILL.md) | Claude Code 用スキル。「〇〇の動画プロンプトを書いて」で起動（入口はこれ） |
| `/.claude/skills/hf-variants/`、`hf-motion/`、`hf-script-to-film/`、`hf-partial-fix/`、`workflow-to-skill/`、`hf-anime-mv/`、`hf-model-compare/`、`hf-batch/` | 11 の使い方を行うスキル。生成は見積もりと承認のあと（手元は VISIONREEL の承認待ち） |
| [`/.claude/skills/visual-video/`](../../.claude/skills/visual-video/SKILL.md)、[`/.claude/skills/visual-image/`](../../.claude/skills/visual-image/SKILL.md) | 演出と静止画プロンプトの参考書。smixs/visual-skills（Serge Shima、CC BY 4.0）を取り込んだもの。`video-prompt` から読む |

## Claude Code での使い方

- プロンプトを作らせる: 「藤まつりのオープニング用に、kling3_0 向けのプロンプトを書いて」
  → `video-prompt` スキルがこの資料を読んで、モデルに合わせた形で出力します。生成はしません。
- 開発に使う: 「05-editflow-integration.md の案Cを実装して」
  → `data/video-ai-prompts.json` を読み込むプロンプトビルダーを `index.html` に追加する、といった形で進められます。

## 情報の更新

新しいモデルやガイドが出たら、`02-models.md` に節を追加し、`data/video-ai-prompts.json` の `models` も更新してください。
JSON の `updated` フィールドも書き換えると、古い情報の見分けがつきます。07 の項目を試したら、結果を書き込み、該当する資料の印を 🔧 に直してください。
