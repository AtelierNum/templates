Ce package contient des scripts Arduino et Unity montrant l'envois d'une ou deux valeurs par Arduino et la lecture d'une ou deux valeurs par Unity.


Commencez par l'exercice avec une seule valeur.
- Commencez par brancher un potentiomètre sur l'entré analogique A0 de votre arduino.
- Ouvrez le script Arduino ReadOneValue et televersez le code dans votre arduino.
- Importez les scripts .cs dans votre projet Unity.
- Ouvrez la scène ArduinoInteractionWithOneValue
- Cliquer sur le bouton play dans unity, ouvrez la console de log. Vous devrez voir apparaître des valeurs entre -1 et 1.

Ensuite recommencez l'exercice avec deux valeurs.


Si vous avez des erreurs dans la console après avoir importer le script ReadArduinoInputExample.cs dans Unity. Vous devez changer une option dans les project settings > player > other settings > level API > .NET 4.X . Suivez ce gif.