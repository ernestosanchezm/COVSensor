'use strict'
const { Schema } = require('mongoose')

module.exports = new Schema({
  id_AirBomb: {
    type: Schema.Types.ObjectId,
    ref: 'AirBombs'
  },
  id_Alarm: {
    type: Schema.Types.ObjectId,
    ref: 'Alarms'
  },
  coordinator: Boolean
})
