void setup() {
  // the number has to match with the baud rate in the Serial DAT
  Serial.begin(9600);
}

void loop() {
  Serial.print(millis() % 1000);
  Serial.print("\t");
  Serial.print(sin(millis() * 0.001));
  Serial.println();
}
