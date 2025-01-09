---
template: true
title: Loudness from microphone
thumbnail: thumbnail.jpg
description: Get the ambient noise level with an electret microphone
language: en
tags:
  - microphone
  - micro
---

# Loudness from microphone

**Level** : ![](https://img.shields.io/badge/Level-Beginner-brightgreen)

## What does it do ? ✨

In this arduino sketch we do a bunch of reading on the microphone, look at the maximum voltage difference we can get in these samples, and use it as the noise level.

## What hardware is needed ? 💾 🔌

- a breakout electret microphone
- an arduino uno

## Software dependencies 🌈 📂

None

## How to run ? 🚀

The usual, reproduce the circuit and open the sketch with the arduino IDE.

![](circuit.JPG)

## How to modify ? 🔩 🔨

You can change the value of `SAMPLE_COUNT` at the beginning.

## Be Careful ⚠️

More samples will allow you to catch bigger differences but will make the execution of the `loop()` function longer.
