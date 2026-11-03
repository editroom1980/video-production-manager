// 撮影現場で電波が弱くても使えるように、アプリと読み取り用の部品を端末に残す。
const CACHE = 'satsueicho-v19';
const CORE = ['./', './index.html', './manifest.json', './apple-touch-icon.png', './icon-192.png', './icon-512.png'];
const LIBS = ['./lib/xlsx.full.min.js', './lib/mammoth.browser.min.js', './lib/pdf.min.js', './lib/pdf.worker.min.js', './lib/fonts/bebas-neue.woff2', './lib/fonts/jetbrains-mono-500.woff2', './lib/fonts/jetbrains-mono-700.woff2'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE)
    .then(c => Promise.all(CORE.map(u => fetch(new Request(u, { cache: 'no-store' })).then(r => r.ok && c.put(u, r)))).then(() => c.addAll(LIBS).catch(() => {})))
    .then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// ネットにつながるときは必ずサーバーから新しいものを取り、つながらないときだけ残してあるものを使う。
// （画面の読み込み＝navigate のリクエストをそのまま作り直すと Safari で失敗することがあるので、URL から作り直す）
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  const key = url.origin + url.pathname;
  e.respondWith(
    fetch(new Request(url.href, { cache: 'no-store', credentials: 'same-origin' }))
      .then(res => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(key, copy)); }
        return res;
      })
      .catch(() => caches.match(key).then(r => r || (e.request.mode === 'navigate' ? caches.match(url.origin + url.pathname.replace(/[^/]*$/, '')).then(x => x || caches.match('./index.html')) : undefined)))
  );
});
