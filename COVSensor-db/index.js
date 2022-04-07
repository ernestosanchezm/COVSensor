/*'use strict'

const setupDatabase = require('./lib/db') // creacion del singleton, para tener una sola instancia de base de datos
const AirBombs_Sch = require('./Schemas/AirBombs') // creacion del modelo
const Alarms_Sch = require('./Schemas/Alarms') // creacion del modelo
const Arduinos_Sch = require('./Schemas/Arduinos') // creacion del modelo
const Users_Sch = require('./Schemas/Users') // creacion del modelo
const setupAirBomb = require('./lib/AirBombs') // crud de acceso a la base de datos
const setupUsers = require('./lib/Users') // crud de acceso a la base de datos
const defaults = require('defaults')

const mongoose = require('mongoose')

module.exports = async function (accesDB) {
  const connDB = await setupDatabase(accesDB)// INSTANCIA DE CONECCION

  const AirBombModel = connDB.model('airBombs', AirBombs_Sch);
  const AlarmModel = connDB.model('alarms', Alarms_Sch);
  const UserModel=connDB.model('users', Users_Sch);

  const storeAirBomb = setupAirBomb(AirBombModel);  
  const storeUser = setupUsers(UserModel);
 return {
  storeAirBomb,
  storeUser
 }
}
*/