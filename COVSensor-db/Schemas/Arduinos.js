'use strict'
const { Schema } = require('mongoose')

module.exports = new Schema({
  id_Arduino:{
    type:String,
    require:false,
    unique:true
  },
  id_AirBomb: {
    type: Schema.Types.ObjectId,
    ref: 'airBombs',
    required:false
  },
  id_Alarm: {
    type: Schema.Types.ObjectId,
    ref: 'alarms',
    required:false
  },
  coordinator: Boolean,
  connected:Boolean
})
