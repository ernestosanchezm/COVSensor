'use strict'
module.exports = function setupAlarm (AlarmModel) {
  function add (_alarm) {
    const myAlarm = new AlarmModel(_alarm)
    return myAlarm.save()
  }
  function list () {
    return AlarmModel.find()
  }
  return {
    add,
    list
  }
}
