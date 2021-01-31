const CACHE_NAME = 'version-1'
const urlsToCache = ['index.html', 'offline.html']

//Install Service Worker
//Listen to request
//Activate the service worker

const self = this;
self.addEventListener('install', (event)=>{
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache)=>{
                console.log('opened cache')
                cache.addAll(urlsToCache)
          }
        )
    )
})

self.addEventListener('fetch', (event)=>{
    event.respondWith(
        caches.match(event.request)
        .then(()=>fetch(event.request))
        .catch(()=>caches.match('offline.html'))
    )   
})

self.addEventListener('activate', (event)=>{
    const cacheWhiteList = []
    cacheWhiteList.push(CACHE_NAME)
    event.waitUntil(
        caches.keys().then((cacheNames)=>Promise.all(
            cacheNames.map(()=>{
                if(!cacheNames.include(cacheName))
                {
                    return caches.delete(cacheName)
                }
            })
        ))
    )
})