#include <SPI.h>
#include "RF24.h"
#include <printf.h>
#include <TimerOne.h>
#include <SoftwareSerial.h>
SoftwareSerial mySerial(10,11); // RX, TX     //instancia de sensor

int ledPIN=2;
//------------------------------------PIN------------------------------------
int pinAlarm=4;
int pinRelayBombAir=8;
int pwmPin= 9;
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
//--------SENSOR
byte cmd[9] = {0xFF,0x01,0x86,0x00,0x00,0x00,0x00,0x00,0x79};
unsigned char hexdata[9] = {0xFF, 0x01, 0x86, 0x00, 0x00, 0x00, 0x00, 0x00, 0x79}; 
unsigned char response[9]; 
unsigned long th, tl,ppm, ppm2, ppm3,pwmPPM = 0;

//---------------------------------------------------------------------------------
void TurnOffAirBomb(){
  Serial.println("APAGAR BOMBA DE AIRE");
  digitalWrite(pinRelayBombAir,LOW);
}
float initTimer;

void setup(void){
  Serial.begin(9600); 
  pinMode(8 , OUTPUT);
  mySerial.begin(9600);   //inicializar SERIAL de 
  pinMode(pwmPin, INPUT);
}
unsigned long log_cnt = 0;
void loop(void){ 
   //Serial.println(ReadCo2());
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



unsigned long ReadCo2(){
  mySerial.write(cmd,9);
  mySerial.readBytes(response, 9);
  unsigned int responseHigh = (unsigned int) response[2];
  unsigned int responseLow = (unsigned int) response[3];
  ppm = (256*responseHigh)+responseLow;


  //CO2 via pwm
  do {
    th = pulseIn(pwmPin, HIGH, 1004000) / 1000;
    tl = 1004 - th;
    ppm2 = 2000 * (th-2)/(th+tl-4);
    ppm3 = 5000 * (th-2)/(th+tl-4);
  } while (th == 0);
    
  return th; 
}
