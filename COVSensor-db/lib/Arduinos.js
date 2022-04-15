'use strict'
module.exports = function setupArduinos (ArduinoModel) {
  function add (_arduino) {
    const myArduino = new ArduinoModel(_arduino)
    return myArduino.save()
  }
  function list () {
    return ArduinoModel.find()
  }

  async function createOrUpdate (_arduino) {
    const existingArduino = await ArduinoModel.findOne({_id:_arduino._id});

    if (existingArduino) {
      existingArduino.connected=_arduino.connected;
      const updtArduino=await existingArduino.save();
      return updtArduino;       
    }

    const newArduino = new ArduinoModel(_arduino);
    return newArduino.save();
  }
  
  return {
    add,
    list,
    createOrUpdate
  }
}
