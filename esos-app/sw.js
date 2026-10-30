const C='legency-esos-v60';
const A=['./','./index.html','./manifest.webmanifest','./legency-icon-192.png','./legency-icon-512.png','./legency-icon-maskable-512.png','./legency-apple-180.png','./legency-fav-32.png','./legency-fav-48.png','./logo.png','./pdfjs/pdf.min.js','./pdfjs/pdf.worker.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(A)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const u=e.request.url;
 if(u.includes('googleapis.com')||u.includes('firebaseio.com')||u.includes('firebasestorage')||u.includes('gstatic.com'))return; // never intercept Firebase traffic
 e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>{const n=fetch(e.request).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp))}return res}).catch(()=>r||caches.match('./index.html'));return r||n}))});
