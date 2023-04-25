# Strobe

**Level** : ![](https://img.shields.io/badge/Level-Intermediate-yellow)

## What does it do ? ✨

This tempalte shows how to use neopixels and an ESP32 to produce consistent flashes. With an ESP32 this template achieved less than a millisecond of delta between two loops.

Unless you need **really** consistent flashes you probably don't need this template, a UNO can achieve 2~3 milliseconds of delta if it goes at fast as it can and only need to worry about the LEDs.

This template should work on any board, but the faster the better. Putting this on a UNO isn't going to change much.

## What hardware is needed ? 💾 🔌

- An ESP32
- Some ws2812B (a.k.a. Neopixels)
- A computer

## Software dependencies 🌈 📂

- the arduino IDE
- the library for neopixels by adafruit
- [the toolchain for compiling and uploading to an ESP32](https://randomnerdtutorials.com/installing-the-esp32-board-in-arduino-ide-windows-instructions/)

## How to run ? 🚀

- once everything is installed and wired up, just plug the ESP32 and press the "upload" button.

## How to modify ? 🔩 🔨

- open the serial plotter and tweak `flashesPerSecond`, `boardDependentOffset`, and `deltaCompensation` to suit your needs.

## How one could improve the template 🦾
- using FreeRTOS to see if having a task scheduler could improve the consistency.
- using the second core of the ESP32 to offload **everything** that isn't related to the LEDs
- ditch the ws2812B because we might just be limited by their communication protocole and their chip.