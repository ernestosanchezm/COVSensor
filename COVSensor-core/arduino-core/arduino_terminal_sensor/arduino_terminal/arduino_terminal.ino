#include <SPI.h>
#include "RF24.h"
#include <printf.h>
#include <SoftwareSerial.h>

SoftwareSerial mySerial(1,0); // RX, TX     //instancia de sensor
RF24 radio(7,8);
byte cmd[9] = {0xFF,0x01,0x86,0x00,0x00,0x00,0x00,0x00,0x79};
unsigned char hexdata[9] = {0xFF, 0x01, 0x86, 0x00, 0x00, 0x00, 0x00, 0x00, 0x79}; 
unsigned char response[9]; 
unsigned long th, tl,ppm, ppm2, ppm3,responseCO2 = 0;
int pwmPin= 9;

struct CMessage{
  public:
  long metric;
  char ARDUINO_CODE[3]="T1";   
  CMessage(){}; 
};

struct CMessage objMessage;

void setup(void){
  Serial.begin(9600);
  mySerial.begin(9600); 
  pinMode(pwmPin, INPUT);  
  radio.begin();
  radio.setPayloadSize(32);
  radio.setChannel(70);   //CANAL O FRECUENCIA DE LA TRANSFERENCIA 
  radio.setDataRate(RF24_250KBPS);
  radio.setPALevel(RF24_PA_MAX);
  radio.setAutoAck(true);
  radio.enableDynamicPayloads();   
  radio.enableAckPayload();
   radio.openWritingPipe(0xF0F0F0F0E0LL);     //DIRECCION PARA ESCRIBIR AL COORDINADOR : TERMINAL-COORDINADOR 
  radio.powerUp();      
}
void loop(void){     
  ReadCo2();
  objMessage.metric=responseCO2;     
  bool ok=radio.write(&objMessage,sizeof(objMessage));    
  if (ok){
    Serial.println("Enviado: "+String(objMessage.metric)); 
    ClearRadio();  
    delay(10);
  }else{
    Serial.println("No enviado"+(String)objMessage.metric);  
    }  
   delay(1000);

}

String Get_Send_Message(String code,String co2){
  return code+"-"+co2; 
}

void ClearRadio(){
  radio.flush_rx();
  radio.flush_tx();
}


void ReadCo2(){
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
  
  responseCO2=ppm2;
//  Serial.println(ppm);
//  Serial.println(th);
//  Serial.println(ppm2);
//  Serial.println(ppm3);
//  Serial.println("-----------");
  delay(1000);
}

/////////////////////////////////////////////////////////
