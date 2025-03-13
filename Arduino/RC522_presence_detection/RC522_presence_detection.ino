#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 10
#define RST_PIN 9

MFRC522 rfid(SS_PIN, RST_PIN);

void setup() {
  Serial.begin(9600);
  SPI.begin();
  rfid.PCD_Init();
  Serial.println(F("This code scan the MIFARE Classsic NUID."));
}

void loop() {
  delay(1000);

  uint32_t id = poll();

  if(id){
    Serial.println(id);
  }else{
    Serial.println("no tag");
  }
}

// returns the id of the tag
uint32_t poll() {
  if(!rfid.PICC_IsNewCardPresent() || !rfid.PICC_ReadCardSerial()){
    return 0;
  }

  uint32_t id = 0;

  byte bufferATQA[2];
  byte bufferSize = sizeof(bufferATQA);

  if (rfid.PICC_WakeupA(bufferATQA, &bufferSize)) {
    for (uint8_t i = 0; i < 4; i++) {
      id = id | (uint32_t)rfid.uid.uidByte[i] << 8 * i;
    }
  }

  rfid.PICC_HaltA();  // halt the card so it gets rediscovered next time

  return id;
}