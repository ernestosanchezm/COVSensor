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

  function deleteAirBombById(_airBomb) {
    return AirBombModel.deleteOne({
      _airBomb: _id
    });
  }

  // HU27 - Get Status AirBomb by Id
  function getAirBombById(_filterClosedSpace) {
    return AirBombModel.findOne({
      _id: _filterClosedSpace
    });
  }

  // HU28, HU30 - Update Status Airbomb and Schedule Airbomb
function getAirBombByIdGadget(_filterAirBomb) {
  return AirBombModel.findOne({
    id_Arduino: _filterAirBomb.id_Arduino
  });
}

async function updateAirBomb(_airbomb) {
  const foundAirBomb = await AirBombModel.findOne({
    id_Arduino: _airbomb.id_Arduino.valueOf()
  });
  foundAirBomb.status = _airbomb.status;
  foundAirBomb.description = _airbomb.description;
  const newAirBomb = await foundAirBomb.save();
  return newAirBomb;
}

// HU 29 - Get All Airbomb
function listAllAirBomb() {
  return AirBombModel.find();
}


  return {
    add,
    getById,
    getAirBombById,
    getAirBombByIdGadget,
    updateAirBomb,
    listAllAirBomb,
    listAllAirBombs,
    deleteAirBombById
  }
}
