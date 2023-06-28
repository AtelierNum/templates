const client = mqtt.connect("ws://localhost:" + 1883);
client.subscribe("browser/date");
client.subscribe("node/date");

client.on("message", function (topic, payload) {
  const messageStack = document.querySelector("#messages");
  messageStack.innerHTML += "<br>" + `${topic} : ${payload}`;
  console.log(`${topic} : ${payload}`);
});

// We send the current date every second only to show the template works
// just remove it
setInterval(() => {
  client.publish("browser/date", Date.now().toString());
}, 1000);
