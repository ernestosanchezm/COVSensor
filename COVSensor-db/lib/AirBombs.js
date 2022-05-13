'use strict'
module.exports = function setupAirBomb (AirBombModel) {
  function add (_airBomb) {
    const myAirBomb = new AirBombModel(_airBomb)
    return myAirBomb.save()
  }
  function list () {
    return AirBombModel.find()
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
    list,
    getAirBombById,
    getAirBombByIdGadget,
    updateAirBomb,
    listAllAirBomb
  }
}
