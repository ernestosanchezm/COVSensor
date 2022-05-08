import RPi.GPIO as GPIO
from lib_nrf24 import NRF24
import spidev
from time import sleep

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
pipes=[[0xF0,0xF0,0xF0,0xF0,0xE1]]
radio=NRF24(GPIO,spidev.SpiDev())
radio.begin(0,25,4000000)
                   
#radio.setPayloadSize(32)
radio.setChannel(0x76)  #0x70
radio.setDataRate(NRF24.BR_2MBPS)
radio.setPALevel(NRF24.PA_MAX)

radio.setAutoAck(True)
radio.enableDynamicPayloads()
radio.enableAckPayload()

radio.openReadingPipe(1,pipes[0])
radio.printDetails()

radio.startListening()
while True:
    while not radio.available(pipes[0]):
        sleep(1/100)
        print("-----GG------")
    alinan=[]
    radio.read(alinan,radio.getDynamicPayloadSize())
    print ("Alinan : {}".format(alinan))
    veri=""
    for i in alinan:
        if(i>=32 and i<=126):
            veri+=chr(i)
        #print("Gelen mesaj : {}".format(veri))
    if veri!='':
        print(veri)
    radio.flush_rx()
    radio.flush_tx()
    #radio.printDetails()
    print("------ABC-----")
GPIO.cleanup()