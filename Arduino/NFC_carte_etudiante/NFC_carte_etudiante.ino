#include <Wire.h>
#include <Adafruit_PN532.h>

// Si vous utilisez l'I2C, ces broches ne sont pas utilisées mais la bibliothèque requiert leur définition
#define PN532_IRQ (2)
#define PN532_RESET (3)  // Non connectée par défaut sur la plupart des modules (breakout boards)

// Initialisation du PN532 via I2C
Adafruit_PN532 nfc(PN532_IRQ, PN532_RESET);

void setup(void) {
  Serial.begin(115200);
  while (!Serial) delay(10);  // Attendre l'initialisation de la console série

  Serial.println("Looking for PN532...");

  nfc.begin();

  uint32_t versiondata = nfc.getFirmwareVersion();
  if (!versiondata) {
    Serial.print("Didn't find PN53x board. Check your wiring!");
    while (1)
      ;  // Arrêt (boucle infinie)
  }

  // Données correctes reçues, on les affiche !
  Serial.print("Found chip PN5");
  Serial.println((versiondata >> 24) & 0xFF, HEX);
  Serial.print("Firmware ver. ");
  Serial.print((versiondata >> 16) & 0xFF, DEC);
  Serial.print('.');
  Serial.println((versiondata >> 8) & 0xFF, DEC);

  // Configuration de la carte pour lire les badges RFID
  nfc.SAMConfig();
  
  Serial.println("Waiting for an ISO14443A Card (like MIFARE DESFire EV2)...");
}

void loop(void) {
  uint8_t success;
  uint8_t uid[] = { 0, 0, 0, 0, 0, 0, 0 };  // Tampon pour stocker l'UID renvoyé
  uint8_t uidLength;                        // Longueur de l'UID (4 ou 7 octets selon le type de carte ISO14443A)

  // Attente d'une carte de type ISO14443A (Mifare, etc.).
  // Lorsqu'une carte est trouvée, 'uid' sera rempli avec l'UID, et 'uidLength' indiquera sa taille
  success = nfc.readPassiveTargetID(PN532_MIFARE_ISO14443A, uid, &uidLength);

  if (success) {
    // Afficher quelques informations de base sur la carte
    Serial.println("Found an ISO14443A card");
    Serial.print("  UID Length: ");
    Serial.print(uidLength, DEC);
    Serial.println(" bytes");

    // Les cartes DESFire ont généralement un UID de 7 octets
    if (uidLength == 7) {
      Serial.println("  Looks like a MIFARE Ultralight or DESFire card!");
    }

    Serial.print("  UID Value:  ");
    nfc.PrintHex(uid, uidLength);
    Serial.println("");

    // Attendre 1 seconde avant de continuer pour éviter de surcharger (spammer) le moniteur série
    delay(1000);
  }
}