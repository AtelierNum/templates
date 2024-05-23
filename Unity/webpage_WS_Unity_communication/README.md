---
template: true
title: Unity websocket
description: Template showing how to connect a web page and a unity project through a websocket server
language: en
tags:
  - unity
  - websocket
---

<a href="#french">french version</a>

# Unity websocket

**Level** : ![](https://img.shields.io/badge/Level-Advanced-red)

## What does it do ? ✨

This shows how to connect a web page to unity through web sockets.

The `/webclient` directory contains a website which shows how to connect to the `/webSocketServer.js` and send/receive messages. It is served by the `/liveServer.js` which will automatically refresh your browser when changes are detected.

The `/unity_websocket/websocket` directory contains a unity project which shows how to connect to the `/webSocketServer.js` and send/receive messages.

In order to make it simple, the unity project expects messages to be comma `,` separated values. Such as `player1,moveX,1`

The `/webSocketServer.js` is very basic and is programmed to broadcast anything it receives. So, if you don't need a client to send a "private" message to another client you'll never need to touch the code of the webSocket server.

## Software dependencies 🌈 📂

Unity : https://unity.com/

NodeJS : https://nodejs.org/

NatvieWebSocket : https://github.com/endel/NativeWebSocket

## How to run ? 🚀

### How to install

You'll need to have Nodejs installed : https://nodejs.org/

The easiest way would be to open the project in VScode (through `File > Open Folder...`)
... and then enter the following commands in the integrated terminal (through `Terminal > New Terminal`)

```
npm install
```

### How to run

You can start everything (except the unity project) by running this command.

```
npm start
```

You can use the shortcut `Ctrl + C` in the terminal to stop everything.

As for unity, you just need to open it through the unity hub like any other project. The web socket library should be already installed, but if it's not, it's the NativeWebSocket library https://github.com/endel/NativeWebSocket . (Go through the "manual installation" if you want to make sure you get no problems.)

<span id="french"></span>

## Qu'est-ce que ça fait ? ✨

Ça montre comment connecter une page web à unity grâce à des web sockets.

Le dossier `/webclient` contient un site web qui montre comment se connecter au `/webSocketServer.js` et recevoir/envoyer des messages. Il est servis par le `/liveServer.js` qui va automatiquement rafraîchir votre navigateur quand il détectera des changements.

Le dossier `/unity_websocket/websocket` contient le projet unity qui montre comment se connecter aux `/webSocketServer.js` et recevoir/envoyer des messages.

Pour faire au plus simple, le projet unity s'attend à recevoir un message aux valeurs séparées par des virgules `,`. Comme `player1,moveX,1` par exemple.

Le `/webSocketServer.js` est très basique et est programmé pour transmettre les messages qu'il reçoit à tous les clients. Donc, si vous n'avez pas besoin qu'un client puisse envoyer un message "privé" à un autre, vous ne devriez pas avoir besoin de toucher aux code du serveur websocket.

## Comment le démarrer ? 🚀

### Comment faire l'installation

Il faudra installer Nodejs : https://nodejs.org/

Le plus simple serait d'ouvrir votre projet dans VScode (via `Fichier > Ouvrir dossier...`) ... puis d'entrer la commande dans le terminal (que vous pouvez ouvrir via `Terminal > Nouveau Terminal`)

```
npm install
```

### Comment lancer le projet

On peut tout démarrer d'un coup (excepté le projet unity) via cette commande.

```
npm start
```

Vous pouvez utiliser le raccourci `Ctrl + C` dans le terminal pour tout arrêter.

Pour ce qui est de unity, vous avez juste besoin de l'ouvrir depuis unity hub comme tous les autres projets. La librairie pour gérer les websockets devrait déjà être installée, mais si elle ne l'est pas, il s'agit de la librairie NativeWebSocket https://github.com/endel/NativeWebSocket . (choisissez l'installation manuelle pour moins de problèmes)
