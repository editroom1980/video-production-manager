---
name: to-cloud
description: Hand off the current local chat's work to a new Claude Code cloud session so it continues there, keeping this chat open to receive the result later. Use when the user (in a local session) says クラウドに送って / クラウドで続けて / to-cloud / hand this off to the cloud.
---

# ローカル → クラウドへの受け渡し

ローカルのチャットで使います。クラウドセッションには**会話の履歴が届きません**。届くのは GitHub にプッシュされたブランチだけです。そのため、引き継ぎメモ `.claude/handoff/HANDOFF.md` に必要なことをすべて書いてから渡します。

## 手順

1. **作業をコミットする。** `git status` で未コミットの変更を確認し、今の作業に関係するものを分かりやすいメッセージでコミットする。関係があるか判断できないファイルがあれば、ユーザーに聞く。
2. **引き継ぎメモを書く。** `.claude/handoff/TEMPLATE.md` をもとに `.claude/handoff/HANDOFF.md` を書く（前回のものがあれば上書きする）。
   - 1行目の `---` から始まる front matter は残す。値はスクリプトが入れる。
   - このチャットの内容から、目的、経緯、完了したこと、決めたことと理由、次にやること（チェックリスト）、注意点、未解決の質問、関連ファイルを具体的に書く。
   - 「次にやること」は、会話を知らない相手がすぐ着手できる粒度で書く。
   - 秘密情報（APIキー、パスワード、個人情報）は書かない。
3. **送る。** `scripts/handoff.sh to-cloud "追加の指示（あれば）"` を実行する。
   - 引き継ぎメモのコミットとプッシュをしてから、`claude --cloud` でクラウドセッションを作る。
   - 実行に2分以上かかる、またはセッションIDが表示されない場合は、ユーザーに次のどちらかを頼む。
     - `! claude --cloud "…"` をユーザー自身が実行する（スクリプトが表示したコマンドを使う）
     - 作られたセッションの URL を教えてもらい、`scripts/handoff.sh record-session <URL>` で記録する
4. **ユーザーに伝える。**
   - クラウドセッションの URL
   - このチャットは閉じずに残しておくこと（閉じても `claude --continue` か `claude --resume` で戻れる）
   - 追加の指示は `scripts/handoff.sh send "…"` で送れること
   - クラウドの作業が終わったら、このチャットで「クラウドから戻して」（from-cloud スキル）と言えば結果を取り込めること
