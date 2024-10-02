---
template: true
thumbnail: "./thumbnail.png"
---

# Name of the file

**Level** : ![](https://img.shields.io/badge/Level-Beginner-brightgreen)

## What does it do ? ✨

This lets your ESP32 act as a keyboard communicating with your PC or phone through Bluetooth Low Energy (BLE)

## What hardware is needed ? 💾 🔌

- an ESP32 dev board

## Software dependencies 🌈 📂

- the ESP32 related toolkit, [click here to see how to install it](https://randomnerdtutorials.com/installing-the-esp32-board-in-arduino-ide-windows-instructions/).

- the BLE_Keyboard library which you can't find with Arduino's Library Manager. To do this, download the [ESP32-BLE-Keyboard](https://github.com/T-vK/ESP32-BLE-Keyboard/releases/latest) and unzip it in your libraries folder. To know where your libraries folder is located you can go into `File > Preferences...` and look for "sketchbook location".

## How to run ? 🚀

Assuming everything listed above is installed properly you can upload the code onto your ESP32 as usual.

## Be Careful ⚠️

On slightly larger code than the example it has been observed that connecting is not straight forward. On a bigger project I have to 
1. unpair the ESP32
2. pair it again
3. wait for Windows to recognize it as a keyboard
4. wait for it to disconnect then reconnect (usually takes about 30 seconds)
5. then it works.

It is tedious, but it has the merit of being a stable way of proceeding.

The link above to get the library brings you to the latest stable release, [which we recommend](https://github.com/T-vK/ESP32-BLE-Keyboard/issues/71#issuecomment-973750647), however there might be beta versions on the [release page](https://github.com/T-vK/ESP32-BLE-Keyboard) if you want to try them.

## How to modify ? 🔩 🔨

Honestly the code is really simple, just look at it.

## Additional resources 📄 📗

A very good website with ESP32 related tutorials : [https://randomnerdtutorials.com/](https://randomnerdtutorials.com/)
