#include <SPI.h>
#include "RF24.h"
#include <printf.h>
RF24 radio(7,8);
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
  radio.openReadingPipe(2, 0xF0F0F0F0E2LL);   //DIRECCION PARA ESCUCHAR AL TERMINAL: TERMINAL-COORDINADOR 
  radio.stopListening();
  radio.startListening();
  radio.powerUp();     
}

float sinVal;
int toneVal;
bool allowOnAlarm=1;
float PARAM_CONCENTRATION=65000;
void loop(void){ 
if (radio.available(&pipeNum)){ //ESCUCHAR A ESTE CANAL
    if(pipeNum==1){
      radio.read(&objMessage,radio.getDynamicPayloadSize());   
      if (ValidMetric(objMessage)){ 
        objMessage.sttAlarm=fnAlarm((float)objMessage.metric); 
        radio.stopListening();
        bool ok=radio.write(&objMessage,sizeof(objMessage));    
        Serial.println("Reenviando ..."+String(objMessage.metric));       
        radio.startListening();
        }   
    radio.flush_rx();
    radio.flush_tx();      
    }  
    if(pipeNum==2){      
      char _sttAlarm[1];
      radio.read(_sttAlarm,radio.getDynamicPayloadSize());
      Serial.print((bool)_sttAlarm);
      allowOnAlarm=(bool)_sttAlarm;        
      }  
}

delay(500);
}

int ValidMetric(CMessage _objMessage){
  if (_objMessage.metric<0)return 0;
  if (_objMessage.ARDUINO_CODE=="")return 0;
  return 1;
}

int fnAlarm(float _concentration){
  if (allowOnAlarm==1){   
    if(_concentration>PARAM_CONCENTRATION){        
       for(int x=0; x<180; x++){
            // convertimos grados en radianes para luego obtener el valor.
            sinVal = (sin(x*(3.1412/180)));
            // generar una frecuencia a partir del valor sin
            toneVal = 2000+(int(sinVal*1000));
            tone(9, toneVal);
            delay(2);      
      }
    }else {
       noTone(9);
     }
  }
  else{
     noTone(9);       
  }
  return digitalRead(9);
}
  
/////////////////////////////