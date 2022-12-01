//https://github.com/T-vK/ESP32-BLE-Keyboard
#include <BleKeyboard.h>

BleKeyboard bleKeyboard("My esp 32");// broadcasted name of the device 

void setup() {
  Serial.begin(115200);
  bleKeyboard.begin();
  Serial.println("Starting BLE work!");
}

void loop() {
  bleKeyboard.print("A");
  delay(5000);
}