const PORT = 41234;

const dgram = require("node:dgram");
const server = dgram.createSocket("udp4");

server.on("error", (err) => {
  console.error(`server error:\n${err.stack}`);
  server.close();
});

server.on("message", (msg, rinfo) => {
  console.log(`[${rinfo.address}:${rinfo.port}]: ${msg.toString("hex")}`);
});

server.on("listening", () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(PORT);
