const { chromium } = require('playwright');
const SP = process.env.SP;
(async () => { const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 390, height: 844 } });
  const errs = []; pg.on('pageerror', e => errs.push(e.message));
  await pg.goto('http://localhost:8765/');
  await pg.evaluate(async () => { localStorage.clear(); await new Promise(r => { const q = indexedDB.deleteDatabase('satsueicho'); q.onsuccess = q.onerror = q.onblocked = r; }); });
  await pg.reload();
  await pg.setInputFiles('#restore', SP + '/work.json'); await pg.click('[data-a=askYes]'); await pg.waitForTimeout(2500);
  if (await pg.$('.sheet [data-a=close]')) await pg.click('.sheet:last-child [data-a=close]');
  await pg.click('[data-a=tab][data-k=docs]'); await pg.screenshot({ path: SP + '/v-docs.png' });
  for (const k of ['book', 'koban', 'check', 'post', 'script']) {
    await pg.click(`#v-docs [data-a=view][data-k=${k}]`); await pg.waitForTimeout(300);
    await pg.screenshot({ path: SP + `/v-${k}.png` });
    if (k === 'book') { await pg.evaluate(() => document.querySelector('.sheet:last-child .sheet-body').scrollTo(0, 1500)); await pg.screenshot({ path: SP + '/v-book2.png' }); await pg.click('.sheet:last-child .imgs figure >> nth=0'); await pg.waitForTimeout(200); console.log('img open', await pg.evaluate(() => document.querySelectorAll('.sheet').length)); await pg.click('.sheet:last-child [data-a=close]'); }
    const over = await pg.evaluate(() => { const b = document.querySelector('.sheet:last-child .sheet-body'); return b.scrollWidth - b.clientWidth; });
    if (over > 0) console.log('はみ出し', k, over);
    await pg.click('.sheet:last-child [data-a=close]');
  }
  console.log('errors', errs); await b.close(); })();
