#define MIC_PIN 0
#define SAMPLE_COUNT 100

void setup() {
  Serial.begin(9600);
}

void loop() {
  // putting the minimum at the highest value possible means we'll obviously find a reading lower
  unsigned int minimum = 1023; 
  // same for setting the max at the lowest value
  unsigned int maximum = 0;

  // do many readings and keep the lowest and highest values in variables
  for(unsigned int i = 0; i < SAMPLE_COUNT; i++){
    unsigned int micVal = analogRead(MIC_PIN);

    minimum = min(minimum, micVal);
    maximum = max(maximum, micVal);
  }

  // the loudness is just the biggest difference we could measure
  unsigned int loudness = maximum - minimum;

  Serial.println(loudness);
}
