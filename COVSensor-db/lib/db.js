'use strict'

const mongoose = require('mongoose')
let _mongoose = null
module.exports = async function setupDatabase (accesDB) {
  if (_mongoose == null) {
    console.log('INICIALIZANDO INSTANCIA .......')
    _mongoose = await mongoose.connect(accesDB,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
  }
  return _mongoose
}
