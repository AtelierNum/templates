---
template: true
---

# How to listen Arduino (or any other serial communication) with p5.js

This example uses [p5.serialserver lib](https://github.com/p5-serial/p5.serialport#examples).

You'll need first to install dependencies.

```sh
npm install
```

Then you have to run a server to create a bridge between your p5.js sketch running on browser and your serial port.

```sh
node node_modules/P5.serialserver.startserver.js
```

You'll need to provide the port to listen (you can check with the Arduino IDE which one is the good one) :

```js
// inside sketch.js
// replace * by the right numbers

// Linux
let portName = "/dev/tty.usbmodem****"; // fill in your serial port name here

// Windows
let portName = "dev/ttyUSB*"; // fill in your serial port name here

// MacOS
let portName = "COM*"; // fill in your serial port name here
```

Now you can run the sketch with the hot-reload with

```sh
npm run dev
```

## Main parts

The mosts interesting things happens here :

```js
function serialEvent() {
  incomingData = serial.read();
  console.log("incoming data : ", incomingData);
}
```

The `serialEvent` function is fired each time data is printed on the serial port. It will store data in the variable `incomingData` which can be reused anywhere in the code.

```js
function mousePressed() {
  serial.write(serialMessage);
}
```

We choose here to print the string `Hi Arduino` on the serial port when we click on the canvas.
