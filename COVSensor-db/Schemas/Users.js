'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
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

const User = mongoose.model('User', userSchema);

module.exports = User;