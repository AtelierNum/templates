int sensor1Value = 0;
int sensor2Value = 0;

void setup() {
  // Open the serial port
  Serial.begin(9600);
  // Set the A0 pin to input mode
  pinMode(A0,INPUT);
  // Set the A1 pin to input mode
  pinMode(A1,INPUT);
}

void loop() {
  // Read the first sensor value
  sensor1Value = analogRead(A0);
  // Read the second sensor value
  sensor2Value = analogRead(A1);
  // Write the first sencor value in the serial port
  Serial.print(map(sensor1Value,0,900,0,100));
  // Write a comma, it will be the value separator in Unity
  Serial.print(",");
  // Write the second sencor value in the serial port
  // And finish line.
  Serial.println(map(sensor2Value,0,900,0,100));
  // Wait 50 milliseconds
  delay(50);

}
