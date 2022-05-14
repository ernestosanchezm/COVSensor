#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>
 
//Declaremos los pines CE y el CSN
#define CE_PIN 8
#define CSN_PIN 10
 
//Variable con la dirección del canal que se va a leer
byte direccion[5] ={'c','a','n','a','l'}; 
byte direccion2[5] ={'c','a','m','a','l'}; 
//creamos el objeto radio (NRF24L01)
RF24 radio(CE_PIN, CSN_PIN);

//vector para los datos recibidos
float datos[3];

void setup()
{
 //inicializamos el NRF24L01 
  radio.begin();
  //inicializamos el puerto serie
  Serial.begin(9600); 
  
  //Abrimos el canal de Lectura
radio.openReadingPipe(1, direccion);
radio.openWritingPipe(direccion2);
radio.startListening();
    
}
 
void loop() { 
 uint8_t numero_canal;
 numero_canal=1;
 //if ( radio.available(&numero_canal) )
 if ( radio.available() )
 {    
     //Leemos los datos y los guardamos en la variable datos[]
     radio.read(datos,sizeof(datos));
     
     //reportamos por el puerto serial los datos recibidos
     Serial.print("Dato0= " );
     Serial.print(datos[0]);
     Serial.print(" V, ");
     Serial.print("Dato1= " );
     Serial.print(datos[1]);
     Serial.print(" ms, ");
     Serial.print("Dato2= " );
     Serial.println(datos[2]);


   
           
  
 }
 else
 {
     Serial.println("No hay datos de radio disponibles");
 }

  //////////////
     radio.stopListening();
         //nuevooo
      
      datos[0]=24;//analogRead(0)* (5.0 / 1023.0);;
      datos[1]=millis();
      datos[2]=3.14; 
           bool ok = radio.write(datos, sizeof(datos));
           if (ok)Serial.println("MEGA GAA...ENVIADO");
    radio.startListening();

 
     
 delay(1000);
 /////////////RESPONDER
 
}
