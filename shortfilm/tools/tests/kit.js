// 機材の登録・カットごとの組み合わせ・テイクへの記録・資料の更新や全部消すで機材が消えないこと
const { chromium } = require('playwright');
const SP = process.env.SP, fs = require('fs');
(async () => { const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const errs = []; pg.on('pageerror', e => errs.push(e.message));
  const closeAll = async () => { while (await pg.$('.sheet [data-a=close]')) await pg.click('.sheet:last-child [data-a=close]'); };
  const KIT = () => pg.evaluate(() => JSON.parse(localStorage.getItem('satsueicho.v1.kit') || 'null'));
  await pg.goto('http://localhost:8765/');
  await pg.evaluate(async () => { localStorage.clear(); await new Promise(r => { const q = indexedDB.deleteDatabase('satsueicho'); q.onsuccess = q.onerror = q.onblocked = r; }); });
  await pg.reload(); await pg.setInputFiles('#restore', SP + '/work.json'); await pg.click('[data-a=askYes]'); await pg.waitForTimeout(2500); await closeAll();
  // 登録する前は、案内だけが出る
  await pg.click('[data-a=tab][data-k=shoot]'); await pg.click('[data-a=day] >> nth=0');
  await pg.click('.scard >> nth=0 >> [data-a=openRec]'); await pg.waitForTimeout(200);
  console.log('登録前の案内', (await pg.textContent('.sheet:last-child .kit')).replace(/\s+/g, ' ').trim().slice(0, 40));
  await closeAll();
  // 出力 → 設定 → 機材 で登録する
  await pg.click('[data-a=tab][data-k=out]'); await pg.click('#v-out [data-a=openKit]');
  const put = async (c, i, f, v) => { const sel = `.sheet:last-child [data-kit^="${c}|"][data-kit$="|${f}"] >> nth=${i}`; const el = pg.locator(sel); if ((await el.evaluate(e => e.tagName)) === 'SELECT') await el.selectOption(v); else { await el.fill(v); await el.dispatchEvent('change'); } await pg.waitForTimeout(60); };
  const add = async c => { await pg.click(`.sheet:last-child [data-a=kitAdd][data-c=${c}]`); await pg.waitForTimeout(80); };
  await add('cams'); await put('cams', 0, 'name', 'FX6'); await put('cams', 0, 'nd', '1/4〜1/128'); await put('cams', 0, 'g', '890');
  await add('lenses'); await put('lenses', 0, 'name', 'FE 24-70mm F2.8 GM II'); await put('lenses', 0, 'g', '695');
  await add('lenses'); await put('lenses', 1, 'name', 'FE 50mm F1.4 GM'); await put('lenses', 1, 'g', '516');
  await add('filters'); await put('filters', 0, 'name', 'ブラックミスト 1/4'); await put('filters', 0, 'type', 'mist');
  await add('sups'); await put('sups', 0, 'name', '三脚');
  await add('sups'); await put('sups', 1, 'name', 'RS 4 Pro'); await put('sups', 1, 'type', 'gimbal'); await put('sups', 0, 'kg', '4.5');
  await add('sups'); await put('sups', 2, 'name', '一脚'); await put('sups', 2, 'type', 'mono');
  let K = await KIT(); console.log('登録', K.cams.length, K.lenses.length, K.filters.length, K.sups.length, 'レンズの自動入力', K.lenses.map(l => `${l.min}-${l.max || ''} F${l.f}`).join('／'));
  await pg.screenshot({ path: SP + '/k-sheet.png', fullPage: false });
  await pg.evaluate(() => document.querySelector('.sheet:last-child .sheet-body').scrollTop = 0); await pg.waitForTimeout(100); await pg.screenshot({ path: SP + '/k-sheet-top.png' });
  console.log('三脚に積める重さの欄', await pg.locator('.sheet:last-child [data-kit$="|kg"]').count(), '（ジンバルだけなら 1）');
  await closeAll();
  // カットごとの組み合わせ（関数で直接たずねる）
  const ask = (no, ci, k) => pg.evaluate(([no, ci, k]) => { const A = window.__kinekoma, sc = A.P.scenes.find(s => s.no === no); const r = A.kitPlan(sc, sc.cuts[ci], k); return r.lines.map(l => `${l.b}:${l.t}${l.warn ? '!' + l.warn : ''}`).join(' | '); }, [no, ci, k]);
  console.log('S#1 C1 案A', await ask('1', 0, 0));
  console.log('S#1 C3 案A', await ask('1', 2, 0));
  console.log('S#6 C1 夜', await ask('6', 0, 0));
  console.log('S#9 C4 地下', await ask('9', 3, 0));
  console.log('S#2 C2 重ねる実景', await ask('2', 1, 0));
  const dk = await pg.evaluate(() => { const sc = window.__kinekoma.P.scenes.find(s => s.no === '10'); const c = sc.cuts[3]; return (c.alts || []).findIndex(a => a.gim) + 1; });
  console.log('S#10 C4 案D', dk ? await ask('10', 3, dk) : '案D がありません');
  // ジンバルに載らない重さ・センサーの小さいカメラ
  await pg.evaluate(() => { const A = window.__kinekoma; A.KIT.sups.find(s => s.type === 'gimbal').kg = '1'; A.KIT.cams.push({ id: 'x', name: 'α6700', sensor: 's35', g: '493' }); A.S.kitCam = 'x'; });
  console.log('重さの知らせ・APS-C', dk ? await ask('10', 3, dk) : '');
  await pg.evaluate(() => { const A = window.__kinekoma; A.KIT.sups.find(s => s.type === 'gimbal').kg = '4.5'; A.KIT.cams = A.KIT.cams.filter(c => c.id !== 'x'); A.S.kitCam = null; A.kitSave(); });
  // 記録の画面に出て、テイクに残る
  await pg.click('[data-a=tab][data-k=shoot]'); await pg.click('.scard >> nth=0 >> [data-a=openRec]'); await pg.waitForTimeout(200);
  await pg.evaluate(() => document.querySelector('.sheet:last-child .kit').scrollIntoView({ block: 'center' })); await pg.screenshot({ path: SP + '/k-rec-dark.png' });
  await pg.click('[data-a=recResult][data-r=OK]'); await pg.waitForTimeout(200); await closeAll();
  let pj = await pg.evaluate(() => JSON.parse(localStorage.getItem('satsueicho.v1.project')));
  console.log('テイクの機材', pj.takes[0] && pj.takes[0].kit);
  const csv = await pg.evaluate(() => window.__kinekoma.scriptCsv().slice(0, 2).map(r => [r[8], r[7]].join('=')).join(' / '));
  console.log('CSV の機材の列', csv);
  // 資料の更新・全部消す・控えの読み込みで、機材は消えない。消した機材は足し直さない
  await pg.evaluate(async () => { const A = window.__kinekoma, j = JSON.parse(JSON.stringify(A.P)); j.kit = JSON.parse(JSON.stringify(A.KIT)); await A.mergeProject(j); });
  K = await KIT(); console.log('資料の更新のあと', K.cams.length + K.lenses.length + K.filters.length + K.sups.length);
  await pg.evaluate(() => { window.__kinekoma.kitAdopt({ lenses: [{ name: '新しいレンズ 85mm F1.8', min: '85', f: '1.8' }] }); });
  await pg.evaluate(() => { const A = window.__kinekoma; A.KIT.lenses = A.KIT.lenses.filter(l => !/新しい/.test(l.name)); A.kitSave(); A.kitAdopt({ lenses: [{ name: '新しいレンズ 85mm F1.8', min: '85', f: '1.8' }] }); });
  K = await KIT(); console.log('消したものは足し直さない', !K.lenses.some(l => /新しい/.test(l.name)));
  await pg.click('[data-a=tab][data-k=out]'); await pg.click('[data-a=wipe]'); await pg.click('[data-a=askYes]'); await pg.waitForTimeout(500);
  K = await KIT(); console.log('全部消すのあと', K.cams.length + K.lenses.length + K.filters.length + K.sups.length);
  // 明るい表示の見た目
  await pg.setInputFiles('#restore', SP + '/work.json'); await pg.click('[data-a=askYes]'); await pg.waitForTimeout(2500); await closeAll();
  await pg.evaluate(() => { const A = window.__kinekoma; A.S.theme = 'light'; A.applyTheme(); });
  await pg.click('[data-a=tab][data-k=shoot]'); await pg.click('[data-a=day] >> nth=0'); await pg.click('.scard >> nth=0 >> [data-a=openRec]'); await pg.waitForTimeout(200);
  await pg.evaluate(() => document.querySelector('.sheet:last-child .kit').scrollIntoView({ block: 'center' })); await pg.screenshot({ path: SP + '/k-rec-light.png' });
  console.log('errors', errs); await b.close(); })();
