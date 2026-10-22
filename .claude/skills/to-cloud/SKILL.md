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
3. **送る準備をする。** `scripts/handoff.sh to-cloud "追加の指示（あれば）"` を実行する。
   - 引き継ぎメモをコミットし、プッシュを試し、クラウドへの指示文を保存する。
   - プッシュできなくても止まらない（送るときに、ローカルのリポジトリを直接アップロードする）。
   - `claude --cloud` は Claude Code の中（Bash ツールや `!`）からは実行できないので、**ここでは実行しない**。
4. **ユーザーに、別のターミナルで送ってもらう。** 次のように、そのまま真似できる形で伝える。
   1. ⌘ + N で、ターミナルの新しいウィンドウを開く
   2. 次の2行を、1行ずつ手で打って Enter（スクリプトが表示した `cd` の行を使う）
      ```
      cd ~/video-production-manager
      scripts/handoff.sh launch
      ```
   3. 表示されたクラウドの URL を、このチャットに貼る
   - URL を貼ってもらったら、`scripts/handoff.sh record-session <URL>` で記録する。
5. **ユーザーに伝える。**
   - クラウドセッションの URL
   - このチャットは閉じずに残しておくこと（閉じても `claude --continue` か `claude --resume` で戻れる）
   - 追加の指示は `scripts/handoff.sh send "…"` で送れること
   - クラウドの作業が終わったら、このチャットで「クラウドから戻して」（from-cloud スキル）と言えば結果を取り込めること
