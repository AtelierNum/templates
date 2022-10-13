char inputBuffer[128];//a 16-th of the SRAM of a Uno

void setup() {
  Serial.begin(115200);

  pinMode(13, OUTPUT);// do not remove, it is also used communicating errors outside of serial communications
}

void loop() {

  /*
    This will send a JSON message to your computer via the serial connection.
    These message can hold only one property and one value. Both have to be suplied as Strings.
    If you need to send a boolean or a number you will need to convert it by using the String() function.

    Here the value of millis() which is surrounded by the function String() to be converted.
    The example below will send {"time":"0"} on the first loop.
  */
//  sendMsg("time", String(millis()));



  /*
    If there are messages waiting to be read, this function will call executeMessage() for each property and its value.
    From the PC you can send messages such as led=0 or msg1=1.5,msg2=12,msg3=0
    You have to separate the pairs of "property=value" by commas(,).
    The values can only be float numbers but you can use them as integers or booleans (1=true, 0=false)

    The messages your Arduino accepts have to be specified in the executeMessage() function.
  */
  readMsgs();
}

void executeMessage(String command, float value) {
  /*
     You can chain as many "else if" as you have type of messages
     In this example the Arduino does something if the message is led=X or echo=X (where X is a float)
  */

  if (command == "led") {//if the command is "led"
    if (value == 1.0) {// and the value is 1.0
      digitalWrite(13, HIGH);
    } else {//... but if it's not
      digitalWrite(13, LOW);
    }
  } else if (command == "echo") { //if the command is "echo"
    sendMsg("ACK", String(value)); //send back the value we received
  }
}


/*
   YOU DO NOT NEED TO KNOW ABOUT THE CODE BELOW TO MAKE IT WORK
   But you're welcome to look at and change it if you want :D
*/

void readMsgs() {
  if (Serial.available() == 0) {
    return;
  }

  uint8_t messageLength = Serial.readBytesUntil(',', inputBuffer, sizeof(inputBuffer) / sizeof(char));

  Serial.println(inputBuffer);

  uint8_t indexOfKVDelimiter = -1;
  for (uint8_t i = 0; i < messageLength; i++) {
    if (inputBuffer[i] == '=') {
      indexOfKVDelimiter = i;
      break;
    }
  }

  if (indexOfKVDelimiter < 0) {
    // no value for the key?
    // just flash the built-in LED a bit and then give up
    builtInLedErrorSequence();
    Serial.flush();
    return;
  }

  char key[indexOfKVDelimiter + 1]; //+1 because we need a space for the future null terminator
  char value[messageLength - indexOfKVDelimiter];

  strncpy(key, inputBuffer, indexOfKVDelimiter);
  key[indexOfKVDelimiter] = '\0';

  for (uint8_t i = 0; i < messageLength - indexOfKVDelimiter; i++) {
    value[i] = inputBuffer[i + indexOfKVDelimiter + 1];
  }
  value[sizeof(value)/sizeof(char) - 1] = '\0';

  Serial.println(key);
  Serial.println(value);

  executeMessage(String(key) , atof(value));
}

void sendMsg(String key, String value) {
  String json = "{\"" + key + "\":";
  json += "\"" + value + "\"}";
  Serial.println(json);
}

void builtInLedErrorSequence() {
  ledShort();
  ledShort();
  ledShort();

  ledPause();

  ledShort();
  ledShort();
  ledShort();
  ledShort();

  ledPause();

  ledShort();
  ledShort();

  ledPause();

  ledLong();
}

void ledShort() {
  digitalWrite(13, HIGH);
  delay(250);
  digitalWrite(13, LOW);
  delay(150);
}

void ledLong() {
  digitalWrite(13, HIGH);
  delay(500);
  digitalWrite(13, LOW);
  delay(150);
}

void ledPause() {
  digitalWrite(13, LOW);
  delay(500);
}
