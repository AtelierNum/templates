#include "WiFi.h"
#include <HTTPClient.h>

// don't bother changing it if you didn't set in up in the google apps script
#define TOKEN "YOUR_TOKEN"

// WiFi credentials
const char* ssid = "HUAWEI-B315-6EEC";  // change SSID
const char* password = "JE38QBQE74T";   // change password

// change Gscript ID, it's given on "deployement" of the google apps script
String GOOGLE_DEPLOYEMENT_ID = "AKfycbwHs-1jaoPy-IwJEOu321db_I_TWkclQOFfKrPqbovr8his6edeXZ3HqloyAwfvYElH";

// we're just using this count variable in place of a value returned by a sensor
int count = 0;

void setup() {
  Serial.begin(115200);
  Serial.print("Connecting to wifi: ");
  Serial.println(ssid);
  Serial.flush();
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
}
void loop() {
  // we don't need to do it forever when demonstrating
  if (count <= 2) {
    send(String("count") ,String(count));
    count++;

    send(String("mills"), String(millis()));
  }
}

void send(String label, String value) {
  if (WiFi.status() == WL_CONNECTED) {
    delay(500);    
    String urlFinal = "https://script.google.com/macros/s/" + GOOGLE_DEPLOYEMENT_ID + "/exec?" + "token=" + TOKEN + "&value=" + value + "&label=" + label;
    Serial.print("POST data to spreadsheet:");
    Serial.println(urlFinal);
    HTTPClient http;
    http.begin(urlFinal.c_str());
    http.setFollowRedirects(HTTPC_STRICT_FOLLOW_REDIRECTS);
    int httpCode = http.GET();
    Serial.print("HTTP Status Code: ");
    Serial.println(httpCode);
    //---------------------------------------------------------------------
    //getting response from google sheet
    String payload;
    if (httpCode > 0) {
      payload = http.getString();
      Serial.println("Payload: " + payload);
    }
    //---------------------------------------------------------------------
    http.end();
    delay(500);
  } else {
    Serial.print("Could not send, we lost the network: ");
    Serial.println(ssid);
  }
}