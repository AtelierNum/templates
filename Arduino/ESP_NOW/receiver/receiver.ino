#include <esp_now.h>
#include "MacAddress.h"
#include <WiFi.h>

bool turnedOn = false;

// this is a custom struct which will represent the shape of a message
// IT HAS TO BE THE SAME ACROSS BOTH PROGRAMS
typedef struct Message {
  int x;
  int y;
} Message;

Message msg;

//callback function that will be executed when data is received
void OnDataRecv(const esp_now_recv_info_t *info, const uint8_t *incomingData, int len) {
  // printout the sender's mac address
  Serial.print("From:");
  for (uint8_t i = 0; i < sizeof(info->src_addr) / sizeof(info->des_addr[0]); i++) {
    info->src_addr[i];
  }
  Serial.println();

  // shove the received bytes into the message shape
  // which is why it needs to be the same shape on both side
  // (they don't HAVE TO be the same shape, but it makes it easier)
  memcpy(&msg, incomingData, sizeof(msg));
  Serial.print("Bytes received: ");
  Serial.println(len);
  Serial.print("x: ");
  Serial.println(msg.x);
  Serial.print("y: ");
  Serial.println(msg.y);
  Serial.println();

  // flip the LED to make it easier to see messages coming in
  turnedOn = !turnedOn;
}

void setup() {
  Serial.begin(115200);

  //Set device as a Wi-Fi Station
  WiFi.mode(WIFI_STA);

  while (!(WiFi.STA.started() || WiFi.AP.started())) {
    delay(100);
  }

  if (esp_now_init() != ESP_OK) {
    Serial.println("Error initializing ESP-NOW");
    return;
  }

  esp_now_register_recv_cb(OnDataRecv);

  Serial.print("ESP Board MAC Address:  ");
  Serial.println(WiFi.macAddress());
  Serial.println("\t you'll need it in the sender program");

  pinMode(27, OUTPUT);
}

void loop() {
  digitalWrite(27, turnedOn);
}