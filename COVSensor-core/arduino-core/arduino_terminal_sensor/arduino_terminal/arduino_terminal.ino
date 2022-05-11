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
  objMessage.metric=Get_Metric_Co2();     
  bool ok=radio.write(&objMessage,sizeof(objMessage));    
  if (ok){
    //Serial.println(objMessage.metric); 
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

long Get_Metric_Co2(){
  long METRIC_CO2=0;
  METRIC_CO2= random(10000,70000); 
  return (long)METRIC_CO2;      
}
void ClearRadio(){
  radio.flush_rx();
  radio.flush_tx();
}
/////////////////////////////////////////////////////////
