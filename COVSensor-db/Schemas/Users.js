'use strict'
const { Schema } = require('mongoose')

module.exports = new Schema({
  userName: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  eMail: { type: String, required: true },
  psw: { type: String, required: true },
  isAdmin: { type: Boolean, required: true }
})
