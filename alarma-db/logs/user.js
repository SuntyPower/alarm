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


  return {
    create,
    findAll,
    findByUsername

  }
}
