'use strict'
const { Schema } = require('mongoose')

module.exports = new Schema({
  id_AirBomb: {
    type: Schema.Types.ObjectId,
    ref: 'AirBombs',
    required:false
  },
  id_Alarm: {
    type: Schema.Types.ObjectId,
    ref: 'Alarms',
    required:false
  },
  coordinator: Boolean
})
