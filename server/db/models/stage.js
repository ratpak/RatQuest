const Sequelize = require('sequelize')
const db = require('../db')

const Stage = db.define('stage', {
  name: {
    type: Sequelize.String
  },

  progress: {
    type: Sequelize.INTEGER
  }
})

module.exports = Stage
