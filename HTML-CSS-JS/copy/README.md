---
template: true
title: copy to clipboard with javascript 
description: shows how to 
language: en
tags:
  - copy
  - clipboard
  - browser
---

# copy to clipboard with javascript

**Level** : ![](https://img.shields.io/badge/Level-Beginner-brightgreen)

## What does it do ? ✨

This one shows how you can copy a string to the clipboard of your user when they click a button.

## How to run ? 🚀

Given that this feature only works in a secure context, it's highly probable that you'll have to run it through a development server (like the "live-server" extension for VSCode) instead of directly opening the html file from your file explorer.

## How to modify ? 🔩 🔨

Be aware that what get's actually copied to the user's clipboard is the string provided when you call `navigator.clipboard.writeText()`.

## Additional resources 📄 📗

https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
