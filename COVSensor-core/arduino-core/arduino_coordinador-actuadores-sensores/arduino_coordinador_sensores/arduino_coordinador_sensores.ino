#include <SPI.h>
#include "RF24.h"
#include <printf.h>
RF24 radio(7,8);
//-----------------------------------CONSTANTES PARA EL SERIAL-------------------------------
struct CMessage{
  public:
  long metric;
  char ARDUINO_CODE[3]="T1";   
  int sttAlarm;
  CMessage(){}; 
};

struct CMessage objMessage;
uint8_t pipeNum;
void setup(void){
  Serial.begin(9600);
  //printf_begin();
  radio.begin();
  pinMode(9, OUTPUT); // Definimos el pin 8 como salida.
  radio.setPayloadSize(32);
  radio.setChannel(70);   //CANAL O FRECUENCIA DE LA TRANSFERENCIA 
  radio.setDataRate(RF24_2MBPS); 
  radio.enableDynamicPayloads();  
  radio.openReadingPipe(1, 0xF0F0F0F0E0LL);   //DIRECCION PARA ESCUCHAR AL TERMINAL: TERMINAL-COORDINADOR   
  radio.openWritingPipe(0xF0F0F0F0E1LL);      //DIRECCION PARA ESCRIBIR EN LA RPi4: COORDINADOR-RPi4
  radio.openReadingPipe(3, 0xF0F0F0F0E2LL);   //DIRECCION PARA ESCUCHAR AL TERMINAL: TERMINAL-COORDINADOR 
  radio.stopListening();
  radio.startListening();
  radio.powerUp();     
}

float sinVal;
int toneVal;
int allowOnAlarm=1;
bool allowOnBomb=1;
float PARAM_CONCENTRATION=65000;
float initTimer=0;
char _sttAlarm;
void loop(void){
  
  if (radio.available(&pipeNum)){ //ESCUCHAR A ESTE CANAL    
    if(pipeNum==1 && millis()-initTimer>300){
      initTimer=millis();
      radio.read(&objMessage,radio.getDynamicPayloadSize());   
      if (ValidMetric(objMessage)){ 
        radio.stopListening();
        bool ok=radio.write(&objMessage,sizeof(objMessage));            
        radio.startListening();
        if(objMessage.metric>PARAM_CONCENTRATION){
          String msg="_"+String(allowOnAlarm)+String(allowOnBomb);
          Serial.println(msg);             
        
        }else{
          //if(allowOnAlarm==1 || allowOnBomb==1) Serial.println("_00");              
        }
      }  
    }    
    else if(pipeNum==3){      
      char _sttAlarm[0];
      radio.read(_sttAlarm,radio.getDynamicPayloadSize());       
      allowOnAlarm=0;   
         
      }  
      radio.flush_rx();
      radio.flush_tx();     
        
  }


}

int ValidMetric(CMessage _objMessage){
  if (_objMessage.metric<0)return 0;
  if (_objMessage.ARDUINO_CODE=="")return 0;
  return 1;
}

//String StrReadSerial(){ 
//  messageOfSerial="";   
//  while(Serial.available()){
//    char inChar=(char)Serial.read();
//    if(inChar=='_'){
//      return messageOfSerial;
//      }
//    messageOfSerial+=inChar;    
//  }
//  return "";
//}
