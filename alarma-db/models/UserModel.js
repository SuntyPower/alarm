
const Sequelize = require('sequelize');
const setupDb = require('../logs/db')





module.exports = function setupDatabase (config) {
  const sequelize = setupDb(config)


return sequelize.define('user',{
  firstName:{
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  username:{
    type: Sequelize.STRING,
    allowNull:false,
    unique:true
  },
  password:{
    type: Sequelize.STRING,
    allowNull:false
  },
  email:{
    type: Sequelize.STRING,
    allowNull:false,
    unique:true
  }
})
}
