#!/usr/bin/env bash
# ローカルのチャット ⇄ クラウドセッションの作業受け渡し。
# 受け渡しの中身は .claude/handoff/HANDOFF.md（git で運ぶ）、
# 受け渡しの状態はローカル専用の .claude/handoff/.state（git 管理外）に置く。
#
#   scripts/handoff.sh to-cloud ["追加の指示"]   ローカル → クラウド（コミット、プッシュ、クラウドセッション作成）
#   scripts/handoff.sh send "メッセージ"          動いているクラウドセッションに追加の指示を送る
#   scripts/handoff.sh status                     受け渡しの状態と、クラウドから戻っているかを表示
#   scripts/handoff.sh from-cloud [handoff-id]    クラウド → ローカル（戻ってきたブランチを取り込む）
#   scripts/handoff.sh mark-returned              （クラウド側で使う）HANDOFF.md を「返却済み」にする
#   scripts/handoff.sh record-session <id|url>    クラウドセッションの ID を手で記録する
set -euo pipefail

ROOT=$(git rev-parse --show-toplevel)
cd "$ROOT"
HF=.claude/handoff/HANDOFF.md
STATE=.claude/handoff/.state

die() { echo "エラー: $*" >&2; exit 1; }

# HANDOFF.md 冒頭の front matter から値を読む / 書く
get_field() { sed -n "s/^$1: *//p" "${2:-$HF}" | head -n1; }
set_field() {
  local key=$1 val=$2 tmp
  tmp=$(mktemp)
  if grep -q "^$key:" "$HF"; then
    awk -v k="$key" -v v="$val" 'BEGIN{done=0} !done && index($0, k":")==1 {print k": "v; done=1; next} {print}' "$HF" > "$tmp"
  else
    # 1行目の --- の直後に足す
    awk -v k="$key" -v v="$val" 'NR==1 {print; print k": "v; next} {print}' "$HF" > "$tmp"
  fi
  mv "$tmp" "$HF"
}

state_get() { [ -f "$STATE" ] && sed -n "s/^$1=//p" "$STATE" | tail -n1 || true; }
state_set() {
  mkdir -p "$(dirname "$STATE")"
  touch "$STATE"
  grep -v "^$1=" "$STATE" > "$STATE.tmp" || true
  echo "$1=$2" >> "$STATE.tmp"
  mv "$STATE.tmp" "$STATE"
}

current_branch() {
  local b
  b=$(git symbolic-ref --short -q HEAD) || die "ブランチ上にいません（detached HEAD）。ブランチをチェックアウトしてください。"
  echo "$b"
}

require_hf() {
  [ -f "$HF" ] || die "$HF がありません。先に HANDOFF.md を書いてください（テンプレート: .claude/handoff/TEMPLATE.md）。"
  head -n1 "$HF" | grep -q '^---$' || die "$HF の1行目が '---' ではありません。テンプレートの front matter を残してください。"
}

# HANDOFF.md 以外に未コミットの変更があれば止める（クラウドはプッシュ済みのものしか見えないため）
require_clean_except_hf() {
  local dirty
  dirty=$(git status --porcelain | grep -v " $HF\$" || true)
  if [ -n "$dirty" ]; then
    echo "$dirty" >&2
    die "HANDOFF.md 以外に未コミットの変更があります。作業をコミットしてからもう一度実行してください。"
  fi
}

find_session_id() { grep -oE '(session|cse)_[A-Za-z0-9]+' | head -n1; }

cmd_to_cloud() {
  local extra=${1:-} branch id prompt out sid
  require_hf
  require_clean_except_hf
  branch=$(current_branch)
  id="hf-$(date +%Y%m%d-%H%M%S)"

  set_field id "$id"
  set_field status to-cloud
  set_field from_branch "$branch"
  set_field return_branch "-"
  set_field updated "$(date '+%Y-%m-%d %H:%M')"

  git add "$HF"
  git commit -q -m "Hand off to cloud session ($id)"
  git push -q -u origin "$branch"

  state_set id "$id"
  state_set branch "$branch"
  state_set status to-cloud
  state_set session ""

  prompt="ローカルのチャットから作業を引き継ぎます（handoff id: $id、元のブランチ: $branch）。
1. .claude/handoff/HANDOFF.md を最初に読み、「次にやること」を進めてください。会話の履歴は引き継がれていないので、HANDOFF.md とリポジトリの内容だけを頼りにしてください。
2. 区切りがついたら、または私の判断が必要になったら、to-local スキルの手順で結果を HANDOFF.md に書き、コミットしてプッシュしてください。"
  [ -n "$extra" ] && prompt="$prompt
追加の指示: $extra"

  if ! command -v claude >/dev/null 2>&1; then
    echo "claude コマンドが見つかりません。次のコマンドを手で実行してください:"
    printf 'claude --cloud %q\n' "$prompt"
    return 0
  fi

  echo "クラウドセッションを作成しています…"
  out=$(claude --cloud "$prompt" </dev/null 2>&1) || { echo "$out"; die "claude --cloud が失敗しました。"; }
  echo "$out"
  sid=$(printf '%s' "$out" | find_session_id || true)
  if [ -n "$sid" ]; then
    state_set session "$sid"
    echo
    echo "受け渡し完了: $id → https://claude.ai/code/$sid"
  else
    echo
    echo "セッションIDを読み取れませんでした。URL が分かったら次で記録してください:"
    echo "  scripts/handoff.sh record-session <セッションのURLまたはID>"
  fi
}

cmd_send() {
  local msg=${1:-} sid
  [ -n "$msg" ] || die "送るメッセージを指定してください。"
  sid=$(state_get session)
  [ -n "$sid" ] || die "クラウドセッションのIDが記録されていません。scripts/handoff.sh record-session <URL> で記録してください。"
  claude -p "$msg" --cloud "$sid"
}

cmd_record_session() {
  local sid
  sid=$(printf '%s' "${1:-}" | find_session_id || true)
  [ -n "$sid" ] || die "セッションIDまたは claude.ai/code の URL を指定してください。"
  state_set session "$sid"
  echo "記録しました: $sid"
}

# handoff id を含み、status: returned になっているリモートブランチを新しい順に探す
find_returned_ref() {
  local id=$1 ref content
  for ref in $(git for-each-ref --sort=-committerdate --format='%(refname:short)' refs/remotes/origin); do
    [ "$ref" = "origin/HEAD" ] && continue
    content=$(git show "$ref:$HF" 2>/dev/null) || continue
    printf '%s\n' "$content" | grep -q "^id: $id\$" || continue
    printf '%s\n' "$content" | grep -q '^status: returned$' || continue
    echo "$ref"
    return 0
  done
  return 1
}

cmd_status() {
  local id sid ref
  id=$(state_get id); sid=$(state_get session)
  if [ -z "$id" ]; then echo "受け渡しの記録はありません。"; return 0; fi
  echo "handoff id : $id"
  echo "元のブランチ: $(state_get branch)"
  echo "状態       : $(state_get status)"
  [ -n "$sid" ] && echo "クラウド   : https://claude.ai/code/$sid"
  git fetch -q origin --prune
  if ref=$(find_returned_ref "$id"); then
    echo "→ クラウドから戻っています（$ref）。scripts/handoff.sh from-cloud で取り込めます。"
  else
    echo "→ まだ戻っていません。"
  fi
}

cmd_from_cloud() {
  local id=${1:-} ref branch
  [ -n "$id" ] || id=$(state_get id)
  [ -n "$id" ] || die "handoff id が分かりません。引数で指定してください（例: hf-20261022-153000）。"
  [ -z "$(git status --porcelain)" ] || die "未コミットの変更があります。コミットするか stash してから実行してください。"

  git fetch -q origin --prune
  if ! ref=$(find_returned_ref "$id"); then
    echo "クラウドからはまだ戻っていません（$id）。"
    sid=$(state_get session)
    [ -n "$sid" ] && echo "進み具合: https://claude.ai/code/$sid"
    exit 2
  fi

  branch=$(current_branch)
  echo "取り込みます: $ref → $branch"
  if [ "$ref" = "origin/$branch" ]; then
    git merge -q --ff-only "$ref" || git merge --no-edit "$ref"
  else
    git merge --no-edit "$ref" || die "マージで競合しました。競合を解消してコミットしてください（git status で確認）。"
  fi
  state_set status merged
  state_set returned_from "$ref"
  echo
  echo "===== $HF ====="
  cat "$HF"
}

cmd_mark_returned() {
  require_hf
  set_field status returned
  set_field return_branch "$(current_branch)"
  set_field updated "$(date '+%Y-%m-%d %H:%M')"
  echo "HANDOFF.md を返却済みにしました（id: $(get_field id)、ブランチ: $(current_branch)）。"
}

case "${1:-}" in
  to-cloud)       shift; cmd_to_cloud "${1:-}" ;;
  send)           shift; cmd_send "${1:-}" ;;
  status)         cmd_status ;;
  from-cloud)     shift; cmd_from_cloud "${1:-}" ;;
  mark-returned)  cmd_mark_returned ;;
  record-session) shift; cmd_record_session "${1:-}" ;;
  *) sed -n '2,12p' "$0" | sed 's/^# \{0,1\}//'; exit 1 ;;
esac
