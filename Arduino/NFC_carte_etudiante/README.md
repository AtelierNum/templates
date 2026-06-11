---
template: true
title: Lecture NFC de carte étudiant
thumbnail: thumbnail.jpg
description: Lit l'identifiant des cartes d'accès étudiants avec un arduino
language: fr en just keep one (will be "en" by default since most templates have their redmes in english)
tags:
  - NFC
  - arduino
---

# Lecture d'identifiant

**Niveau** : ![](https://img.shields.io/badge/Level-Intermediate-yellow)

## Qu'est-ce que ça fait ? ✨

Ce template permet de lire l'identifiant (et rien de plus) d'une puce ISO 14443-4 présente dans les cartes d'accès étudiants.

## De quel matériel on a besoin ? 💾 🔌

- Carte d'accçès étudiant
- PN532
- Arduino Uno

## Logiciels nécessaires 🌈 📂

- l'IDE Arduino
- La librairie "Adafruit_PN532"

## Comment on démarre ? 🚀

Mettre en place ce circuit et téléverser le code arduino sur la carte, puis regardez dans le moniteur serie.

!()[circuit.png]

## Attention ⚠️

Les badges du personnel ne fonctionnent pas avec ce template, essentiellement parce que l'antenne des badge est beaucoup plus petite et que la puce demande plus d'énergie que ce qu'un PN532 peut fournir.
