const { chromium } = require('playwright');
const SP = process.env.SP;
(async () => { const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  const errs = []; pg.on('pageerror', e => errs.push(e.message));
  const closeAll = async () => { while (await pg.$('.sheet [data-a=close]')) await pg.click('.sheet:last-child [data-a=close]'); };
  await pg.goto('http://localhost:8765/');
  await pg.evaluate(async () => { localStorage.clear(); await new Promise(r => { const q = indexedDB.deleteDatabase('satsueicho'); q.onsuccess = q.onerror = q.onblocked = r; }); });
  await pg.reload(); await pg.setInputFiles('#restore', SP + '/work.json'); await pg.click('[data-a=askYes]'); await pg.waitForTimeout(2500); await closeAll();
  await pg.click('[data-a=tab][data-k=shoot]'); await pg.click('[data-a=day] >> nth=0'); await pg.waitForTimeout(200);
  await pg.click('.scard >> nth=0 >> .camd > summary'); await pg.waitForTimeout(300);
  await pg.evaluate(() => document.querySelector('.scard .figthumb').scrollIntoView({ block: 'center' })); await pg.screenshot({ path: SP + '/g-card.png' });
  await pg.click('.scard >> nth=0 >> .figthumb >> nth=0'); await pg.waitForTimeout(300); await pg.screenshot({ path: SP + '/g-s1c1.png' });
  await closeAll();
  // いくつかのシーンの図を画像に
  const shots = [['2', '1'], ['3', '1'], ['4', '1'], ['6', '2'], ['10', '5'], ['9', '2'], ['5', '1'], ['8', '1']];
  for (const [no, cut] of shots) {
    const ok = await pg.evaluate(([no, cut]) => { const p = JSON.parse(localStorage.getItem('satsueicho.v1.project')); const sc = p.scenes.find(s => s.no === no); const c = sc.cuts.find(x => x.no === cut); const btn = document.createElement('button'); btn.dataset.a = 'openFig'; btn.dataset.sc = sc.id; btn.dataset.id = c.id; document.body.appendChild(btn); btn.click(); btn.remove(); return true; }, [no, cut]);
    await pg.waitForTimeout(300); await pg.screenshot({ path: `${SP}/g-s${no}c${cut}.png` }); await closeAll();
  }
  console.log('errors', errs); await b.close(); })();
