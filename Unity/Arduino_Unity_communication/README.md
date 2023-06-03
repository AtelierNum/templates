---
template: true
---

# Arduino Unity communication

**Level** : ![](https://img.shields.io/badge/Level-Beginner-brightgreen)

## What does it do ? ✨

EN : This package contain some Arduino and Unity scripts for send one or two values from Arduino to Unity.

FR : Ce package contient des scripts Arduino et Unity montrant l'envois d'une ou deux valeurs par Arduino et la lecture d'une ou deux valeurs par Unity.

## What hardware is needed ? 💾 🔌

- PC or Mac
- Arduino
- 1 analog sensor

## Software dependencies 🌈 📂

- Unity

## How to run ? 🚀

EN :
Start by the one value send exercise.

- Plug a potentiometer on A0 arduino input.
- Upload the ReadOneValue script in your arduino
- Import the .cs scripts in your unity project
- Open th scene : ArduinoInteractionWithOneValue
- Click on Play, open the console log. You should to see values between -1 and 1.

Then, restart with the two values send exercise.

If you have some errors in the console juste after import. You should change an option in the project settings > > player > other settings > level API > .NET 4.X . Follow the gif.

FR :

Commencez par l'exercice avec une seule valeur.

- Commencez par brancher un potentiomètre sur l'entré analogique A0 de votre arduino.
- Ouvrez le script Arduino ReadOneValue et televersez le code dans votre arduino.
- Importez les scripts .cs dans votre projet Unity.
- Ouvrez la scène ArduinoInteractionWithOneValue
- Cliquer sur le bouton play dans unity, ouvrez la console de log. Vous devriez voir apparaître des valeurs entre -1 et 1.

Ensuite recommencez l'exercice avec deux valeurs.

Si vous avez des erreurs dans la console après avoir importé le script ReadArduinoInputExample.cs dans Unity. Vous devez changer une option dans les project settings > player > other settings > level API > .NET 4.X . Suivez le gif.

## How to modify ? 🔩 🔨

EN :

- try other sensors
- modify MyPlayerControlledByOneArduinoValue or MyPlayerControlledByTwoArduinoValues.

FR :
-changez les capteurs
-modifiez le script MyPlayerControlledByOneArduinoValue ou MyPlayerControlledByTwoArduinoValues pour les adapter à vos besoins.
