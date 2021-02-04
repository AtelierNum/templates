module.exports = {
  globDirectory: 'docs/', /* build folder */
  globPatterns: [
    '**/*.{html,json,js,css}' /* cached files */
  ],
  swDest: 'docs/sw.js', /* destination SW file */
  swSrc: "sw-src.js" /* configuration SW file */
};