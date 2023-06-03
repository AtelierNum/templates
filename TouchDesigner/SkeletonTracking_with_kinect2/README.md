---
template: true
---

# Kinect2_skeleton.toe

![](https://img.shields.io/badge/Level-Beginner-brightgreen)

## What does it do ? ✨

Simply get the points of a full skeleton tracking with kinect2 and instance a sphere on each one.

## What hardware is needed ? 💾 🔌

- kinect 2

## Software dependencies 🌈 📂

- Touch designer

## How to run ? 🚀

- Get the file with node :

```
npx degit AtelierNum/boilerplates/TouchDesigner/SkeletonTracking_with_kinect2#main ./TD_SkeletonTracking_with_kinect2
```

- Just double click on the file to run it with TD.

## How to modify ? 🔩 🔨

- The select1 node on top remove the id of the body tracked (you may need it to track several bodies).
- The shuffle1 node reorganises the data to be ready to be used as instances in a geometry top.
