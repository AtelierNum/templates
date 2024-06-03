// local and frozen version of the library
#include "src/WT2003S_Player.h"

// feel free to not pay attention to this
// it will make sure you can use classical Arduinos and ESP32 boards seemlessly
// although, on ESP32, make sure to connect the MP3 module as follows
// MP3  ->  ESP32
// RX   ->  TX/17
// TX   ->  RX/16
#ifdef CONFIG_IDF_TARGET_ESP32
#define mp3Serial Serial2
WT2003S<HardwareSerial> Mp3Player;

#elif __AVR__
#include <SoftwareSerial.h>
SoftwareSerial SSerial(2, 3);  // RX, TX
#define mp3Serial SSerial
WT2003S<SoftwareSerial> Mp3Player;
#endif

uint8_t vol = 5;
uint32_t spi_flash_songs = 0;
uint32_t sd_songs = 0;
STROAGE workdisk = SD;
struct Play_history {
  uint8_t disk;
  uint16_t index;
  char name[8];
} * SPISong, *SDSong;

void setup() {
  Serial.begin(9600);

#ifdef CONFIG_IDF_TARGET_ESP32
  mp3Serial.begin(9600, SERIAL_8N1, 16, 17);
#elif __AVR__
  mp3Serial.begin(9600);
#endif

  Mp3Player.init(mp3Serial);

  playSong(1);
  playMode(SINGLE_CYCLE);
}

void loop() {
  pausePlay();
  delay(100);
  printStatus();
}

void playSong(int songIndex) {
  if (workdisk == SD) {
    Mp3Player.playSDRootSong(songIndex);
  }
  if (workdisk == SPIFLASH) {
    Mp3Player.playSPIFlashSong(songIndex);
  }
}

// accepts : SINGLE_SHOT, SINGLE_CYCLE, CYCLE or RANDOM
void playMode(PLAY_MODE mode) {
  Mp3Player.playMode(mode);
}

void printStatus() {
  uint8_t status;
  Serial.print("status:");
  status = Mp3Player.getStatus();
  if (status == 0x01) {
    Serial.print("playing");
  }
  if (status == 0x02) {
    Serial.print("stop");
  }
  if (status == 0x03) {
    Serial.print("pause");
  }
  Serial.println();
}

void volumeDown() {
  vol = Mp3Player.getVolume();
  if (--vol > 31) {
    vol = 0;
  }
  Mp3Player.volume(vol);
}

void volumeUp() {
  vol = Mp3Player.getVolume();
  Mp3Player.volume(++vol);
}

void pausePlay(){
  Mp3Player.pause_or_play();
}

void next(){
  Mp3Player.next();
}

void readSongName(struct Play_history* ph, uint32_t num, STROAGE disk) {
  Mp3Player.volume(0);
  delay(100);
  switch (disk) {
    case SPIFLASH:
      Mp3Player.playSPIFlashSong(0x0001);
      break;
    case SD:
      Mp3Player.playSDRootSong(0x0001);
      break;
    case UDISK:
      Mp3Player.playUDiskRootSong(0x0001);
      break;
  }
  
  for (int i = 0; i < num; i++) {
    delay(300);
    ph[i].disk = disk;
    ph[i].index = Mp3Player.getTracks();
    Mp3Player.getSongName(ph[i].name);
    Mp3Player.next();
  }

  Mp3Player.pause_or_play();
  Mp3Player.volume(vol);
  delay(100);
}

void getAllSong() {
  uint8_t diskstatus = Mp3Player.getDiskStatus();
  Serial.println(diskstatus);
  spi_flash_songs = Mp3Player.getSPIFlashMp3FileNumber();
  Serial.print("SPIFlash:");
  Serial.println(spi_flash_songs);
  if (spi_flash_songs > 0) {
    SPISong = (struct Play_history*)malloc((spi_flash_songs + 1) * sizeof(struct Play_history));
    readSongName(SPISong, spi_flash_songs, SPIFLASH);
  }
  if (diskstatus && 0x02) {  // have SD
    sd_songs = Mp3Player.getSDMp3FileNumber();
    Serial.print("SD:");
    Serial.println(sd_songs);
    if (sd_songs > 0) {
      SDSong = (struct Play_history*)malloc((sd_songs + 1) * sizeof(struct Play_history));
      Serial.println("1...");
      readSongName(SDSong, sd_songs, SD);
    }
  }
}

void printSongs() {
  Serial.println("index \t name");
  Serial.println("-------------------spi flash-------------------------------");
  for (int i = 0; i < spi_flash_songs; i++) {
    Serial.print(SPISong[i].index);
    Serial.print("\t");
    Serial.println(SPISong[i].name);
  }
  Serial.println("-------------------sd card-------------------------------");
  for (int i = 0; i < sd_songs; i++) {
    Serial.print(SDSong[i].index);
    Serial.print("\t");
    Serial.println(SDSong[i].name);
  }
}