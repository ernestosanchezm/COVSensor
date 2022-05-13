#include <SPI.h>
#include "RF24.h"
#include <printf.h>
#include <string.h>

RF24 radio(7,8);
//-----------------------------------CLASES-------------------------------
struct CMessage{
  public:
  long metric;
  char ARDUINO_CODE[3]="T1";   
  int sttAlarm;
  CMessage(){}; 
};
class CMessageActuators{
  public:
  int sttAlarm;
  int sttBombAir;  
};
            
struct CMessage objMessage;
uint8_t pipeNum;

char messageActuatorRcvd;

//----------------------------------VARIABLES-----------------

//--------ALARMA
float sinVal;
int toneVal;
//-------ACTUADORES
char allowOnAlarm[1];
char allowOnBomb[1];
//-------PARAMETRO TOPE
float PARAM_CONCENTRATION=400;
//---------OTROS
float initTimer=0;


void setup(void){
  allowOnAlarm[0]='1';
  allowOnBomb[0]='1';
  Serial.begin(9600);
  radio.begin();
  //pinMode(9, OUTPUT); // Definimos el pin 8 como salida.
  radio.setPayloadSize(32);
  radio.setChannel(70);   //CANAL O FRECUENCIA DE LA TRANSFERENCIA 
  radio.setDataRate(RF24_250KBPS); 
  radio.setPALevel(RF24_PA_MAX);
   radio.setAutoAck(true);
  radio.enableDynamicPayloads();  
   radio.enableAckPayload();
  radio.openReadingPipe(1, 0xF0F0F0F0E0LL);   //DIRECCION PARA ESCUCHAR AL TERMINAL: TERMINAL-COORDINADOR   
  radio.openWritingPipe(0xF0F0F0F0E1LL);      //DIRECCION PARA ESCRIBIR EN LA RPi4: COORDINADOR-RPi4
  radio.openReadingPipe(3, 0xF0F0F0F0E2LL);   //DIRECCION PARA ESCUCHAR AL TERMINAL: TERMINAL-COORDINADOR 
  radio.stopListening();
  radio.startListening();
  radio.powerUp();     
}
void loop(void){    
  if (radio.available(&pipeNum)){ //ESCUCHAR A ESTE CANAL    
    //if(pipeNum==1 && millis()-initTimer>1000){
    switch(pipeNum){
      case 1:
      radio.read(&objMessage,radio.getDynamicPayloadSize()); 
      ClearRadio();  
      if (ValidMetric(objMessage)){ 
        radio.stopListening();
        bool ok=radio.write(&objMessage,sizeof(objMessage));                  
        radio.startListening();
        ClearRadio(); 
        if(objMessage.metric>PARAM_CONCENTRATION){
          //String msg="_"+String(allowOnAlarm[0])+String(allowOnBomb[0]);
          //Serial.println(msg);
        }
      }
      break;
      case 3:
      ClearRadio();
      radio.writeAckPayload(3, "7", 1);
      messageActuatorRcvd='F';       
//      messageActuatorRcvd[0]='9';
//      messageActuatorRcvd[1]='8';
      radio.read(&messageActuatorRcvd,radio.getDynamicPayloadSize());    
      Serial.print(messageActuatorRcvd); 
      break;
    }           
  }
}

int ValidMetric(CMessage _objMessage){
  if (_objMessage.metric<0)return 0;
  if (_objMessage.ARDUINO_CODE=="")return 0;
  return 1;
}

void ClearRadio(){
  radio.flush_rx();
  radio.flush_tx();
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
