---
name: from-cloud
description: In the original local chat, pull back work that a cloud session returned (via to-local), merge its branch, read the results in .claude/handoff/HANDOFF.md and continue. Use when the user says クラウドから戻して / クラウドの結果を取り込んで / from-cloud, or asks whether the cloud session is done.
---

# クラウドから戻ってきた作業の取り込み

ローカルの元のチャット（to-cloud で送ったチャット）で使います。

## 手順

1. **戻っているか確認する。** `scripts/handoff.sh status`
   - 「まだ戻っていません」なら、クラウドセッションの URL を伝えて終える。急ぐなら `scripts/handoff.sh send "区切りのいいところで to-local で返して"` で催促できることも伝える。
2. **取り込む。** `scripts/handoff.sh from-cloud`
   - 未コミットの変更があると止まる。今の変更をコミットするか stash するかは、ユーザーに聞いてから決める。
   - 戻ってきたブランチを今のブランチにマージし、HANDOFF.md を表示する。
   - 競合したら、両方の意図を読んで解消する。どちらを残すかで挙動が変わる場合は、ユーザーに聞く。
3. **結果を読んで報告する。** HANDOFF.md の「クラウドでの作業結果」と、取り込んだコミット（`git log --oneline ORIG_HEAD..HEAD`）を確認し、次の点を短く伝える。
   - やったこと
   - できなかったこと
   - ユーザーに判断してほしいこと
4. **続ける。** 「次にやること」と「ユーザーに判断してほしいこと」をもとに、このチャットで作業を続ける。判断が要るものはユーザーに聞く。

## 補足

- このチャットを閉じてしまった場合は、`claude --continue`（直前の会話）か `claude --resume`（一覧から選ぶ）で開き直してから、この手順を行う。
- クラウドでの会話の全文が必要な場合は、`claude --teleport <セッションID>` を使う。ただし、それは別のローカルセッションとして開く。
