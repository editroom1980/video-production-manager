// 技術の手引き：表の値と計算が合うこと・出典の抜けが無いこと・さがす・計算・説明書の要点・カットごとのシャッター
const { chromium } = require('playwright');
const SP = process.env.SP;
(async () => { const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const errs = []; pg.on('pageerror', e => errs.push(e.message));
  const ng = []; const ok = (c, m) => { if (!c) ng.push(m); };
  const closeAll = async () => { while (await pg.$('.sheet [data-a=close]')) await pg.click('.sheet:last-child [data-a=close]'); };
  await pg.goto('http://localhost:8765/');
  await pg.evaluate(async () => { localStorage.clear(); await new Promise(r => { const q = indexedDB.deleteDatabase('satsueicho'); q.onsuccess = q.onerror = q.onblocked = r; }); });
  await pg.reload(); await pg.setInputFiles('#restore', SP + '/work.json'); await pg.click('[data-a=askYes]'); await pg.waitForTimeout(2500); await closeAll();
  // 表の値（照明のちらつき）と、計算の関数が同じか
  const tb = await pg.evaluate(() => { const A = window.__kinekoma, g = A.TECH.find(x => x.id === 't_flicker'), fr = { '23.98p・24p': 23.976, '25p': 25, '29.97p': 29.97, '59.94p': 59.94, '119.88p': 119.88 };
    return g.tbl.map(([k, v]) => [60, 50].map(hz => { const f = A.shutFlicker(fr[k], hz), want = (v.split(/[／\n]/).find(x => x.startsWith(hz + 'Hz')) || '').replace(/^\d+Hz：/, ''); return [k, hz, f ? `${A.shutLabel(f)} ${A.shutAngle(f, fr[k])}°` : 'なし', want]; })).flat(); });
  for (const [k, hz, got, want] of tb) { const m = /^(1\/\d+)（約?(\d+)/.exec(want); ok(m ? got.startsWith(m[1] + ' ') && Math.abs(parseFloat(got.split(' ')[1]) - +m[2]) < 1 : got === 'なし', `表と計算が違う ${k} ${hz}Hz：表 ${want}／計算 ${got}`); }
  console.log('ちらつきの表と計算', tb.map(x => `${x[0]} ${x[1]}Hz=${x[2]}`).join('、'));
  // 出典の抜け・項目の数
  const miss = await pg.evaluate(() => { const A = window.__kinekoma; return [...A.TECH.flatMap(g => g.src), ...A.MANUALS.map(m => m.src)].filter(k => !A.SRC[k]); });
  ok(!miss.length, '出典が無い：' + miss.join('、'));
  const n = await pg.evaluate(() => ({ t: window.__kinekoma.TECH.length, m: window.__kinekoma.MANUALS.map(m => m.rows.length) }));
  console.log('項目', n.t, '説明書の行', n.m.join('・'));
  // 資料 → 技術の手引き
  await pg.click('[data-a=tab][data-k=docs]'); await pg.click('#v-docs [data-a=openTech]'); await pg.waitForTimeout(300);
  await pg.screenshot({ path: SP + '/t-top.png' });
  const all = await pg.locator('.sheet:last-child .gitem').count();
  await pg.fill('#techq', 'ちらつき'); await pg.waitForTimeout(100);
  const vis = await pg.evaluate(() => [...document.querySelectorAll('.sheet:last-child .gitem')].filter(x => !x.hidden).map(x => (x.querySelector('summary, h3') || {}).textContent));
  ok(vis.some(t => /ちらつき/.test(t)), 'さがす「ちらつき」で照明のちらつきが出ない');
  await pg.fill('#techq', 'ぬぬぬ'); await pg.waitForTimeout(100);
  ok(await pg.evaluate(() => [...document.querySelectorAll('.sheet:last-child .gitem')].every(x => x.hidden)), '当てはまらない言葉で隠れない');
  await pg.fill('#techq', ''); await pg.waitForTimeout(100);
  console.log('項目の数（画面）', all, 'さがす「ちらつき」', vis.join('、'));
  // 計算
  const out = id => pg.textContent('#' + id);
  await pg.selectOption('#cx-fps', '23.976'); await pg.selectOption('#cx-hz', '60'); await pg.waitForTimeout(50);
  let t = await out('cx-shut'); ok(/1\/48/.test(t) && /1\/60（143\.9°）/.test(t), 'シャッターの計算（23.98p・60Hz）：' + t);
  await pg.selectOption('#cx-hz', '50'); await pg.waitForTimeout(50); t = await out('cx-shut'); ok(/1\/50（172\.6°）/.test(t), 'シャッターの計算（23.98p・50Hz）：' + t);
  await pg.selectOption('#cx-fps', '119.88'); await pg.waitForTimeout(50); t = await out('cx-shut'); ok(/ちらつかない速さがありません/.test(t), 'シャッターの計算（119.88p・50Hz）：' + t);
  await pg.fill('#cx-mbps', '600'); await pg.fill('#cx-gb', '128'); await pg.waitForTimeout(50); t = await out('cx-rec'); ok(/4\.5GB/.test(t) && /28分/.test(t), '記録時間の計算：' + t);
  await pg.fill('#cx-nd', '128'); await pg.waitForTimeout(50); t = await out('cx-ndo'); ok(/7段/.test(t), 'ND の計算：' + t);
  await pg.fill('#cx-st', '6'); await pg.waitForTimeout(50); t = await out('cx-ndo'); ok(/1\/64/.test(t), '段数の計算：' + t);
  await pg.fill('#cx-mm', '35'); await pg.selectOption('#cx-sens', '1.5'); await pg.waitForTimeout(50); t = await out('cx-mmo'); ok(/53mm/.test(t) && /23mm/.test(t), '換算の計算：' + t);
  await pg.evaluate(() => document.querySelector('.sheet:last-child .calc').scrollIntoView()); await pg.screenshot({ path: SP + '/t-calc.png' });
  // 項目を開いた見た目と、横にはみ出さないか
  await pg.evaluate(() => { const d = [...document.querySelectorAll('.sheet:last-child details.prin')].find(x => /照明のちらつき/.test(x.querySelector('summary').textContent)); d.open = true; }); await pg.waitForTimeout(100);
  await pg.evaluate(() => [...document.querySelectorAll('.sheet:last-child summary')].find(x => /照明のちらつき/.test(x.textContent)).scrollIntoView()); await pg.screenshot({ path: SP + '/t-flicker.png' });
  const wide = await pg.evaluate(() => { const r = []; document.querySelectorAll('.sheet:last-child .sheet-body *').forEach(el => { const b = el.getBoundingClientRect(); if (b.width && b.right > innerWidth + 1) r.push(el.tagName + '.' + el.className); }); return r.slice(0, 5); });
  ok(!wide.length, '横にはみ出す：' + wide.join('、'));
  await closeAll();
  // 機材の画面：フレームレートと周波数、説明書の要点のボタン
  await pg.click('[data-a=tab][data-k=out]'); await pg.click('#v-out [data-a=openKit]'); await pg.waitForTimeout(200);
  ok(await pg.locator('.sheet:last-child [data-kitset=fps]').count() === 1 && await pg.locator('.sheet:last-child [data-kitset=hz]').count() === 1, 'いつもの組み方にフレームレート・周波数の欄が無い');
  const mans = await pg.evaluate(() => [...document.querySelectorAll('.sheet:last-child [data-a=openManual]')].map(x => x.dataset.id));
  ok(mans.includes('fx6') && mans.includes('fx3'), '説明書の要点のボタン：' + mans.join('、'));
  await pg.screenshot({ path: SP + '/t-kit.png' });
  await pg.click('.sheet:last-child [data-a=openManual][data-id=fx6]'); await pg.waitForTimeout(150);
  const rows = await pg.locator('.sheet:last-child .mrow').count(); ok(rows === 19, '説明書の要点の行の数（FX6）：' + rows);
  await pg.screenshot({ path: SP + '/t-man.png' });
  await pg.click('.sheet:last-child [data-a=close]'); await pg.waitForTimeout(100);
  // カットごとのシャッター（夜と昼、60Hz と 50Hz）
  const ask = (no, ci) => pg.evaluate(([no, ci]) => { const A = window.__kinekoma, sc = A.P.scenes.find(s => s.no === no); const r = A.kitPlan(sc, sc.cuts[ci], 0); const l = r.lines.find(x => x.b === 'シャッター' || x.b === 'スロー'); return l ? `${l.t}｜${l.why || ''}` : 'なし'; }, [no, ci]);
  await pg.selectOption('.sheet:last-child [data-kitset=fps]', '23.976'); await pg.selectOption('.sheet:last-child [data-kitset=hz]', '60'); await pg.waitForTimeout(100);
  let night = await ask('6', 0), day = await ask('1', 0);
  ok(/^1\/60（143\.9°）/.test(night) && /Flicker Reduce を 60Hz/.test(night), '夜のシャッター（60Hz）：' + night);
  ok(/^1\/48（180°）/.test(day), '昼のシャッター：' + day);
  await pg.selectOption('.sheet:last-child [data-kitset=hz]', '50'); await pg.waitForTimeout(100);
  const night50 = await ask('6', 0); ok(/^1\/50（172\.6°）/.test(night50), '夜のシャッター（50Hz）：' + night50);
  const K = await pg.evaluate(() => JSON.parse(localStorage.getItem('satsueicho.v1.kit')));
  ok(K.hz === '50' && K.fps === '23.976', '周波数・フレームレートが保存されない');
  await pg.selectOption('.sheet:last-child [data-kitset=hz]', '60'); await pg.waitForTimeout(100);
  console.log('夜', night.split('｜')[0], '／昼', day.split('｜')[0], '／50Hz の夜', night50.split('｜')[0]);
  await closeAll();
  // ミスト：いつも付けるにしてあっても、古写真・ＣＧと重ねる実景のカットは外す
  const mi = (no, ci) => pg.evaluate(([no, ci]) => { const A = window.__kinekoma, sc = A.P.scenes.find(s => s.no === no); const r = A.kitPlan(sc, sc.cuts[ci], 0); const l = r.lines.find(x => x.b === 'ミスト'); return [l ? l.t : 'なし', r.basis.includes('t_mist'), r.sum]; }, [no, ci]);
  const pr = await pg.evaluate(() => window.__kinekoma.KIT.filters.filter(x => x.type === 'mist' && x.pri === 'on').length);
  const mv = await mi('2', 1), mn = await mi('1', 0);
  ok(pr === 1, 'いつも付けるミストが無い'); ok(mv[0] === '外す' && mv[1] && !/ミスト/.test(mv[2]), '重ねる実景のミスト：' + mv.join('｜')); ok(/ミスト/.test(mn[0]) && mn[0] !== '外す', 'ふつうのカットのミスト：' + mn.join('｜'));
  console.log('ミスト 重ねる実景', mv[0], '／ふつう', mn[0]);
  await pg.click('[data-a=tab][data-k=shoot]'); await pg.click('[data-a=day] >> nth=0');
  await pg.click('.scard >> nth=0 >> [data-a=openRec]'); await pg.waitForTimeout(200);
  const kb = await pg.evaluate(() => [...document.querySelectorAll('.sheet:last-child .kit .basis button')].map(x => x.dataset.id));
  ok(kb.some(id => /^t_/.test(id)), '記録の画面の機材の根拠に、技術の項目が無い：' + kb.join('、'));
  const tid = kb.find(id => /^t_/.test(id));
  if (tid) { await pg.click(`.sheet:last-child .kit .basis button[data-id=${tid}]`); await pg.waitForTimeout(150); ok(await pg.locator('.sheet:last-child [data-a=openTech]').count() === 1, '技術の項目から「技術の手引きをすべて見る」が無い'); await pg.screenshot({ path: SP + '/t-prin.png' }); }
  console.log(ng.length ? '落ちた ' + ng.length + '件：' + ng.join(' ／ ') : '全部通った');
  console.log('errors', errs); await b.close(); })();
