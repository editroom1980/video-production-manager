// 作品データ（.json）に鍵をかけて works/ に置くファイル（.bin）を作る。
// 使い方：node tools/enc.js 作業用/work.json works/minatogawa.bin 鍵
// 形式：'STK1'（4バイト）＋ソルト16バイト＋IV12バイト＋暗号文（AES-256-GCM、最後の16バイトが認証タグ）
// 鍵からの導出：PBKDF2-SHA256・20万回・32バイト（アプリの decryptWork と同じ）
const crypto = require('crypto'), fs = require('fs');
const [src, dst, pass] = process.argv.slice(2);
if (!src || !dst || !pass) { console.error('使い方：node tools/enc.js 元の.json 出力の.bin 鍵'); process.exit(1); }
const salt = crypto.randomBytes(16), iv = crypto.randomBytes(12);
const key = crypto.pbkdf2Sync(Buffer.from(pass, 'utf8'), salt, 200000, 32, 'sha256');
const c = crypto.createCipheriv('aes-256-gcm', key, iv);
const ct = Buffer.concat([c.update(fs.readFileSync(src)), c.final(), c.getAuthTag()]);
fs.writeFileSync(dst, Buffer.concat([Buffer.from('STK1'), salt, iv, ct]));
console.log('鍵をかけました：', dst, fs.statSync(dst).size, 'バイト');
