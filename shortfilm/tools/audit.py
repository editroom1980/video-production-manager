# 図（座標）と文（カメラ案・理由・サイズ）の食い違いを洗い出す
import json, math, sys, re
j = json.load(open(sys.argv[1], encoding='utf-8'))

def bearing(a, b): return math.degrees(math.atan2(b[0] - a[0], -(b[1] - a[1]))) % 360
def rel(a, d):  # 角度 a を、向き d から見た左右（-180〜180、正が右）
    return (a - d + 540) % 360 - 180
def side(A, B, P): return (B[0] - A[0]) * (P[1] - A[1]) - (B[1] - A[1]) * (P[0] - A[0])

FOV = {'広角': 80, '標準': 50, '望遠': 24, '寄り': 40, 'マクロ': 34}
rows = []
for sc in j['scenes']:
    st = sc.get('stage') or {}
    ref_side = None
    for c in sc['cuts']:
        plans = [('A', {'cam': c.get('cam', ''), 'why': c.get('why', ''), 'fig': c.get('fig')})] + [('BCD'[i], a) for i, a in enumerate(c.get('alts', []))]
        for lab, p in plans:
            f = p.get('fig')
            if not f: continue
            text = ' '.join([p.get('cam', ''), f.get('size', ''), f.get('note', '')])  # 理由や「どんなとき」の言葉には反応しない
            cam = f['cams'][0]; cx, cy, d = cam
            fov = 2 * math.degrees(math.atan(18 / f['mm'])) if f.get('mm') else FOV.get(f.get('lens'), 50)
            facts, flags = [], []
            acts = f.get('acts') or ([f['act']] if f.get('act') else [])
            if acts:
                ax, ay, face = acts[0][:3]
                b = bearing((cx, cy), (ax, ay))
                inframe = abs(rel(b, d)) <= fov / 2 + 3
                if not inframe: flags.append(f'高峰が写る範囲の外（{round(rel(b, d))}°）')
                # 高峰の向き：カメラに対して
                back = rel(face, b)           # 0 なら背中を向ける
                if abs(back) < 50: rel_face = '背中（後ろ姿）'
                elif abs(back) > 130: rel_face = '正面'
                else:
                    sr = rel(face, d)
                    rel_face = '横顔（画面の右を見る）' if sr > 0 else '横顔（画面の左を見る）'
                facts.append('高峰：' + rel_face)
                # 過去（古い街・跡地）を見るカットで横顔なら、決まりごとどおり画面の右を見ているか
                if (sc['no'], c['no']) in {('2', '1'), ('3', '1'), ('4', '4'), ('5', '1'), ('6', '1')} and rel_face == '横顔（画面の左を見る）':
                    flags.append('過去を見る視線が画面の左（決まりごとは右か奥）')
                if re.search(r'正面', text) and '正面' not in rel_face and not re.search(r'正面寄り|正面から捉え|正面からきちんと|タワー跡の正面|駐車場の正面|正面・左右', text):
                    flags.append('文は「正面」だが図は' + rel_face)
                if re.search(r'横顔', text) and '横顔' not in rel_face:
                    flags.append('文は「横顔」だが図は' + rel_face)
                if re.search(r'背中|後ろ姿|肩越し', text) and '背中' not in rel_face and '肩越し' not in text:
                    flags.append('文は「背中・後ろ姿」だが図は' + rel_face)
                if '肩越し' in text and abs(back) > 75:
                    flags.append('文は「肩越し」だが図は' + rel_face)
                if re.search(r'画面の右（[^）]*）を見る|画面の右を見る|画面の右（聚楽館の方）を振り返る', text) and rel_face != '横顔（画面の右を見る）':
                    flags.append('文は「画面の右を見る」だが図は' + rel_face)
                if '斜め前' in text and abs(back) < 90 and '階段の下' not in text:
                    flags.append('文は「斜め前」だが図は高峰の後ろ側')
                if '斜め後ろ' in text and abs(back) > 90:
                    flags.append('文は「斜め後ろ」だが図は高峰の前側')
            path = f.get('path')
            if path:
                s0, s1 = rel(bearing((cx, cy), path[0]), d), rel(bearing((cx, cy), path[-1]), d)
                lr = '右へ' if s1 > s0 + 4 else '左へ' if s1 < s0 - 4 else '奥か手前へ'
                facts.append(f'動き：画面の{lr}（{round(s0)}°→{round(s1)}°）')
                if re.search(r'左から入|左から右|右へ抜け|画面の右へ', text) and lr != '右へ': flags.append('文は「左→右」だが図の動きは' + lr)
                if re.search(r'画面の左へ', text) and lr != '左へ': flags.append('文は「画面の左へ」だが図の動きは' + lr)
                if re.search(r'奥（北）へ|奥へ歩', text) and lr != '奥か手前へ' and abs(s1 - s0) > 12: flags.append('文は「奥へ」だが図は横に動く')
            # カメラを置く側（イマジナリーライン）
            axis = f.get('axis') or st.get('axis')
            if axis and acts:
                sg = 1 if side(axis[0], axis[1], (cx, cy)) > 0 else -1
                if not f.get('axis'):
                    if ref_side is None: ref_side = sg
                    elif sg != ref_side: flags.append('カメラが、同じシーンのほかのカットと線の反対側')
            rows.append((sc['no'], c['no'], lab, p.get('cam', '')[:46], ' / '.join(facts), flags))

bad = [r for r in rows if r[5]]
print('調べた図', len(rows), '／食い違い', len(bad))
for r in bad:
    print(f'S#{r[0]} C{r[1]} 案{r[2]}｜{r[3]}｜{r[4]}｜' + '；'.join(r[5]))
if '-all' in sys.argv:
    for r in rows: print(f'S#{r[0]} C{r[1]} 案{r[2]}｜{r[4]}｜{r[3]}')
