import * as mqtt from "mqtt";

// // use this version instead if you use the straight MQTT version
// // instead of the "MQTT over websocket" version
// const client = mqtt.connect("mqtt://localhost:" + 1883);
const client = mqtt.connect("ws://localhost:" + 1883);

client.on("connect", function () {
  client.subscribe("node/date");
  client.subscribe("browser/date");
});

client.on("message", function (topic, messageBuffer) {
  const message = messageBuffer.toString();
  console.log(`${topic} : ${message}`);
});

// We send the current date every second only to show the template works
// just remove it
setInterval(() => {
  client.publish("node/date", Date.now().toString());
}, 1000);
