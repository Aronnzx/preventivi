const C="argese-prev-v2";
const CORE=["./","./index.html","./manifest.webmanifest","./icon-180.png","./icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE.map(u=>new Request(u,{cache:"reload"})))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request;if(r.method!=="GET")return;const u=new URL(r.url);
  if(r.mode==="navigate"||(u.origin===location.origin&&(u.pathname.endsWith("/")||u.pathname.endsWith(".html")))){
    e.respondWith(fetch(r.url,{cache:"no-store"}).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put("./index.html",cp));return res}).catch(()=>caches.match("./index.html")));return}
  if(u.origin===location.origin||u.hostname.endsWith("fonts.googleapis.com")||u.hostname.endsWith("fonts.gstatic.com")){
    e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{if(res&&(res.ok||res.type==="opaque")){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res})))}
});
