
const Sequelize = require('sequelize');
const setupDb = require('../logs/db')





module.exports = function setupDatabase (config) {
  const sequelize = setupDb(config)


return sequelize.define('report',{
  zone:{
    type: Sequelize.INTEGER,
    allowNull:false
  },
  triggered:{
    type: Sequelize.BOOLEAN,
    allowNull:false
  },
  type:{
    type: Sequelize.STRING,
    allowNull:false
  }
})
}
