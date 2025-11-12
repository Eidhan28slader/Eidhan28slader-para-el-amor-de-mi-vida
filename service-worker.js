// SW simple para cachear archivos y permitir abrir sin conexión
const CACHE = "amor-v1";
const ASSETS = [
  "./carta-4-meses.html",
  "./manifest.webmanifest",
  "./musica.mp3",
  "./foto1.jpg","./foto2.jpg","./foto3.jpg","./foto4.jpg","./foto5.jpg","./foto6.jpg",
  "./icon-192.png","./icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k!==CACHE).map(k => caches.delete(k))))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
