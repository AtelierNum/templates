const { networkInterfaces } = require("os");
const { WebSocketServer } = require("ws");
const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const express = require("express");
const { join } = require("path");
const path = require("path");
const { readFileSync } = require("fs");

const config = JSON.parse(readFileSync(join(__dirname, "config.json")));

const app = express();
const expressPort = config.HTTP_PORT;

const wsPort = config.WS_PORT;
const wsServer = new WebSocketServer({ port: wsPort });
let sockets = [];
let serials = [];
let dataState = '{"uninitialized":true}';

wsServer.on("connection", (s) => {
  s.on("message", (m) => serials.forEach((s) => s.write(m)));
  sockets.push(s);
});
wsServer.on(
  "close",
  (closing) => (sockets = sockets.filter((s) => s != closing))
);

SerialPort.list().then((portListings) => {
  portListings.forEach((portListing) => {
    try {
      const port = new SerialPort({ path: portListing.path, baudRate: 115200 });
      serials.push(port);

      port.on("close", () => {
        serials = serials.filter((s) => s != port);
      });

      port.on("error", (e) => console.error(e));

      const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));
      parser.on("data", (data) => {
        dataState = data;
        console.log(`${data} => ${dataState}`);
        sockets.forEach((s) => s.send(dataState));
      });
    } catch (e) {
      console.error(e);
    }
  });
});

app.get("/", (req, res) => {
  res.send(
    "The server is online, but this is probably not the URL you want to use. Try the <a href='/example.html'>example</a> maybe?"
  );
});
app.get("/config", (req, res) => {
  res.sendFile(path.join(__dirname, "config.json"));
});

app.use(express.static("pages"));
app.listen(expressPort, () => {
  console.log(getDebugInfo());
  console.log(networkInterfaces());
});

function getDebugInfo() {
  return `
    HTTP port : ${expressPort}
    WS port : ${wsPort}
    dataState : ${dataState}
    `;
}
