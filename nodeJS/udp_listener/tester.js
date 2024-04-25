const dgram = require("node:dgram");
const client = dgram.createSocket("udp4");

client.connect(41234, "localhost", () => {
  setInterval(() => {
    client.send(new Uint8Array([Math.floor(Math.random() * 255)]));
  }, 1000);
});
