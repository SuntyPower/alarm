
const Sequelize = require('sequelize');
const setupDb = require('../logs/db')




module.exports = function setupDatabase (config) {
  const sequelize = setupDb(config)


return sequelize.define('device',{
  uuid:{
    type: Sequelize.STRING,
    allowNull:false
  },
  zones:{
    type: Sequelize.STRING,
    allowNull:false
  },
  version:{
    type: Sequelize.INTEGER,
    allowNull:false
  },
  state:{
    type: Sequelize.INTEGER,
    allowNull:false
  }
})
}
