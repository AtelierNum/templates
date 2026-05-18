#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>

// Use the same UUIDs as the HTML/JS
#define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define CHARACTERISTIC_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"

const int ledPin = 2; // Onboard LED

// Callback class to handle incoming data
class MyCallbacks: public BLECharacteristicCallbacks {
    // Note: In ESP32 Core 3.x, getValue() returns a String object
    void onWrite(BLECharacteristic *pCharacteristic) {
      String value = pCharacteristic->getValue(); 

      if (value.length() > 0) {
        // We look at the first byte sent from the browser
        uint8_t receivedVal = (uint8_t)value[0]; 
        
        Serial.print("Received Value: ");
        Serial.println(receivedVal);

        if (receivedVal == 1) {
          digitalWrite(ledPin, HIGH);
          Serial.println("Action: LED ON");
        } else if (receivedVal == 0) {
          digitalWrite(ledPin, LOW);
          Serial.println("Action: LED OFF");
        }
      }
    }
};

void setup() {
  Serial.begin(115200);
  pinMode(ledPin, OUTPUT);

  // Initialize BLE Device
  BLEDevice::init("ESP32_BLE_Trigger");

  // Create Server
  BLEServer *pServer = BLEDevice::createServer();

  // Create Service
  BLEService *pService = pServer->createService(SERVICE_UUID);

  // Create Characteristic
  // Note: We add PROPERTY_WRITE to allow the browser to send data
  BLECharacteristic *pCharacteristic = pService->createCharacteristic(
                                         CHARACTERISTIC_UUID,
                                         BLECharacteristic::PROPERTY_READ |
                                         BLECharacteristic::PROPERTY_WRITE
                                       );

  // Assign the callback
  pCharacteristic->setCallbacks(new MyCallbacks());

  // Start Service
  pService->start();

  // Start Advertising
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(true);
  
  // High performance/compatibility settings
  pAdvertising->setMinPreferred(0x06);  
  pAdvertising->setMinPreferred(0x12);
  
  BLEDevice::startAdvertising();

  Serial.println("BLE Device Ready. Waiting for Chrome connection...");
}

void loop() {
  delay(1000);
}