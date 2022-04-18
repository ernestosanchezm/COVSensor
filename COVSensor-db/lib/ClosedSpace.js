'use strict'

module.exports = function setupClosedSpace(ClosedSpaceModel) {

  function add(_closedspace) {
    console.log(_closedspace)
    const myClosedSpace = new ClosedSpaceModel(_closedspace);
    return myClosedSpace.save();
  }

//-HU 9 - Add ClosedSpace
async function checkIfExistsClosedSpace(_filterClosedSpace) {
return ClosedSpaceModel.findOne({
    $or: [{
      id_Arduino: _filterClosedSpace.id_Arduino
    }]
})
}

//-HU 10 - Get ClosedSpace
function listAllClosedSpace() {
  return ClosedSpaceModel.find();
}

//-HU 12 - Update ClosedSpace
function getClosedSpaceByUsername(_filterClosedSpace) {
  return ClosedSpaceModel.findOne({
    id_Arduino: _filterClosedSpace.id_Arduino
  });
}

async function updateClosedSpace(_closedspace) {
  const foundCloseSpace = await ClosedSpaceModel.findOne({
    id_Arduino: _closedspace.id_Arduino.valueOf()
  });
  foundCloseSpace.description = _closedspace.description;
  const newClosedSpace = await foundCloseSpace.save();
  return newClosedSpace;
}

  return {
    add,
    checkIfExistsClosedSpace,
    listAllClosedSpace,
    getClosedSpaceByUsername,
    updateClosedSpace
  }
}