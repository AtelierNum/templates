#define BUCKET_COUNT 5
#define SAMPLES_PER_BUCKET 20

#define MIC_PIN 0

typedef struct {
  uint16_t min;
  uint16_t max;
} Bucket;

Bucket buckets[BUCKET_COUNT];
uint32_t loopCount = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  loopCount += 1;

  Bucket* currentBucket = buckets + (loopCount % BUCKET_COUNT);
  currentBucket->min = 1023;
  currentBucket->max = 0;

  for(uint16_t i = 0; i < SAMPLES_PER_BUCKET; i++){
    int micValue = analogRead(MIC_PIN);
    currentBucket->min = min(currentBucket->min, micValue);
    currentBucket->max = max(currentBucket->max, micValue);
  }

  int globalMin = 1023;
  int globalMax = 0;

  for(uint8_t i = 0; i < BUCKET_COUNT; i++){
    globalMin = min(buckets[i].min, globalMin);
    globalMax = max(buckets[i].max, globalMax);
  }

  Serial.println(globalMax - globalMin);
}
