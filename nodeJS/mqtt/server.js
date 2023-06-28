///////////////////////////////////////////////
//
// straight MQTT (not compatible with webpages)
//
///////////////////////////////////////////////
// import aedesModule from "aedes";
// import { createServer } from "net";
// const aedes = aedesModule();
// const server = createServer(aedes.handle);

// server.listen(1883, () => {
//   console.log("server started and listening on port ", server.address().port);
// });

///////////////////////////////////////////////
//
// MQTT over websocket (required for webpages)
//
///////////////////////////////////////////////
import aedesModule from "aedes";
const aedes = aedesModule();
import http from "http";
const httpServer = http.createServer();
import ws from "websocket-stream";
const port = 1883;

ws.createServer({ server: httpServer }, aedes.handle);

httpServer.listen(port, function () {
  console.log("mqtt over websocket server listening on port ", port);
});
