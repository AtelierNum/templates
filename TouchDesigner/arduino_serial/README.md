---
template: true
title: Arduino Serial vers Touch Designer
thumbnail: thumbnail.jpg
description: Permet de récuperer les valeurs émises par un arduino depuis Touch Designer pour piloter vos visuels.
language: fr
tags:
  - touchdesigner
  - TD
  - touch designer
  - arduino
  - serial
---

# Arduino Serial vers Touch Designer

**Niveau** : ![](https://img.shields.io/badge/Level-Intermediate-yellow)

## Qu'est-ce que ça fait ? ✨

Permet de récuperer les valeurs émises par un arduino depuis Touch Designer pour piloter vos visuels.

## De quel matériel on a besoin ? 💾 🔌

- Un arduino
- Un ordinateur

## Logiciels nécessaires 🌈 📂

- l'IDE Arduino : https://www.arduino.cc/en/software/
- Touch Designer : https://derivative.ca/download

## Comment on démarre ? 🚀

Il suffit d'ouvrir le `.toe`.

Dans le dossier `test` il y a un exemple de projet arduino qui va avec. Pour ça il vous suffit d'ouvrir le fichier `.ino` depuis l'IDE arduino et de le téléverser sur l'arduino que vous aurez branché sur votre ordinateur.

## Comment on modifie ? 🔩 🔨

## Attention ⚠️

Soit :

- l'arduino IDE peut mettre du code sur la carte et garder son moniteur serie d'ouvert
- TD peut recevoir des messages de la part de l'arduino

mais pas les deux à la fois, il faut donc retirer le port de la config du DAT Serial. Bypass ce DAT ne marche pas.
