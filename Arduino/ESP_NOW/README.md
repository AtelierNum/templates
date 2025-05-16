---
template: true
title: ESP-NOW
thumbnail: thumbnail.jpg
description: Communicate infos locally between 2 ESP32s without Wi-Fi or Bluetooth
language: en
tags:
  - ESP32
  - now
  - esp-now
  - wireless
---

# ESP-NOW: 1 to 1

**Level** : ![](https://img.shields.io/badge/Level-Intermediate-yellow)

## What does it do ? ✨

Communicate infos locally from one ESP32 to another.

## What hardware is needed ? 💾 🔌

- 2 ESP32
- 1 LED (optionnal)

## Software dependencies 🌈 📂

The ESP32 package (can be found in the board manager of your IDE)

## How to run ? 🚀

1.Upload the receiver sketch on one ESP32 then look for its MAC address in the serial monitor
2.Change the destination address in the sender programm and upload it on the other ESP32

## How to modify ? 🔩 🔨

The easiest way would be to use the current message format which sends 2 integers, just put something in those that can be interpreted by the receiver.

You can also change the shape of the messaeg to send another composition of scalars (i.e. not structs, not arrays).

And lastly you could just send whole buffers of bytes instead of a predictably packed struct, but in most cases you shouldn't have to do that.
