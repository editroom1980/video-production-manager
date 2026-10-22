# 動画生成AI ナレッジベース

EditFlow（動画編集工程管理）と手元の制作環境で使うため、動画生成AIのプロンプト技法・モデル別の特性・ワークフローを集めた資料です。
手元の生成は Higgsfield の MCP 経由で行う前提で、手元の規則（生成は承認を取ってから、実在の物は写真と照合、BGM は生成しない、など）に合わせています。

最終更新: 2026-10-22。動画生成AIは数か月単位で仕様が変わります。モデルの仕様は `models_explore`、費用は `get_cost`（どちらも無料）で、使う前に引き直してください。出典は各ファイルの末尾にあります。

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
| [`/data/video-ai-prompts.json`](../../data/video-ai-prompts.json) | 語彙・モデル・テンプレート・工程の機械可読版 |
| [`/.claude/skills/video-prompt/SKILL.md`](../../.claude/skills/video-prompt/SKILL.md) | Claude Code 用スキル。「〇〇の動画プロンプトを書いて」で起動 |

## Claude Code での使い方

- プロンプトを作らせる: 「藤まつりのオープニング用に、kling3_0 向けのプロンプトを書いて」
  → `video-prompt` スキルがこの資料を読んで、モデルに合わせた形で出力します。生成はしません。
- 開発に使う: 「05-editflow-integration.md の案Cを実装して」
  → `data/video-ai-prompts.json` を読み込むプロンプトビルダーを `index.html` に追加する、といった形で進められます。

## 情報の更新

新しいモデルやガイドが出たら、`02-models.md` に節を追加し、`data/video-ai-prompts.json` の `models` も更新してください。
JSON の `updated` フィールドも書き換えると、古い情報の見分けがつきます。07 の項目を試したら、結果を書き込み、該当する資料の印を 🔧 に直してください。
