---
template: true
title: Micro-SD datalogging
thumbnail: thumbnail.jpg
description: Periodically log data onto a micro-SD card
language: en
tags:
  - sd
  - logger
---

# Micro-SD datalogging

**Level** : ![](https://img.shields.io/badge/Level-Intermediate-yellow)

## What does it do ? ✨

This showcases how to periodically save data onto an SD card and how to "eject" it when a user presses on a button.

## What hardware is needed ? 💾 🔌

- SPI micro-sd card reader
- arduino UNO
- button

## Software dependencies 🌈 📂

None, all the libs are provided with the arduion IDE

## How to run ? 🚀

As usual, upload it to the card

## How to modify ? 🔩 🔨

Just replace the `millis()` with your own data.

## Be Careful ⚠️

- Not ejecting your file might lead to its [bricking](<https://en.wikipedia.org/wiki/Brick_(electronics)>)
- If you're trying to write fast, you should `file.flush` once in a while to make sure the write stream doesn't get saturated.

## Additional resources 📄 📗

https://docs.arduino.cc/libraries/sd/
