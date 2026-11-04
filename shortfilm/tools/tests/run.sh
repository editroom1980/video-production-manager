#!/bin/bash
# キネコマの動作テストをまとめて流す。
# 使い方（shortfilm フォルダで）：bash tools/tests/run.sh 鍵
#   鍵＝作品を開くリンクの k= の後ろ。鍵を外した作品データは tools/local/ に置く（リポジトリには入らない）。
# 要るもの：node、python3、playwright（require('playwright') で読めること）
set -e
cd "$(dirname "$0")/../.."
[ -n "$1" ] || { echo '使い方：bash tools/tests/run.sh 鍵'; exit 1; }
L=tools/local; mkdir -p "$L"
node tools/dec.js works/minatogawa.bin "$L/work.json" "$1"
# 資料の更新を試すための、版を下げた写し
python3 -c "import json,sys;j=json.load(open(sys.argv[1]));j['rev']=max(1,(j.get('rev') or 1)-2);json.dump(j,open(sys.argv[2],'w'),ensure_ascii=False)" "$L/work.json" "$L/work-old.json"
printf %s "$1" > "$L/key.txt"
python3 -m http.server 8765 >/dev/null 2>&1 & SRV=$!
trap 'kill $SRV' EXIT
sleep 1
for t in tools/tests/*.js; do echo "== $t"; SP="$PWD/$L" timeout 180 node "$t" 2>&1 | grep -v '^\s*at ' | tail -4 || true; done
