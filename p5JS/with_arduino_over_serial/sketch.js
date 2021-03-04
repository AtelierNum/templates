
let serial;          // variable to hold an instance of the serialport library
let portName = 'dev/ttyUSB0';  // fill in your serial port name here

let incomingData;
let serialMessage = 'Hi Arduino';



function setup() {
  createCanvas(400, 300);
  
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing

  serial.open(portName);              // open a serial port
}

function draw(){
  background(0);

  fill(255);
  text(incomingData, 100, 100);
}

function mousePressed(){
  serial.write(serialMessage);
}

function serverConnected() {
  console.log('Serial communication started.');
}

function portOpen() {
  console.log('Serial port is open.')
}

function serialEvent() {
  incomingData = serial.read();
  console.log('incoming data : ', incomingData)
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('Serial port closed.');
}
