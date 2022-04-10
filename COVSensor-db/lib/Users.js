'use strict'

module.exports = function setupUsers(UsersModel) {

  function add(_user) {
    console.log(_user)
    const myUser = new UsersModel(_user);
    return myUser.save();
  }

  function listSupervisors() {
    return UsersModel.find({
      isAdmin: false
    });
  }

  function listAllUsers() {
    return UsersModel.find()
  }


  async function checkIfExists(_filterUser) {
    return UsersModel.findOne({
      $or: [{
        userName: _filterUser.userName
      }, {
        eMail: _filterUser.eMail
      }]
    })
  }

  function getAdminByUsername(_filterUser) {
    return UsersModel.findOne({
      userName: _filterUser.userName,
      isAdmin: true
    });
  }

  function getByUsername(_filterUser) {
    return UsersModel.findOne({
      userName: _filterUser.userName,
    });
  }

  function getByUsernameAndPsw(_filterUser) {
    return UsersModel.findOne({
      userName: _filterUser.userName,
      psw: _filterUser.psw
    });
  }
  
  async function updateUser(_user) {
    const foundUser = await UsersModel.findOne({
      _id: _user._id.valueOf()
    });
    foundUser.userName = _user.userName;
    foundUser.name = _user.name;
    foundUser.lastName = _user.lastName;
    foundUser.eMail = _user.eMail;
    foundUser.psw = _user.psw;
    const newUser = await foundUser.save();
    return newUser;
  }

  return {
    add,
    listSupervisors,
    listAllUsers,
    checkIfExists,
    getByUsernameAndPsw,
    getByUsername,
    getAdminByUsername,
    updateUser
  }
}