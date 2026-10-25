# EditFlow — 動画編集工程管理

- アプリ本体は `index.html` の1ファイルのみ（ビルドなし、データは `localStorage` に保存、モバイル幅 480px 前提）。
- 工程ライブラリは `DEFAULT_STEP_LIBRARY`、プリセットは `DEFAULT_PRESETS`。プリセットはライブラリをインデックスで参照しているので、ライブラリへの追加は末尾に行う。

## 動画生成AIの資料

- `docs/video-ai/` に、動画生成AIのプロンプト技法、モデル別の特性、テンプレート、ワークフロー、EditFlow への組み込み案をまとめている（入口は `docs/video-ai/README.md`）。
- `data/video-ai-prompts.json` は同じ内容の機械可読版。プロンプトビルダーなどの機能を作るときはここを使う。
- 複数パターン・モーショングラフィックス・脚本から映画・一部だけ直す・スキル化・アニメ MV・モデルの作り比べ・まとめて生成は、`hf-variants` / `hf-motion` / `hf-script-to-film` / `hf-partial-fix` / `workflow-to-skill` / `hf-anime-mv` / `hf-model-compare` / `hf-batch` スキル（手順は `docs/video-ai/11-claude-higgsfield-canvas.md`）。
- Higgsfield で生成（クレジットを使う操作）をするときは、必ず先に `get_cost: true` で見積もりを示し、依頼者が OK と言うまで生成しない。定期実行では生成せず、承認の手前で止める（`hf-autopilot`）。
- 定期実行・多言語化・撮り直さない作り替えは、`hf-autopilot` / `hf-localize` / `hf-remix` スキル（手順は `docs/video-ai/16-chatgpt-dots-to-claude.md`）。
- 動画生成プロンプトを書くときは `video-prompt` スキル（`.claude/skills/video-prompt/`）を入口にする。演出と静止画の参考書として `visual-video` / `visual-image`（smixs/visual-skills、CC BY 4.0。作者表記を消さないこと）を読む。手元の規則と食い違うときは手元の規則を優先する。

## クラウドで集めた資料の受け取り方

- 資料はクラウドの Claude が集めて、このブランチに置く。Mac 側では `git pull` すれば最新の資料が手に入る（Mac から GitHub への書き込みは不要）。
- 開発のチャット（映像制作フォルダ）への依頼は、その都度ユーザーに貼らせない。`docs/video-ai/開発チャットへの依頼_未送.md` にためておき、ある程度成果が出たとき、またはユーザーが求めたときに、取り込みのコマンドとあわせて1通にまとめて渡す（ユーザーの指示）。
