#include <esp_now.h>
#include <WiFi.h>

// enter the address of your receiver
// (the one provided by default is astronomically improbable to be the one you need)
uint8_t otherAddress[] = { 0x44, 0x17, 0x93, 0x5C, 0x17, 0x20 };

// this is a custom struct which will represent the shape of a message
// IT HAS TO BE THE SAME ACROSS BOTH PROGRAMS
typedef struct Message {
  int x;
  int y;
} Message;

// instance of Message we will write over and over again
Message msg;

esp_now_peer_info_t peerInfo;

// callback when data is sent
void OnDataSent(const uint8_t *mac_addr, esp_now_send_status_t status) {

  // copies the mac address of the peer in a string and print it
  char macStr[18];
  Serial.print("Packet to: ");
  snprintf(macStr, sizeof(macStr), "%02x:%02x:%02x:%02x:%02x:%02x",
           mac_addr[0], mac_addr[1], mac_addr[2], mac_addr[3], mac_addr[4], mac_addr[5]);
  Serial.print(macStr);
  Serial.print(" send status:\t");

  // did the message deliver?
  Serial.println(status == ESP_NOW_SEND_SUCCESS ? "Delivery Success" : "Delivery Fail");
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

  esp_now_register_send_cb(OnDataSent);

  // register peer
  peerInfo.channel = 0;
  peerInfo.encrypt = false;
  memcpy(peerInfo.peer_addr, otherAddress, 6);
  if (esp_now_add_peer(&peerInfo) != ESP_OK) {
    Serial.println("Failed to add peer");
    return;
  }
}

void loop() {
  // make up two random numbers to send
  // in practice this wouldb the data from your sensors
  msg.x = random(0, 20);
  msg.y = random(0, 20);

  // send
  esp_err_t result = esp_now_send(0, (uint8_t *) &msg, sizeof(ms

  // NOTE: sending and delivering isn't the same
  // sending => "did we say the thing"
  // delivering => "was it heard"
  if (result == ESP_OK) {
    Serial.println("Sent with success");
  }
  else {
    Serial.println("Error sending the data");
  }

  delay(2000);
}