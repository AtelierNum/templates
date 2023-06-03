---
template: true
---

# Name of the file

**Level** : ![](https://img.shields.io/badge/Level-Advanced-red)

## What does it do ? ✨

This example provides you with a basic setup for video chatting. You have exactly one room, anyone can join the conversation with either their microphone, webcam or both.

## What hardware is needed ? 💾 🔌

- webcam
- microphone

## Software dependencies 🌈 📂

- nodeJS
- see package.json

## How to run ? 🚀

```
npx degit AtelierNum/boilerplates/webRTC#main myWebRTCExample
cd myWebRTCExample
npm install && npm run dev
```

## How to modify ? 🔩 🔨

Given the complexity of this one it's only reasonable to point you to these resources and tell you to reach out if you need further help.

- MDN doc : https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API
- Shim to make it cross-browser : https://github.com/webrtcHacks/adapter
- More expample projects : https://webrtc.github.io/samples/
- This wasn't considered at the time of writing but should be looked into and maybe used for the next iteration : https://peerjs.com/index.html
