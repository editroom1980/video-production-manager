# ローカル ⇄ クラウドの作業受け渡し

ローカルの Claude Code のチャットで進めた作業をクラウドセッションに渡して続けさせ、その結果を**元のローカルのチャットに戻して**再開する仕組みです。

## 仕組み

Claude Code の CLI では、ローカルの会話そのものをクラウドに送ることはできません（`claude --cloud` で作られるのは新しいセッションで、渡されるのはプッシュ済みのブランチだけです）。
そこで、引き継ぎメモ `.claude/handoff/HANDOFF.md` を git で運びます。

```
ローカルのチャット                     GitHub                      クラウドセッション
─────────────────                      ──────                      ──────────────────
「クラウドに送って」(to-cloud)
  ├ 作業をコミット
  ├ HANDOFF.md を書く
  └ scripts/handoff.sh to-cloud ──► ブランチをプッシュ ──► claude --cloud で新しいセッション
                                                              HANDOFF.md を読んで作業
                                                              「ローカルに戻して」(to-local)
                                                               ├ 結果を HANDOFF.md に追記
                                   作業ブランチ ◄───────────── └ status: returned でプッシュ
「クラウドから戻して」(from-cloud)
  └ scripts/handoff.sh from-cloud ◄─ handoff id が一致し、返却済みのブランチを探してマージ
  結果を読んで、同じチャットで続ける
```

- **handoff id**（`hf-日付-時刻`）で、送ったものと戻ってきたものを対応づけます。クラウドが別のブランチ（`claude/…`）にプッシュしても見つけられます。
- 送り先のセッションIDなど、ローカル専用の状態は `.claude/handoff/.state` に置きます（git 管理外）。

## 使い方

| どこで | 言うこと | 中で動くもの |
|---|---|---|
| ローカル | 「クラウドに送って」（追加の指示があれば一緒に） | `to-cloud` スキル → `scripts/handoff.sh to-cloud` |
| ローカル | 「クラウドにこれも伝えて: …」 | `scripts/handoff.sh send "…"`（`claude -p … --cloud <id>`） |
| ローカル | 「クラウドはもう終わった？」 | `scripts/handoff.sh status` |
| クラウド | （自動、または）「ローカルに戻して」 | `to-local` スキル → `scripts/handoff.sh mark-returned` → プッシュ |
| ローカル | 「クラウドから戻して」 | `from-cloud` スキル → `scripts/handoff.sh from-cloud` |

元のチャットを閉じてしまった場合は、`claude --continue` か `claude --resume` で開き直してから「クラウドから戻して」と言ってください。

## 必要なもの

- Claude Code CLI（`--cloud` に対応した版。2.1.308 で確認）と、claude.ai アカウントでのログイン（`claude auth login`）
- このリポジトリが GitHub にあり、クラウドセッションからプッシュできること（Claude GitHub App）
- ローカルの Mac から GitHub へのプッシュ権限は**なくても動きます**。プッシュに失敗すると、ローカルのリポジトリをそのままクラウドにアップロードします（`CCR_FORCE_BUNDLE=1`）。戻すときは読み込みだけなので、権限は要りません。
- bash と git（Windows では Git Bash か WSL）

## 補足

- クラウドでの会話の全文が欲しい場合は、`claude --teleport <セッションID>` で取り込めます。ただし、これは元のチャットではなく、別のローカルセッションとして開きます。
- `scripts/handoff.sh to-cloud` から `claude --cloud` を実行したときに処理が返ってこない場合は、表示されたコマンドを自分で実行し、`scripts/handoff.sh record-session <URL>` でセッションを記録してください。
