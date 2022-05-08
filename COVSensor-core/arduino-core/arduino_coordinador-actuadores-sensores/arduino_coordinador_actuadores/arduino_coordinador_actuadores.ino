#include <SPI.h>
#include "RF24.h"
#include <printf.h>
#include <TimerOne.h>
int ledPIN=2;
void setup(void){
  Serial.begin(9600); 
  pinMode(8 , OUTPUT);

}
//------------------------------------PIN------------------------------------
int pinAlarm=4;
int pinRelayBombAir=8;
//---------------------------------------------------------------------------------
//------------------------------------VARIABLES------------------------------------
//ALARMA
float sinVal;
int toneVal;
bool allowOnAlarm=1;
bool AirBombOn=0;

//MENSAJE RECIBIDO
char data[20];
int size_data = 0;
int initRead=0;
int msgComplete=0;
//---------------------------------------------------------------------------------
void TurnOffAirBomb(){
  Serial.println("APAGAR BOMBA DE AIRE");
  digitalWrite(pinRelayBombAir,LOW);
}
float initTimer;
void loop(void){    
   if((millis()-initTimer)>2000 && initTimer!=0){
    TurnOffAirBomb();  
    initTimer=0;
   }
   SetReadSerial();
   if(msgComplete==1){
    Serial.println((String)data[1]+'-'+(String)data[2]);
    if(data[1]=='1' )fnAlarm();   
    if(data[2]=='1'){      
      initTimer=millis();      
      digitalWrite(pinRelayBombAir,HIGH);
    }

    msgComplete=0;
   }
   

}


void SetReadSerial(){   
   if (Serial.available())
   {
      char character = Serial.read();
      if (character != '\n')
      {
        if(character=='_')initRead=1;
        if(initRead==1){
          data[size_data] = character;
          size_data ++;          
        }         
      }
      else
      {         
         msgComplete=1;
         initRead=0;
         size_data = 0;         
      }
   }
}
//-------------------------------------------------------------------------
void fnAlarm(){
  for(int x=0; x<180; x++){
    // convertimos grados en radianes para luego obtener el valor.
    sinVal = (sin(x*(3.1412/180)));
    // generar una frecuencia a partir del valor sin
    toneVal = 2000+(int(sinVal*1000));
    tone(pinAlarm, toneVal);
    delay(2);                  
    }
  noTone(pinAlarm);
  return;
}
