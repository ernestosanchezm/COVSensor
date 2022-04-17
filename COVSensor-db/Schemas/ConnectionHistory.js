'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

module.exports = new Schema({
  id_Device: {
    type: String,
    required:true
  },
  type:{
    type:String,
    required:true
  },
  createAt:Date
})