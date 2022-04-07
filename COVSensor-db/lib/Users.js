'use strict'
module.exports = function setupUsers (UsersModel) {
  function add (_user) {    
    const myUser=new UsersModel(_user);
    return myUser.save();   
  }
  function listSupervisors(){
    return UsersModel.find({isAdmin:false});
  }
  function getByUsernameAndPsw(_filterUser){
    return UsersModel.find({
      userName:_filterUser.userName,
      psw:_filterUser.psw
    });
  }
  async function updateUser(_user){
    const foundUser=await Model.findOne({_id:_user._id});
    foundUser.userName=_user.userName;
    foundUser.name=_user.name;
    foundUser.lastName=_user.lastName;
    foundUser.eMail=_user.eMail;
    foundUser.psw=_user.psw;
    const newUser=await foundUser.save();
    return newUser;
  }
  return {
    add,
    listSupervisors,
    getByUsernameAndPsw,
    updateUser
  }
}

