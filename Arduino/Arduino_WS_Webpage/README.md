---
template: true
thumbnail: "./thubnail.png"
---

# Arduino <=> Page Web

**Level** : ![](https://img.shields.io/badge/Level-Intermediate-yellow)

## What does it do ? ✨

This is a tiny web server which can distribute web pages and let these pages communicate with an arduino. Your web pages can display, in real time, the data collected by the sensors of your arduino, or ask your arduino to perfom tasks such as updating LEDs or moving motors.

## What hardware is needed ? 💾 🔌

- An arduino
- A computer

## Software dependencies 🌈 📂

- Node.js (has been tested with v18)
- the arduino IDE
- The rest of the dependencies are listed in the package.json

## How to run ? 🚀

### For the first time

1. Have Node.js installed
2. Open the .ino file in the "arduino_src" folder with the Arduino IDE and upload it on your arduino
3. Open the project in Visual Studio Code
4. Open the terminal and enter the command `npm install`, this will install all the libraries needed
5. In the terminal, enter the command `npm run dev` if you are working on it but `npm start` if you want to run it without the auto-reloader.
6. Visit http://localhost/example.html

### Every other time

1. Open the project in Visual Studio Code
2. In the terminal, enter the command `npm run dev` if you are working on it but `npm start` if you want to run it without the auto-reloader.

## How to modify ? 🔩 🔨

You will need to start your arduino code from the one provided in the "arduino_src" folder. Half of this file are comments to tell you how it works.

For the web side, all you need to know is in the "pages" folder. You will find an "example.html" which displays the counter sent by the arduino and shows a button that toggles the built-in LED of the arduino.
The main point is that you need to use on function to send to the arduino "sendToArduino" and "addArduinoListener" to get functions executed upon reception of a message from the arduino.

## Be Careful ⚠️

You cannot upload new code onto the arduino via the Arduino IDE when the webserver is running. You will have to stop it by using Ctrl+C in the terminal.

It is possible to overwhelm the arduino. It has been tested with 100ms delay in between messages. Faster throughput might create problems.

Try to do everything on one page, because changing page will break the connection with the arduino and you will need to wait for a reconnect.
