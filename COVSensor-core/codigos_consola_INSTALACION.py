https://www.youtube.com/watch?v=XRSX6eo7BEA&ab_channel=G%C3%B6khanAtal%C4%B1

wget https://github.com/Gadgetoid/py-spidev/archive/master.zip
unzip master.zip
rm master.zip
cd py-spidev-master
sudo python setup.py install
sudo python3 setup.py install
cd ..
cd Desktop
mkdir NRF24L01
cd NRF24L01
git clone https://github.com/BLavery/lib_nrf24   //reemplazar esta libreria por la actual para raspberry pi 4 :: https://github.com/trueToastedCode/Python/blob/master/Fix/lib_nrf24.py
cd lib_nrf24/
cp lib_nrf24.py ~/Desktop/NRF24L01  
sudo nano hbr.py
git clone https://github.com/TMRh20/RF24



/////////////////
git clone https://github.com/eclipse/paho.mqtt.python 
cd paho.mqtt.python 
python3 setup.py install

