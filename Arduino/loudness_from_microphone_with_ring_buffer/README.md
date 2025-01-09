---
template: true
title: loudness_from_microphone_with_ring_buffer
thumbnail: thumbnail.jpg
description: Get the ambient noise level with an electret microphone
language: en
tags:
  - microphone
  - micro
---

# Loudness from microphone with ring buffer

**Level** : ![](https://img.shields.io/badge/Level-Intermediate-yellow)

## What does it do ? ✨

This one goes a step further than the "loudness_from_microphone" template by having an array of samples and doing one read per `loop()`.

This result in:

- a longer lasting "memory" each reading is used as many times as we store samples and not just once.
- a faster execution of the `loop()` function
- the samples are more spaced out in time compared to the basic "loudness_from_microphone" sketch which do all the readings in one go

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

In this one the `samples` buffer takes a lot of space in memory (100 samples take ~20% of the memory of an arduino uno), so be mindfull of that if you want more samples in your buffer.
