# 動画生成AI ナレッジベース

EditFlow（動画編集工程管理）の開発に活かすため、動画生成AIのプロンプト技法・モデル別の特性・ワークフローを集めた資料です。
ローカルの Claude Code（コードチャット）から参照することを前提に、Markdown（人が読む用）と JSON（アプリに取り込む用）の両方で置いています。

> 収集日: 2026-10-22。動画生成AIは数か月単位で仕様が変わります。数値（秒数・解像度・価格）は、使う前に必ず公式ドキュメントで確認してください。出典は各ファイルの末尾にあります。

## ファイル構成

| ファイル | 内容 |
|---|---|
| [01-prompt-fundamentals.md](01-prompt-fundamentals.md) | どのモデルにも通じるプロンプトの基本構造、カメラ・照明・スタイルの語彙（日英対訳） |
| [02-models.md](02-models.md) | モデル別チートシート（Veo 3.1 / Gemini Omni Flash、Sora 2、Kling 3.0、Runway Gen-4.5、Seedance 2.0、Wan 2.7） |
| [03-templates.md](03-templates.md) | そのまま使えるプロンプトテンプレート（地域情報番組、CM、ダイジェスト、縦型ショートなど） |
| [04-workflow.md](04-workflow.md) | AI生成を取り入れた制作ワークフローと、工程ごとの目安時間 |
| [05-editflow-integration.md](05-editflow-integration.md) | EditFlow に組み込むための機能案・データ設計 |
| [`/data/video-ai-prompts.json`](../../data/video-ai-prompts.json) | 語彙・テンプレート・工程の機械可読版（プロンプトビルダー実装用） |
| [`/.claude/skills/video-prompt/SKILL.md`](../../.claude/skills/video-prompt/SKILL.md) | Claude Code 用スキル。「〇〇の動画プロンプトを書いて」で起動 |

## Claude Code での使い方

- プロンプトを作らせる: 「藤まつりのオープニング用に、Kling 3.0 向けの3ショット構成のプロンプトを書いて」
  → `video-prompt` スキルがこの資料を読んで、モデルに合わせた形で出力します。
- 開発に使う: 「05-editflow-integration.md の案Aを実装して」
  → `data/video-ai-prompts.json` を読み込むプロンプトビルダーを `index.html` に追加する、といった形で進められます。

## 情報の更新

新しいモデルやガイドが出たら、`02-models.md` に節を追加し、`data/video-ai-prompts.json` の `models` も更新してください。
JSON の `updated` フィールドも書き換えると、古い情報の見分けがつきます。
