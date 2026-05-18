---
template: true
title: ESP32 <-BLE-> webpage
thumbnail: thumbnail.jpg
description: This enable communication between some arbitrary webpage and a nearby ESP32 through BLE
language: en
tags:
  - esp32
  - BLE
  - webBLE
---

# ESP32 WebBLE

**Level** : ![](https://img.shields.io/badge/Level-Intermediate-yellow)

## What does it do ? ✨

This template allows you to send data from your client-side JS to an ESP32.

## What hardware is needed ? 💾 🔌

An ESP32 and a device which can run Chromium or Google Chrome.

## Software dependencies 🌈 📂

You need the arduino IDE with the ESP32 package.

https://randomnerdtutorials.com/installing-the-esp32-board-in-arduino-ide-windows-instructions/

## How to run ? 🚀

Serve the webpage however you want, could be locally or through Github Pages and upload the `.ino` file to your ESP32.

## How to modify ? 🔩 🔨

In the `onWrite()` callback you can decide what you do with the data you received.

## Be Careful ⚠️

- This only works through Chromium and Google Chrome.
  - https://caniuse.com/web-bluetooth
- Only one computer can connect to the ESP32 at a time.
- The instructions in the callback should be small and quick
  - if you need to do a fair amount of work, have global boolean to act a flag and then have something like this is the `loop()`

```ino
void loop(){
  if(shouldDoWork){
    shouldDoWork = false;

    // here goes the things that take time
  }
}
```
