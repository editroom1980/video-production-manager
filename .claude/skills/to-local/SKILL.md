---
name: to-local
description: In a cloud session that was started by a local hand-off (.claude/handoff/HANDOFF.md has status to-cloud), write the results back into HANDOFF.md, mark it returned, commit and push so the original local chat can pick it up. Use when the hand-off work is done or needs the user's decision, or when the user says ローカルに戻して / to-local / 結果を返して.
---

# クラウド → ローカルへの返却

クラウドセッションで使います。ローカルの元のチャットは、プッシュされたブランチの `.claude/handoff/HANDOFF.md` を読んで続きを再開します。

## 手順

1. **作業をコミットする。** 終わった作業を、分かりやすいメッセージでコミットする。
2. **HANDOFF.md に結果を追記する。** ファイルの末尾に次の節を足す（前回の返却分があれば、その下に足す）。

   ```markdown
   ## クラウドでの作業結果（<日時>）
   ### やったこと
   - （コミットのハッシュとファイル名を添えて）
   ### 決めたこと（理由つき）
   ### 確認したこと・テスト結果
   ### できなかったこと・問題
   ### ユーザーに判断してほしいこと
   ```

   - 上の「次にやること」のチェックリストは、終わったものに `[x]` を付け、残りと新しく出てきたものを書き直す。
   - 失敗や未確認のことは、そのまま書く。
3. **返却済みにしてプッシュする。**
   ```
   scripts/handoff.sh mark-returned
   git add -A && git commit -m "Return hand-off to local (<handoff id>)"
   git push -u origin HEAD:<プッシュ先のブランチ>
   ```
   - プッシュ先: このセッションに作業ブランチが指定されていればそこ。指定がなければ `claude/handoff-<handoff id>`（例: `claude/handoff-hf-20261022-142144`）。ローカルの取り込み側は handoff id で探すので、ブランチ名は何でもよい。
   - **`origin` がない場合**（ローカルの Mac から直接アップロードされたセッション）: `add_repo` ツール（claude-code-remote）を `owner: editroom1980`、`repo: video-production-manager`、`access: push` で呼び、案内に従って `git remote add origin https://github.com/editroom1980/video-production-manager.git` を設定してからプッシュする。
   - 既存のブランチへのプッシュが「non-fast-forward」で拒否されたら、強制プッシュはせず、`claude/handoff-<handoff id>` に出し直す。
4. **ユーザーに伝える。** やったことの要点と、ローカルの元のチャットで「クラウドから戻して」と言えば取り込めること。
