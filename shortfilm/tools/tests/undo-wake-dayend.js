const { chromium } = require('playwright');
const SP = process.env.SP;
(async () => { const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, acceptDownloads: true }); const pg = await ctx.newPage();
  const errs = []; pg.on('pageerror', e => errs.push(e.message));
  await pg.addInitScript(() => { window.__wake = 0; Object.defineProperty(navigator, 'wakeLock', { configurable: true, value: { request: async () => { window.__wake++; const l = new EventTarget(); l.release = async () => { window.__wake--; l.dispatchEvent(new Event('release')); }; return l; } } }); });
  const closeAll = async () => { while (await pg.$('.sheet [data-a=close]')) await pg.click('.sheet:last-child [data-a=close]'); };
  const LS = () => pg.evaluate(() => JSON.parse(localStorage.getItem('satsueicho.v1.project')));
  await pg.goto('http://localhost:8765/');
  await pg.evaluate(async () => { localStorage.clear(); await new Promise(r => { const q = indexedDB.deleteDatabase('satsueicho'); q.onsuccess = q.onerror = q.onblocked = r; }); });
  await pg.reload(); await pg.setInputFiles('#restore', SP + '/work.json'); await pg.click('[data-a=askYes]'); await pg.waitForTimeout(2500); await closeAll(); await pg.waitForTimeout(1500);
  // 設定：B カメを足す
  await pg.click('[data-a=tab][data-k=out]'); await pg.click('[data-a=fld][data-k=cam2]'); await pg.waitForTimeout(100);
  console.log('欄の設定', await pg.$$eval('[data-a=fld]', a => a.map(x => x.textContent + ':' + x.getAttribute('aria-checked')).join(' ')));
  await pg.click('[data-a=tab][data-k=shoot]'); await pg.click('[data-a=day] >> nth=0');
  await pg.click('.scard >> nth=0 >> [data-a=openRec]'); await pg.waitForTimeout(300);
  console.log('画面を消さない（記録の画面）', await pg.evaluate(() => window.__wake));
  await pg.screenshot({ path: `${SP}/n-rec.png` });
  await pg.fill('#rc-clip', 'A001C001_231105AB'); await pg.fill('#rc-clip2', 'B001C001_231105CD'); await pg.fill('#rc-snd', 'ZOOM0001');
  await pg.type('#rc-tc', '01020304'); console.log('タイムコード', await pg.inputValue('#rc-tc'));
  // 押し間違い → 取り消す
  await pg.click('[data-a=recResult][data-r=OK]'); await pg.waitForTimeout(200);
  console.log('記録', (await LS()).takes.length, '知らせ', await pg.textContent('#toast'));
  await pg.screenshot({ path: `${SP}/n-undo.png` });
  await pg.click('#toast [data-a=undo]'); await pg.waitForTimeout(300);
  const P1 = await LS(); console.log('取り消し後', P1.takes.length, 'カット', await pg.$eval('[data-a=recCut][aria-pressed=true]', x => x.textContent), 'ファイル名', await pg.inputValue('#rc-clip'), 'テイク', await pg.inputValue('#rc-n'));
  await pg.type('#rc-tc', '01020304');
  await pg.click('[data-a=recResult][data-r=NG]'); await pg.waitForTimeout(100);
  await pg.type('#rc-tc', '01030000'); await pg.click('[data-a=recResult][data-r=OK]'); await pg.waitForTimeout(100);
  console.log('テイク', (await LS()).takes.map(t => `${t.n}${t.r} ${t.clip} ${t.clip2} ${t.snd} ${t.tc}`));
  await closeAll(); await pg.waitForTimeout(200); console.log('閉じたら画面を消す', await pg.evaluate(() => window.__wake));
  // 撮影の終わり：その日のシーンをすべて撮了にする
  const n = await pg.$$eval('.scard [data-a=sceneDone][aria-pressed=false]', a => a.length);
  for (let i = 0; i < n; i++) { await pg.click('.scard [data-a=sceneDone][aria-pressed=false] >> nth=0'); await pg.waitForTimeout(150); }
  await pg.waitForTimeout(1500); console.log('撮影の終わりの知らせ', !!(await pg.$('.sheet [data-a=pdfDay]')));
  await pg.screenshot({ path: `${SP}/n-dayend.png` });
  await pg.click('.sheet [data-a=pdfDay]'); await pg.waitForSelector('.pdfpages img', { timeout: 30000 }); console.log('この日の PDF', await pg.textContent('.pdfinfo .small'));
  const [dl] = await Promise.all([pg.waitForEvent('download'), pg.click('[data-a=pdfSave]')]); await dl.saveAs(SP + '/day.pdf');
  await closeAll();
  await pg.click('[data-a=tab][data-k=out]'); await pg.waitForTimeout(200); await pg.screenshot({ path: `${SP}/n-out.png` });
  console.log('出力の数', await pg.$eval('.outhero .small', x => x.textContent));
  await pg.selectOption('#outDayF', 'all'); await pg.selectOption('#outScenes', 'all'); await pg.waitForTimeout(100);
  console.log('撮っていないシーンも', await pg.$eval('.outhero .small', x => x.textContent));
  console.log('errors', errs); await b.close(); })();
