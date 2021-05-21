# Wifi sniffer

**Level** : ![](https://img.shields.io/badge/Level-Intermediate-yellow)

## What does it do ? ✨
This template uses a Esp8266 board to sniff all wifi enabled devices that are nearby.
You have basic arduino code, arduino code that communicates data via serial and processing code to visualize the data.

![visualisation](images/screen.png)

## What hardware is needed ? 💾 🔌
- a esp8266 enabled board. (tested with feather esp8266 from adafruit)

## Software dependencies 🌈 📂
- arduino IDE
- you need to follow this guide to work with the feather 8266 in arduino IDE (https://learn.adafruit.com/adafruit-feather-huzzah-esp8266/using-arduino-ide)

## How to run ? 🚀
- upload the code to your arduino board.
- optionnaly run the processing code.

## How to modify ? 🔩 🔨
- arduino code is self explanatory
- the processing code uses the **void serialEvent (Serial myPort) {}** function to receive the data from the board and fills up an ArrayList with unique devices.
- the **Device** stores the mac address, signal power and a timer value (for how long is it in the list) for each device.

## Additional resources 📄 📗
- https://learn.adafruit.com/adafruit-feather-huzzah-esp8266/using-arduino-ide
- https://github.com/kalanda/esp8266-sniffer
- if you have issues with Big Sur and Esp8266 setup for arduino : https://www.esp8266.com/viewtopic.php?f=32&t=21692&start=4#p89464

