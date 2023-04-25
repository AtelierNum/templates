#include <Adafruit_NeoPixel.h>
#define PIN       27
#define NUMPIXELS 64

Adafruit_NeoPixel pixels(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);
unsigned long lastTimeStamp = 0;
bool lightsON = false;

int flashesPerSecond = 30;
int timeOfFlashPhase = 1000000 / flashesPerSecond * 0.5;

// these are dependant of of your board
// these values have been tested on an ESP32 (adafruit feather more specifically)
int boardDependentOffset = 2000; // by default the delta is going to be positive only, use this and the serial plotter to center the values closer to 0
float deltaCompensation = 0.9; // the system overcompensate if you use compensate the full delta from one loop to the next, this value should be 0 and 1.0, qualifying how much of the delta you want to compensate from one loop to the next.

void setup() {
  pixels.begin();
  Serial.begin(115200);
}

void loop() {
  if (lightsON) {
    pixels.clear();
  } else {
    for (int i = 0; i <= NUMPIXELS; i++) {
      pixels.setPixelColor(i, pixels.Color(150, 150, 100));
    }
  }
  pixels.show();

  lightsON = !lightsON;
  int delta = micros() - lastTimeStamp - timeOfFlashPhase;
  lastTimeStamp = micros();
  
  //  Serial.print(timeOfFlashPhase);
  //  Serial.print("\t");
  Serial.println(delta);
  //  Serial.print("\t");
  //  Serial.println(delta > timeOfFlashPhase);

  // Currently, the largest value that will produce an accurate delay through delayMicroseconds() is 16383.
  // so we're calling it twice with half of our values to make sure we don't get past that number
  // for 30 flashes per second you need to 33 333 microseconds between flashes, which means 16 666 microseconds on then 16 666 microseconds off.
  delayMicroseconds(timeOfFlashPhase * 0.5 - delta * deltaCompensation * 0.5 - boardDependentOffset * 0.5);
  delayMicroseconds(timeOfFlashPhase * 0.5 - delta * deltaCompensation * 0.5 - boardDependentOffset * 0.5);
}