importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js'); /* load workbox v5*/

workbox.core.setCacheNameDetails({ /* cache description*/
  prefix: 'my-app',
  suffix: 'v1',
  precache: 'install-time',
  runtime: 'run-time',
});

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST); /*takes the precache configuration located in the workbox-config */


/*apply the stale while revalidate strategy to all files with an html | css | js | json extension*/
workbox.routing.registerRoute(
   /\.(?:html|css|js|json)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'all-cache', /* cache name */
    plugins: [  
      new workbox.expiration.ExpirationPlugin({
        maxAgeSeconds: 60*60*24,/*cache lifecycle in seconds*/
      }),
    ],
  }),
);
/*applies the NetworkOnly strategy to all files with a png | jpg | jpeg | svg | gif | ico extension*/
workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif|ico)$/,
  new workbox.strategies.NetworkOnly({
    cacheName: 'all-img',/* cache name*/
    networkTimeoutSeconds: 10,/*network timeout*/
  }),
);