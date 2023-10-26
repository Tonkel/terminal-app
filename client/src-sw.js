const { offlineFallback, warmStrategyCache } = require("workbox-recipes");
const { CacheFirst } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: "page-cache",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ["/index.html", "/"],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === "navigate", pageCache);

// TODO: Implement asset caching
registerRoute(({ request }) => {
  console.log(request);
  return (
    // CSS
    request.destination === "style" ||
    // JavaScript
    request.destination === "script" ||
    //images
    request.destination === "image"
  );
});

//implements offline fallback
const pageFallBack = "offline.html";

offlineFallback();

//I just wrote all this from a youtube video just for her to say this can all be handled with a single function.

// self.addEventListener("install", (event) => {
//   const files = [pageFallBack];

//   event.waitUntil(
//     self.caches
//       .open("workbox-offline-fallbacks")
//       .then((cache) => cache.addAll(files))
//   );
// });

// //handler for errors in calls to offline cache

// const handler = async (options) => {
//   const cache = await self.caches.open("workbox-offline-fallbacks");

//   if (
//     options.request.destination === "document" ||
//     "image" ||
//     "style" ||
//     "script"
//   ) {
//     //if any of these documents requested match the cached files, respond with file, if not, return error
//     return (await cache.match(pageFallBack)) || Response.error();
//   }

//   return Response.error();
// };

// setCatchHandler(handler);
