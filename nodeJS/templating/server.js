const liveServer = require("live-server");

var params = {
  port: 8181,
  host: "0.0.0.0",
  open: true,
  file: "index.html",
  wait: 50,
  ignore: "index.hbs,partials/**,pages/**", // the compiler.js handle those with chokidar
  noCssInject: true,
};
liveServer.start(params);
