'use strict'

module.exports = function setupUser (UserModel) {

  async function create(user){
    const User=await UserModel.create(user).catch((err)=>{
      return null;
    })
    return User
  }

  async function findAll(){
  return UserModel.findAll()
    }

  async function findByUsername(username){
    const user= await UserModel.findOne({
      where:{
        username
      }
    }).catch((err) => {console.log(err)})
    return user
  }

  // devuelve True si el usuario ya esta en uso
  async function checkNewUser(email) {
    const user = await UserModel.findOne({
      where:{
          email: email
      }
    }).catch((err) => {
      console.log(err)
      return false
      })
    return user ? true : false
  }

  return {
    create,
    findAll,
    findByUsername,
    checkNewUser
  }
}
