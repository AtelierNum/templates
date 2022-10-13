/*

IT IS NOT EXPECTED THAT YOU WORK ON THIS FILE
but you're welcome to do so if you want :D

*/
const IP = window.location.hostname;
console.log("looking for server at :" + IP);

let sockets = [];
let onMessageListeners = {};

fetch("http://" + IP + "/config")
  .then((response) => response.json())
  .catch((e) => {
    console.error(
      "cannot fetch the configuration of the network, does it exist? Is the server started?"
    );
    console.error(e);
  })
  .then((config) => {
    openWS(config);
  });

function openWS(config) {
  const socket = new WebSocket(`ws://${IP}:${config.WS_PORT}`);
  sockets.push(socket);

  socket.addEventListener("open", (event) => {
    console.log("connected to the web server!");
  });

  socket.addEventListener("close", () => {
    sockets.splice(sockets.indexOf(socket), 1);
    openWS(config);
  });

  socket.addEventListener("message", (event) => {
    let data = {};

    try {
      data = JSON.parse(event.data);
    } catch (e) {
      console.error("malformed JSON : ");
      console.dir(e);
    }

    const [messageType, message] = Object.entries(data)[0];
    if (onMessageListeners[messageType]) {
      onMessageListeners[messageType].forEach((l) => l(message));
    }
  });
}

export function sendToArduino(commandsString) {
  if (commandsString[commandsString.length - 1] != ",") {
    commandsString += ",";
  }
  sockets.forEach((s) => s.send(commandsString));
}

//TODO : maybe return a UUID and give a function to unbind a listener?
export function addArduinoListener(type, fn) {
  console.log("adding cb for : " + type);

  if (typeof type != "string") {
    throw "the listener type (first parameter of addArduinoListener) must be a string";
  }

  if (onMessageListeners[type]) {
    onMessageListeners[type].push(fn);
  } else {
    onMessageListeners[type] = [fn];
  }

  console.dir(onMessageListeners);
}
