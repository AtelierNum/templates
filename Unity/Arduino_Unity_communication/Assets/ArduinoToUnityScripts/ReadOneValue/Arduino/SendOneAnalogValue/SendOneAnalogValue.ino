int sensorValue = 0;

void setup() {
  // Open the serial port
  Serial.begin(9600);
  // Set the A0 pin to input mode
  pinMode(A0,INPUT);
}

void loop() {
  // Read the A0 sensor value
  sensorValue = analogRead(A0);
  // Write the sensorValue in the serial port
  Serial.println(sensorValue);
  // Wait 50 milliseconds
  delay(50);
}
