#!/bin/bash
# キネコマの動作テストをまとめて流す（クラウドの環境でも Mac でも）。
# 使い方（shortfilm フォルダで）：bash tools/tests/run.sh 鍵
#   鍵＝作品を開くリンクの k= の後ろ。鍵を外した作品データは tools/local/ に置く（リポジトリには入らない）。
# 要るもの：node、python3、playwright。
#   playwright が無いとき（Mac など）は、先に一度だけ：
#     cd tools && npm install && npx playwright install chromium && cd ..
set -e
cd "$(dirname "$0")/../.."
[ -n "$1" ] || { echo '使い方：bash tools/tests/run.sh 鍵'; exit 1; }
if ! node -e "require(require('path').resolve('tools/tests/../node_modules/playwright'))" 2>/dev/null && ! node -e "require('playwright')" 2>/dev/null; then
  echo 'playwright がありません。先に次を実行してください：'
  echo '  cd tools && npm install && npx playwright install chromium && cd ..'
  exit 1
fi
L=tools/local; mkdir -p "$L"
node tools/dec.js works/minatogawa.bin "$L/work.json" "$1"
# 資料の更新を試すための、版を下げた写し
python3 -c "import json,sys;j=json.load(open(sys.argv[1]));j['rev']=max(1,(j.get('rev') or 1)-2);json.dump(j,open(sys.argv[2],'w'),ensure_ascii=False)" "$L/work.json" "$L/work-old.json"
printf %s "$1" > "$L/key.txt"
python3 -m http.server 8765 >/dev/null 2>&1 & SRV=$!
trap 'kill $SRV' EXIT
sleep 1
# Mac には timeout が無いことがあるので、あるときだけ使う
T=""; command -v timeout >/dev/null && T="timeout 180"; command -v gtimeout >/dev/null && T="gtimeout 180"
for t in tools/tests/*.js; do echo "== $t"; SP="$PWD/$L" $T node "$t" 2>&1 | grep -v '^[[:space:]]*at ' | tail -4 || true; done
