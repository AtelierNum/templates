//define the adress and port used for receiving messages
const oscServerPort = 12000;
const oscServerAddress = "127.0.0.1";

//define the adress and port used for sending messages
const oscTestClientPort = 12001;
const oscTestClientAddress = "127.0.0.1";

//import the osc-library and create the outgoing and incoming connections
const osc = require("node-osc");
const oscServer = new osc.Server(oscServerPort, oscServerAddress);
const oscClient = new osc.Client(oscTestClientAddress, oscTestClientPort);

oscServer.on("message", function (msg, rinfo) {
	//inside here is what we do when we receive a message
	console.dir(msg);
	console.dir(rinfo);
});

oscServer.on("listening", () => {
	//inside here is what we do when our incoming connection is ready
	console.log(
		`OSC server is listening on :${oscServerAddress}:${oscServerPort}`
	);
});

//all the code below concerns the outgoing connection
//the setInterval block is used to do some actions on repeat
//in this case we send a random number through the outgoing connection
console.log(
	`A test client is sending data toward :${oscTestClientAddress}:${oscTestClientPort}`
);
setInterval(() => {
	//this line below is how you would send a message through the outgoing connection
	oscClient.send("/someOscAdress", Math.random() * 1337);
}, 1000);
