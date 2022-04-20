'use strict'
module.exports = function setupSensor (SensorModel) {
  function add (_sensor) {
    const mySensor = new SensorModel(_sensor)
    return mySensor.save()
  }
  function listAllSensors () {
    return SensorModel.find()
  }
  async function checkIfExists(_filterSensor) {
    return SensorModel.findOne({
      $or: [{
        status: _filterSensor.status
      }]
    })
  }

  function getById(_filterSensor) {
    return SensorModel.findOne({
      id: _filterSensor.id
    });
  }

  async function updateSensor(_sensor) {
    const foundSensor = await SensorModel.findOne({
      _id: _sensor._id.valueOf()
    });
    foundSensor.status = _sensor.status;
    foundSensor.description = _sensor.description;
    const newSensor = await foundSensor.save();
    return newSensor;
  }

  return {
    add,
    listAllSensors,
    checkIfExists,
    getById,
    updateSensor
  }
}
