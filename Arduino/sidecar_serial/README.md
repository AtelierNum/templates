---
template: true
title: I2C -> serial sidecar
description: Print in the serial monitor through a second arduino via I2C
language: en
tags:
  - UART
  - Serial
	- i2c
---

# Serial sidecar

**Level** : ![](https://img.shields.io/badge/Level-Intermediate-yellow)

## What does it do ? ✨

You've got something hooked to your UART port which mean you can't print debug statements into your serial monitor? This is solving that. It provides a sketch for a second arduino and a lib to interact with that second arduino.

## What hardware is needed ? 💾 🔌

A second arduino

## Software dependencies 🌈 📂

None, beside what's provided and the usual Arduino IDE

## How to run ? 🚀

Upload the `sidecar_serial.ino` to your auxiliary arduino and put the `sidecar_link.h` into the folder of your main sketch.

From there you have to import the functionalities provided by the link in your main sketch

```cpp
#include "sidecar_link.h"
```

and init the communication

```cpp
void setup(){
	initSideCarLink();

	//[...]
```

Which then allows you to use `sideCarPrint(String str)` and `sideCarPrintln(String str)`;

## How to modify ? 🔩 🔨

You could change the I2C address of the sidecar in the `sidecar_serial.ino` and you'd only have to provide that new address as a parameter of `initSideCarLink(newAddress)`.
