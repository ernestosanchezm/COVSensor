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
// list Admin
  function listAdmin() {
    return UsersModel.find({
      isAdmin: true
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

  async function chekIfEmailExists(_filterUser) {
    return UsersModel.findOne({
      $or: [{
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

  function getByEmail(_filterUser) {
    return UsersModel.findOne({
      eMail: _filterUser.eMail
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

  //-HU 7 - UPDATE SUPERVISOR --------------
  function getSupervisorByUsername(_filterUser) {
    return UsersModel.findOne({
      userName: _filterUser.userName,
      isAdmin: false
    });
  }

  async function updateSupervisor(_user) {
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

  async function updatePasswordr(_user) {
    const foundUser = await UsersModel.findOne({
      eMail: _user.eMail.valueOf()
    });
    foundUser.psw = _user.psw;
    const newUser = await foundUser.save();
    return newUser;
  }

  //Extra - GET USER BY USERNAME
  function getUserByUsername(_filterUserName) {
    return UsersModel.findOne({
      userName: _filterUserName
    });
  }

  //-HU 8 - DELETE SUPERVISOR -----------------
  function deleteSupervisorByUsername(_username) {
    return UsersModel.deleteOne({
      userName: _username
    });
  }

  return {
    add,
    listSupervisors,
    listAllUsers,
    checkIfExists,
    chekIfEmailExists,
    getByUsernameAndPsw,
    getByEmail,
    getAdminByUsername,
    updateUser,
    updateSupervisor,
    updatePasswordr,
    getSupervisorByUsername,
    listAdmin,
    deleteSupervisorByUsername,
    getUserByUsername
  }
}