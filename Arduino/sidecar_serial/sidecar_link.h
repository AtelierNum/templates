#include <Wire.h>

uint8_t sideCarLinkAddress;

void initSideCarLink(uint8_t address){
  Wire.begin();
  sideCarLinkAddress = address;
}
void initSideCarLink(){initSideCarLink(0x55);}

void sideCarPrint(String str){
  char* cstr = str.c_str();

  Wire.beginTransmission(sideCarLinkAddress);
  for(intptr_t i = 0; i < str.length(); i++){
    Wire.write(cstr[i]);
  }
  Wire.endTransmission();
}

void sideCarPrintln(String str){
  str.concat("\n");
  sideCarPrint(str);
}