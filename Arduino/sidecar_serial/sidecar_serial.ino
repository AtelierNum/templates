#include <Wire.h>

void I2C_RxHandler(int numBytes)
{
  while(Wire.available()) { 
    Serial.print((char)Wire.read());
  }
}

void setup() {
  Wire.begin(0x55); 
  Wire.onReceive(I2C_RxHandler);

  Serial.begin(115200);
  Serial.println("Sidecar ready");
}

void loop() {}
