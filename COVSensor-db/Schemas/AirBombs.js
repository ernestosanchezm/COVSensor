'use strict'
const { Schema } = require('mongoose')

module.exports = new Schema({
  id_Arduino:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Arduinos',
    required:true
  },
  status: {
    type: String
  }
})
