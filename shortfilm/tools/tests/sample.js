const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const pg = await b.newPage({ viewport: { width: 390, height: 844 } });
  const errs = []; pg.on('pageerror', e => errs.push(e.message));
  const LS = () => pg.evaluate(() => JSON.parse(localStorage.getItem('satsueicho.v1.project')));
  await pg.goto('http://localhost:8765/');
  await pg.click('text=見本で試す'); await pg.waitForTimeout(500);
  let P = await LS(); console.log('sample scenes', P.scenes.length, 'days', P.days.length);
  if (await pg.$('.sheet [data-a=close]')) await pg.click('.sheet:last-child [data-a=close]');
  await pg.click('[data-a=tab][data-k=shoot]'); await pg.click('.scard >> nth=0 >> [data-a=openRec]');
  await pg.click('[data-a=recResult][data-r=NG]'); await pg.click('[data-a=recResult][data-r=OK]');
  await pg.click('.sheet:last-child [data-a=close]');
  P = await LS(); console.log('takes', P.takes.map(t => t.n + t.r).join(','));
  await pg.click('[data-a=tab][data-k=log]'); console.log('log rows', await pg.locator('.take').count());
  for (const t of ['docs', 'plan', 'out']) await pg.click(`[data-a=tab][data-k=${t}]`);
  // 資料の読み取り：tools/local/files/ に香盤表（kouban.xlsx）と台本（daihon.docx）を置いたときだけ試す（もとの資料は公開しないので）
  const fs = require('fs'), fa = process.env.SP + '/files/kouban.xlsx', fb = process.env.SP + '/files/daihon.docx';
  if (fs.existsSync(fa) && fs.existsSync(fb)) { await pg.setInputFiles('#file', [fa, fb]); await pg.waitForSelector('[data-a=pendAll]'); console.log('pending ok', await pg.locator('.pend').count()); }
  else console.log('資料の読み取りは、tools/local/files/ に資料が無いので飛ばしました');
  console.log('errors', errs); await b.close(); })();
