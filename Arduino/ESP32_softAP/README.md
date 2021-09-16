# Name of the file

**Level** : ![](https://img.shields.io/badge/Level-Intermediate-yellow)

## What does it do ? ✨

This turns your ESP32 into a soft access point which means it is its own wi-fi network but also a server inside this network. Due to this you can connect on this **local** network and exchange HTTP messages with your ESP32.

## What hardware is needed ? 💾 🔌

- an ESP32 dev board

## Software dependencies 🌈 📂

- the ESP32 related toolkit, [click here to see how to install it](https://randomnerdtutorials.com/installing-the-esp32-board-in-arduino-ide-windows-instructions/).

## How to run ? 🚀

Use your Arduino IDE to upload the code to your board. Then check the console to see which name the ESP's network has and the IP address within this network. At this point you can connect to this network, then open a web browser like Google Chrome or Mozilla Firefox and input the IP into your address bar.

## How to modify ? 🔩 🔨

These lines are where you can change the name and password of your **local** network

```cpp
const char* ssid     = "basic_softAP_example";
const char* password = "1234";
```

This is what the ESP answer so you'll want to change that to embed the values you want to communicate.

```cpp
client.println("this is a fully textual body, it could be HTML or JSON");
```

Don't worry about the IP. In this config, the ESP will always have the 192.168.4.1 address. [More Info](https://192-168-4-1.com/)

## Be Careful ⚠️

In this configuration both the ESP32 and the machine you'll connect on its network won't have access to the Internet.

## Additional resources 📄 📗

A very good website with ESP32 related tutorials : [https://randomnerdtutorials.com/](https://randomnerdtutorials.com/)
