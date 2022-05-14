#include <SPI.h>
#include "RF24.h"

RF24 radio(7,8);
const String ARDUINO_CODE="C1";
byte direccion[5] ={'A','A','A','A','A'};  //WRITE TERMINAL COORDINATOR
void setup(void){
  Serial.begin(9600);
  radio.begin();
  radio.setPALevel(RF24_PA_MIN);
  radio.setDataRate(RF24_2MBPS);
  radio.setChannel(70);   //CANAL O FRECUENCIA DE LA TRANSFERENCIA
  radio.openWritingPipe(direccion);
  radio.enableDynamicPayloads();  
  radio.powerUp();      
}

void loop(void){     
  String message_send=Get_Send_Message(ARDUINO_CODE,Get_Metric_Co2());
  int size_MESSAGE_SEND=message_send.length();  
  char char_MESSAGE_SEND[size_MESSAGE_SEND];
  message_send.toCharArray(char_MESSAGE_SEND, size_MESSAGE_SEND); 
  bool ok=radio.write(char_MESSAGE_SEND,size_MESSAGE_SEND);  
  //if (ok)Serial.println(MESSAGE_SEND);  
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


String Get_Send_Message(String code,String co2){
  return code+"-"+co2; 
}

String Get_Metric_Co2(){
  int METRIC_CO2=0;
  METRIC_CO2= random(300); 
  return (String)METRIC_CO2;      
}
