importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js'); /* load workbox v5*/

workbox.core.setCacheNameDetails({ /* cache description*/
  prefix: 'my-app',
  suffix: 'v1',
  precache: 'install-time',
  runtime: 'run-time',
});

workbox.precaching.precacheAndRoute([{"revision":"55f538864558fe07a90efcbd99827c18","url":"css/style.css"},{"revision":"94b81fcafea82898483e2a33929fce01","url":"index.html"},{"revision":"8b9245854913554e7f9450c9253e1319","url":"js/script.js"},{"revision":"4d0dc03b891bee9ae4912cee613ff444","url":"manifest.json"}]); /*takes the precache configuration located in the workbox-config */


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