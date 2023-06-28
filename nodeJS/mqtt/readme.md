---
template: true
title: MQTT in nodejs (and webpages)
thumbnail: ./readme_resources/MQTT.js.jpg
description: this template contains a broker, a nodeJS client and a browser based client.
language: en
tags:
  - mqtt
---

# Name of the file

**Level** : ![](https://img.shields.io/badge/Level-Intermediate-yellow)

## What does it do ? ✨

This template show you how to setup your own broker instead of relying on the free clusters of mosquitto or shiftr.io.

## What hardware is needed ? 💾 🔌

A router to connect your devices and your broker could be useful.

## Software dependencies 🌈 📂

- [MQTT.js](https://github.com/mqttjs/MQTT.js/) for the clients
- [Aedes](https://github.com/moscajs/aedes) for the broker

## How to run ? 🚀

Like in all nodeJS project, you'll have to run the `npm install` command and then look into the `package.json` to see which scripts let you interact with the project.

In this case you can use the following:

To start the project in development mode. It will start both the broker and the nodeJS client and relaunch them on change.

```
npm run dev
```

To start the broker in production mode

```
npm start
```

To start the client alone (in case you want to debug your client against another broker)

```
npm run start:client
```

## How to modify ? 🔩 🔨

To modify you'll only need to look into the `client.js` file if your project requires you to use nodeJS. If you want to send and receive from a web page,you'll have to look into the `web_client` folder, more specifically inside `web_client/script.js`.

Inside those you mostly have to look for the `subscribe` and `publish` functions.

## Be Careful ⚠️

The browser-based client only works if the messages are sent over WebSocket, by default this is the case in the `server.js` file. But you can notice that the straight MQTT setup of the broker is in the file which is probably going to be faster
