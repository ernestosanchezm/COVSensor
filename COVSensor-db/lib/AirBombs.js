'use strict'
module.exports = function setupAirBomb (AirBombModel) {
  function add (_airBomb) {
    const myAirBomb = new AirBombModel(_airBomb)
    return myAirBomb.save()
  }
  function list () {
    return AirBombModel.find()
  }
  return {
    add,
    list
  }
}
