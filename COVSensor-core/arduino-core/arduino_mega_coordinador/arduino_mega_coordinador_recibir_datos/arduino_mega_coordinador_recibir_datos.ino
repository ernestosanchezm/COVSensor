#include <SPI.h>
#include "RF24.h"
#include <printf.h>
RF24 radio(7,8);
struct CMessage{
  public:
  long metric;
  char ARDUINO_CODE[3]="T1";   
  CMessage(){}; 
};

struct CMessage objMessage;

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
  radio.stopListening();
  radio.startListening();
  //radio.printDetails();
  radio.powerUp();     

}

float sinVal;
int toneVal;
bool allowOnAlarm=1;
float PARAM_CONCENTRATION=50000;
void loop(void){   
  
  uint8_t canal=1;
if (radio.available(&canal)){ //ESCUCHAR A ESTE CANAL
  radio.read(&objMessage,radio.getDynamicPayloadSize()); 
  
  if (ValidMetric(objMessage)){     
    fnAlarm((float)objMessage.metric);
    radio.stopListening();
    bool ok=radio.write(&objMessage,sizeof(objMessage));    
    if (ok)Serial.println("Reenviando ...");
    radio.startListening();
  }
  Serial.println(objMessage.metric);
  radio.flush_rx();
  radio.flush_tx();
}

delay(500);
}

int ValidMetric(CMessage _objMessage){
  if (_objMessage.metric<0)return 0;
  if (_objMessage.ARDUINO_CODE=="")return 0;
  return 1;
}

void fnAlarm(float _concentration){
  if (allowOnAlarm){
    Serial.println(_concentration);
    if(_concentration>PARAM_CONCENTRATION){        
       for(int x=0; x<180; x++){
            // convertimos grados en radianes para luego obtener el valor.
            sinVal = (sin(x*(3.1412/180)));
            // generar una frecuencia a partir del valor sin
            toneVal = 2000+(int(sinVal*1000));
            tone(9, toneVal);
            delay(2); 
        return;
     }
    }else {
       noTone(9);
     }
  }
  else{
     noTone(9);
     return;      
  }
}
  
/////////////////////////////
