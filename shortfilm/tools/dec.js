// works/ の鍵つき作品データ（.bin）の鍵を外して .json にする。
// 使い方：node tools/dec.js works/minatogawa.bin 作業用/work.json 鍵
// 鍵は、作品を開くリンク（…/shortfilm/#open=minatogawa&k=鍵）の k= の後ろ。リポジトリには書かない。
// 外した .json には台本の本文や連絡先が入っているので、リポジトリに入れない（tools/local/ は .gitignore 済み）。
const crypto = require('crypto'), fs = require('fs');
const [src, dst, pass] = process.argv.slice(2);
if (!src || !dst || !pass) { console.error('使い方：node tools/dec.js 元の.bin 出力の.json 鍵'); process.exit(1); }
const b = fs.readFileSync(src);
if (b.subarray(0, 4).toString() !== 'STK1') { console.error('作品データの形式ではありません'); process.exit(1); }
const salt = b.subarray(4, 20), iv = b.subarray(20, 32), body = b.subarray(32), tag = body.subarray(body.length - 16), ct = body.subarray(0, body.length - 16);
const key = crypto.pbkdf2Sync(Buffer.from(pass, 'utf8'), salt, 200000, 32, 'sha256');
const d = crypto.createDecipheriv('aes-256-gcm', key, iv); d.setAuthTag(tag);
let out; try { out = Buffer.concat([d.update(ct), d.final()]); } catch (e) { console.error('鍵が違います'); process.exit(1); }
fs.writeFileSync(dst, out);
const j = JSON.parse(out.toString('utf8'));
console.log('鍵を外しました：', dst, '第' + (j.rev || 1) + '版', j.title || '');
