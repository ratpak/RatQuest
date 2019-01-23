const Sequelize = require('sequelize')
const db = require('../db')

const Stage = db.define('stage', {
  name: {
    type: Sequelize.String
  },
  number: {
    type: Sequelize.STRING
  },
  progress: {
    type: Sequelize.STRING
  }
})

module.exports = Stage
