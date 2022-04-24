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

  function getById(_filterAirBomb) {
    return AirBombModel.findOne({
      id: _filterAirBomb.id
    });
  }

  async function updateAirBomb(_airBomb) {
    const foundAirBomb = await AirBombModel.findOne({
      _id: _airBomb._id.valueOf()
    });
    foundAirBomb.description = _airBomb.description;
    const newAirBomb = await foundAirBomb.save();
    return newAirBomb;
  }

  return {
    add,
    listAllAirBombs,
    checkIfExists,
    getById,
    updateAirBomb
  }
}
