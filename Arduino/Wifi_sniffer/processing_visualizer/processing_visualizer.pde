
import processing.serial.*;
Serial myPort;  

int valueFromArduino = 50;
float movieSpeed = 2;

ArrayList <Device> appareils ;

int maxTimeout = 500;


int maxCellSize = 100;

void setup() {
  size(800, 800);
  background(0);

  // initialization of communication via usb from arduino
  // BE CAREFUL to use the adapted port
  printArray(Serial.list());
  String portName = Serial.list()[2];
  myPort = new Serial(this, portName, 115200);
  myPort.bufferUntil('\n');

  appareils = new ArrayList<Device>();
}


void draw() {
  background(0);  
  translate(maxCellSize, maxCellSize/2);
  for (int i = 0; i < appareils.size(); i ++) {
    if (frameCount%10 == 0) appareils.get(i).timeout +=1;

    //println(i, appareils.get(i).mac, appareils.get(i).puissance, appareils.get(i).timeout);


    float xpos = (i*maxCellSize) % (width-maxCellSize);  
    float ypos =  int((i*maxCellSize) / (width-maxCellSize)) * maxCellSize ;
    float rad = map(appareils.get(i).puissance, 50, 100, 10, maxCellSize);
    noStroke();
    fill(255, 0, 0);
    ellipse(xpos, ypos, rad, rad);

    textAlign(CENTER, CENTER);
    fill(255);
    textSize(10);
    text(appareils.get(i).mac, xpos, ypos);

    //if (appareils.get(i).timeout > maxTimeout) {
    //println( "removed " + appareils.get(i).mac +" device");
    //appareils.remove(i);
    //}
    if (appareils.size() >= 57) appareils.remove(i);
  }
}  

void serialEvent (Serial myPort) {
  try {
    while (myPort.available() > 0) {
      String inBuffer = myPort.readStringUntil('\n');
      if (inBuffer != null) {
        //println(inBuffer);

        String[] data = inBuffer.split(","); 
        String[] s = data[0].split("-");
        //println("puissance", s[s.length-1]);
        //println("mac", data[1]);

        // check if the device is already in the list
        boolean isIn = false;
        for (int i = 0; i < appareils.size(); i++) {
          Device d = appareils.get(i);
          if (data[1].contains(d.mac)) {
            isIn = true;
          } else {
          }
        }
        if (isIn == false) {
          Device deviceToAdd = new Device(data[1], int(s[s.length-1]), 0);
          appareils.add(deviceToAdd);
        }
      }
    }
  } 
  catch (Exception e) {
  }
}

class Device {
  String mac;
  int puissance;
  int timeout;
  Device (String mac, int puissance, int timeout) {
    this.mac = mac;
    this.puissance = puissance;
    this.timeout = timeout;
  }
}
