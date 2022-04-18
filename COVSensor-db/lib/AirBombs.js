'use strict'
module.exports = function setupAirBomb (AirBombModel) {
  function add (_airBomb) {
    const myAirBomb = new AirBombModel(_airBomb)
    return myAirBomb.save()
  }
  function listAllAirBombs () {
    return AirBombModel.find()
  }
  
  async function checkIfExists(_filterAirBomb) {
    return AirBombModel.findOne({
      $or: [{
        status: _filterAirBomb.status
      }]
    })
  }

  return {
    add,
    listAllAirBombs,
    checkIfExists
  }
}
