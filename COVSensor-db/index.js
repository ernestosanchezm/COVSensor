'use strict'

const setupDatabase = require('./lib/db') // creacion del singleton, para tener una sola instancia de base de datos
const AirBombs_Sch = require('./Schemas/AirBombs') // creacion del modelo
const Alarms_Sch = require('./Schemas/Alarms') // creacion del modelo
const Arduinos_Sch = require('./Schemas/Arduinos') // creacion del modelo
const Users_Sch = require('./Schemas/Users') // creacion del modelo
const ClosedSpace_Sch = require('./Schemas/ClosedSpace')
const MetricSpace_Sch = require('./Schemas/MetricSpace')
const setupAirBomb = require('./lib/AirBombs') // crud de acceso a la base de datos
const setupUsers = require('./lib/Users') // crud de acceso a la base de datos
const setupAlarms = require('./lib/Alarms') // crud de acceso a la base de datos
const setupArduino = require('./lib/Arduinos') // crud de acceso a la base de datos
const setupClosedSpace = require('./lib/ClosedSpace')
const setupMetricSpace = require('./lib/MetricSpace')
const defaults = require('defaults')

module.exports = async function (accesDB) {
  const connDB = await setupDatabase(accesDB)// INSTANCIA DE CONECCION

  //SETEAR MODELOS
  const AirBombModel = connDB.model('airBombs', AirBombs_Sch);
  const AlarmModel = connDB.model('alarms', Alarms_Sch);
  const UserModel=connDB.model('users', Users_Sch);
  const ArduinoModel=connDB.model('arduinos',Arduinos_Sch);
  const ClosedSpaceModel=connDB.model('closedSpace', ClosedSpace_Sch);
  const MetricSpaceModel=connDB.model('metricSpace', MetricSpace_Sch);

  //SETEAR STORES
  const storeAirBomb = setupAirBomb(AirBombModel);  
  const storeAlarm = setupAlarms(AlarmModel);  
  const storeUser = setupUsers(UserModel);
  const storeArduino = setupArduino(ArduinoModel);
  const storeClosedSpace = setupClosedSpace(ClosedSpaceModel);
  const storeMetricSpace = setupMetricSpace(MetricSpaceModel);
  
 return {
  storeAirBomb,
  storeUser,
  storeAlarm,
  storeArduino,
  storeClosedSpace,
  storeMetricSpace
 }
}