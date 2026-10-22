# EditFlow — 動画編集工程管理

- アプリ本体は `index.html` の1ファイルのみ（ビルドなし、データは `localStorage` に保存、モバイル幅 480px 前提）。
- 工程ライブラリは `DEFAULT_STEP_LIBRARY`、プリセットは `DEFAULT_PRESETS`。プリセットはライブラリをインデックスで参照しているので、ライブラリへの追加は末尾に行う。

## 動画生成AIの資料

- `docs/video-ai/` に、動画生成AIのプロンプト技法、モデル別の特性、テンプレート、ワークフロー、EditFlow への組み込み案をまとめている（入口は `docs/video-ai/README.md`）。
- `data/video-ai-prompts.json` は同じ内容の機械可読版。プロンプトビルダーなどの機能を作るときはここを使う。
- 動画生成プロンプトを書くときは `video-prompt` スキル（`.claude/skills/video-prompt/`）を使う。

## ローカル ⇄ クラウドの受け渡し

- 手順と仕組みは `docs/handoff.md`。スキルは `to-cloud`（ローカル → クラウド）、`to-local`（クラウド → 返却）、`from-cloud`（ローカルで取り込み）。
- クラウドセッションで `.claude/handoff/HANDOFF.md` の `status` が `to-cloud` なら、それはローカルから渡された作業。最初に HANDOFF.md を読み、区切りがついたら `to-local` スキルで返却する。
