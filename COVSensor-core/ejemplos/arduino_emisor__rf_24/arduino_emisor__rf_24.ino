#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>

//Declaremos los pines CE y el CSN
#define CE_PIN 8
#define CSN_PIN 10
 
//Variable con la dirección del canal por donde se va a transmitir
byte direccion[5] ={'c','a','n','a','l'};
byte direccion2[5] ={'c','a','m','a','l'}; 
//creamos el objeto radio (NRF24L01)
RF24 radio(CE_PIN, CSN_PIN);

//vector con los datos a enviar
float datos[3];

void setup()
{
  //inicializamos el NRF24L01 
  radio.begin();
  //inicializamos el puerto serie
  Serial.begin(9600); 
  
//Abrimos un canal de escritura
 //radio.openWritingPipe(direccion);
  //radio.startListening();
  radio.openWritingPipe(direccion);
  radio.openReadingPipe(1, direccion2);
 
}
 
void loop()
{  

 //cargamos los datos en la variable datos[]
 datos[0]=24;//analogRead(0)* (5.0 / 1023.0);;
 datos[1]=millis();
 datos[2]=3.14;
 //enviamos los datos
 

 bool ok = radio.write(datos, sizeof(datos),false);
 radio.startListening();
 
  //reportamos por el puerto serial los datos enviados 
  if(ok)
  {
    
     Serial.print("Datos enviados: "); 
     Serial.print(datos[0]); 
     Serial.print(" , "); 
     Serial.print(datos[1]); 
     Serial.print(" , "); 
     Serial.println(datos[2]); 

/////////////////
    
    
    uint8_t numero_canal;
    numero_canal=1;
    if ( radio.available() )
     {    
          
         //Leemos los datos y los guardamos en la variable datos[]
         radio.read(datos,sizeof(datos));
         Serial.println(datos[1]);
      
     }
     else
     {
    
         //Serial.println("No hay datos de radio disponibles");
     }
   

     
  }
  else
  {
     Serial.println("no se ha podido enviar");
  }

 

////////////////ENVIO DATA

  
 delay(1000);
   radio.stopListening();
}
