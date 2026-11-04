const { chromium } = require('playwright');
const SP = process.env.SP, K = require('fs').readFileSync(SP + '/key.txt', 'utf8').trim();
(async () => { const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 390, height: 844 } });
  const errs = []; pg.on('pageerror', e => errs.push(e.message));
  const LS = () => pg.evaluate(() => JSON.parse(localStorage.getItem('satsueicho.v1.project')));
  const closeAll = async () => { while (await pg.$('.sheet [data-a=close]')) await pg.click('.sheet:last-child [data-a=close]'); };
  await pg.goto('http://localhost:8765/');
  await pg.evaluate(async () => { localStorage.clear(); await new Promise(r => { const q = indexedDB.deleteDatabase('satsueicho'); q.onsuccess = q.onerror = q.onblocked = r; }); });
  await pg.reload();
  // 古い版（カメラ案なし）を入れて、記録を付ける
  await pg.setInputFiles('#restore', SP + '/work-old.json'); await pg.click('[data-a=askYes]'); await pg.waitForTimeout(2500); await closeAll();
  await pg.click('[data-a=tab][data-k=shoot]'); await pg.click('.scard >> nth=0 >> [data-a=openRec]');
  await pg.fill('#rc-clip', 'A001_C001'); await pg.click('[data-a=recResult][data-r=OK]'); await closeAll();
  await pg.click('.scard >> nth=0 >> [data-a=check] >> nth=0');
  let P = await LS(); console.log('before: takes', P.takes.length, 'S1 cuts', P.scenes.find(s => s.no === '1').cuts.length, 'rev', P.rev);
  // リンクを貼って新しい版へ
  await pg.click('[data-a=tab][data-k=out]'); await pg.click('[data-a=openLinkBox]');
  await pg.fill('.sheet:last-child .worklink', `https://x/shortfilm/#open=minatogawa&k=${K}`); await pg.click('.sheet:last-child [data-a=openPasted]');
  await pg.waitForSelector('[data-a=askYes]', { timeout: 15000 }); console.log('ask:', await pg.textContent('.sheet:last-child p'));
  await pg.click('[data-a=askYes]'); await pg.waitForTimeout(2000); await closeAll();
  P = await LS(); const s1 = P.scenes.find(s => s.no === '1');
  console.log('after: takes', P.takes.length, 'take scene ok', !!P.scenes.find(s => s.id === P.takes[0].sc), 'take cut ok', !!s1.cuts.find(c => c.id === P.takes[0].cut), 'S1 cuts', s1.cuts.length, 'cam', !!s1.cuts[0].cam, 'checks', Object.keys(P.checks).length, 'rev', P.rev, 'work', !!P.work);
  // 新しい版が出たときの知らせ
  await pg.addInitScript(() => { if (sessionStorage.getItem('done')) return; sessionStorage.setItem('done', '1'); const p = JSON.parse(localStorage.getItem('satsueicho.v1.project')); p.rev = 1; localStorage.setItem('satsueicho.v1.project', JSON.stringify(p)); });
  await pg.reload(); await pg.waitForTimeout(1500); await closeAll();
  console.log('bar:', await pg.evaluate(() => !document.getElementById('workbar').hidden && document.getElementById('workbar').textContent));
  await pg.click('[data-a=workUpdate]'); await pg.waitForTimeout(3000);
  P = await LS(); console.log('after bar: takes', P.takes.length, 'rev', P.rev, 'bar hidden', await pg.evaluate(() => document.getElementById('workbar').hidden));
  await pg.click('[data-a=tab][data-k=shoot]'); await pg.click('[data-a=day] >> nth=0');
  await pg.click('.scard >> nth=0 >> .camd summary'); await pg.waitForTimeout(200);
  await pg.evaluate(() => document.querySelector('.scard .camd').scrollIntoView()); await pg.screenshot({ path: SP + '/c-card.png' });
  await pg.click('.scard >> nth=0 >> [data-a=openRec]'); await pg.waitForTimeout(200); await pg.screenshot({ path: SP + '/c-rec.png' });
  console.log('errors', errs); await b.close(); })();
