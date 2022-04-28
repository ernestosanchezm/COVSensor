'use strict'
const {
  Schema
} = require('mongoose')

module.exports = new Schema({
  id_Arduino:{
    type: Schema.Types.ObjectId,
    ref: 'arduinos',
    required:true
  },
  description: { type: String },
  status: {
    type: String
  }
})