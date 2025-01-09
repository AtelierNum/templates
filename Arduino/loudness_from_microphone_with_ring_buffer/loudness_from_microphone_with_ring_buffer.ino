#define SAMPLE_COUNT 100
#define MIC_PIN 0

// we store all of our samples
int16_t samples[SAMPLE_COUNT];

// this will just store the number of times we went through loop()
uint32_t loopCount = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  loopCount += 1; // store that we have another iteration done

  // we go around the array, refreshing one sample per loop()
  samples[loopCount % SAMPLE_COUNT] = analogRead(MIC_PIN);

  // same simple thing as in the simpler sketch
  uint16_t minimum = 1023;
  uint16_t maximum = 0;
  
  for (uint16_t i = 0; i < SAMPLE_COUNT; i++) {
    minimum = min(minimum, samples[i]);
    maximum = max(maximum, samples[i]);
  }

  uint16_t loudness = maximum - minimum;
  Serial.println(loudness);
}
