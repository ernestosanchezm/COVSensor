#include <SPI.h>
#include "RF24.h"

RF24 radio(7,8);

void setup(void){
  Serial.begin(9600);
  radio.begin();
  radio.setPALevel(RF24_PA_MIN);
  radio.setDataRate(RF24_2MBPS);
  radio.setChannel(0x76);
  radio.openWritingPipe(0xF0F0F0F0E1LL);
  radio.enableDynamicPayloads();
  
  radio.powerUp();      
}

void loop(void){
  const char text[]="on";
  const char text2[]="off";
  Serial.println("F");
  bool ok=radio.write("JAJA",4);
  if (ok)Serial.println("XD");  
  radio.flush_rx();
  radio.flush_tx();
//  if(Serial.available()>0){
//    al=Serial.read();
//    if(al==49){
//      
//      Serial.println(al);          
//    }else if(al=48){
//      radio.write(&text2,3);                     
//      Serial.println(al); 
//    }else{
//      Serial.println(al);
//    }
//  }
delay(1000);
}
