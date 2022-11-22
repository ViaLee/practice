const OFFLINE_CACHE = "sw_fetchCache"; //缓存空间key

// self.addEventListener('install', function (event) {

// 	// Activate right away
// 	self.skipWaiting();
//   console.log('立刻生效')
// })
// 动态资源

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
  console.log("claim");
});

self.addEventListener("fetch", function (e) {
  if (`${e.request.url}`.includes("/msurvey/paperUnion/paperList")) {
    e.respondWith(
      fetch(e.request.url, {
        headers: e.request.headers,
      })
        .then((res) => {
          console.log("sw 发起 fetch 成功");
          caches.open(OFFLINE_CACHE).then(function (cache) {
            cache.put(e.request.url, res.clone());
          });
          return Promise.resolve(res.clone());
        })
        .catch(async function (err) {
          console.error("原请求失败 取缓存", err);
          const cache = await caches.open(OFFLINE_CACHE);
          const resFromCache = await cache.match(e.request.url);
          console.error("cache中匹配", resFromCache.clone().json());
          return Promise.resolve(resFromCache.clone());
        })
    );
  }
});