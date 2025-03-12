#include <SPI.h>
#include <SD.h>

#define SD_CARD_PIN 10
#define READ_INTERVAL 100

#define BTN_PIN 2

bool fileIsOpen = false;
File file;

uint16_t fileIndex = 0;

void setup() {
  delay(100); // just to make sure it's not a "post-upload false start"
  // meaning we can sefaly open the card and stuff

  Serial.begin(9600);
  Serial.println();

  pinMode(BTN_PIN, INPUT_PULLUP);

  if (!SD.begin(SD_CARD_PIN)) {
    Serial.println("Error starting the SD card module");
    while (true)
      ;
  }

  if (!SD.exists("/logs")) {
    SD.mkdir("/logs");
  }

  while(SD.exists(String("/logs/")+fileIndex)){
    fileIndex++;
  }

  if (!SD.exists("logs")) {
    Serial.println("could not create a folder for your logs");
  }

  file = SD.open(String("/logs/") + fileIndex , FILE_WRITE);
  fileIsOpen = true;

  if (!file) {
    Serial.println("Error opening the file");
    while (true)
      ;
  }

  Serial.println(String("Working on /logs/") + fileIndex);
}

void loop() {
  if (fileIsOpen) {
    Serial.println(file.println(millis()));
  }

  if (digitalRead(BTN_PIN) == LOW && fileIsOpen) {
    file.close();
    fileIsOpen = false;
    Serial.println("You can now safely remove the sd card");
  }

  delay(READ_INTERVAL);
}
