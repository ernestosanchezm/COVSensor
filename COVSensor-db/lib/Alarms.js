'use strict'
module.exports = function setupAlarm (AlarmModel) {
  function add (_alarm) {
    const myAlarm = new AlarmModel(_alarm)
    return myAlarm.save()
  }

  function list () {
    return AlarmModel.find()
  }

  // HU21 - Add Alarms 
  async function checkIfExistsAlarms(_filterAlarms) {
  return AlarmModel.findOne({
      $or: [{
        id_Arduino: _filterAlarms.id_Arduino
      }]
  })
  }
  
  //-HU 22 - Get Alarms
  function listAllAlarms() {
    return AlarmModel.find();
  }
  
  //-HU 23 - Get Detail Alarms by Id
  function getAlarmsById(_filterAlarms) {
    return AlarmModel.findOne({
      _id: _filterAlarms
    });
  }

  function getAlarmsByIdArduino(_filterAlarms) {
    return AlarmModel.findOne({
      id_Arduino: _filterAlarms
    });
  }
  
  //-HU 24, HU 31 - Update Alarms and Turn Off Alarm
  function getAlarmsByUsername(_filterAlarms) {
    return AlarmModel.findOne({
      id_Arduino: _filterAlarms.id_Arduino
    });
  }
  
  async function updateAlarms(_alarms) {
    const foundAlarms = await AlarmModel.findOne({
      id_Arduino: _alarms.id_Arduino.valueOf()
    });
    foundAlarms.status = _alarms.status;
    const newAlarms = await foundAlarms.save();
    return newAlarms;
  }

  async function updateStatusAlarm(_alarm) {
    const foundAlarms = await AlarmModel.findOne({
      _id: _alarm.alarmId
    });
    foundAlarms.status = _alarm.status;
    const newAlarms = await foundAlarms.save();
    return newAlarms;
  }

  //-Extra - Delete Alarms
  function deleteAlarmsByUsername(_username) {
    return AlarmModel.deleteOne({
      userName: _username
    });
  }

  return {
    add,
    list,
    checkIfExistsAlarms,
    listAllAlarms,
    getAlarmsById,
    getAlarmsByUsername,
    updateAlarms,
    deleteAlarmsByUsername,
    getAlarmsByIdArduino,
    updateStatusAlarm
  }
}
