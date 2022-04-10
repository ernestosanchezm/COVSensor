'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

module.exports = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  eMail: {
    type: String,
    required: true,
    unique: true
  },
  psw: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  }
})