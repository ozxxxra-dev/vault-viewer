// 電波がなくてもアプリの画面を開けるように、画面の部品を端末に保存する（ノートの中身は IndexedDB 側）
const CACHE = "vault-viewer-v1";
const SHELL = ["./", "index.html", "manifest.webmanifest", "icon.svg",
  "https://cdn.jsdelivr.net/npm/marked@12.0.2/marked.min.js",
  "https://cdn.jsdelivr.net/npm/dompurify@3.1.6/dist/purify.min.js"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const url = e.request.url;
  // Googleのログインとドライブへの問い合わせは保存しない
  if (e.request.method !== "GET" || /googleapis\.com|accounts\.google\.com|gstatic\.com/.test(url)) return;
  // 画面の部品：まずネットから取り、つながらなければ保存したものを使う
  e.respondWith(fetch(e.request).then((r) => {
    const copy = r.clone();
    caches.open(CACHE).then((c) => c.put(e.request, copy));
    return r;
  }).catch(() => caches.match(e.request)));
});
