module.exports = {
  globDirectory: 'build/', /* build folder */
  globPatterns: [
    '**/*.{html,json,js,css}' /* cached files */
  ],
  swDest: 'build/sw.js', /* destination SW file */
  swSrc: "sw-src.js" /* configuration SW file */
};