const Sequelize = require('sequelize')
const db = require('../db')

const Game = db.define('game', {
  lobbyName: {
    type: Sequelize.STRING
  },
  winner: {
    type: Sequelize.STRING,
    defaultValue: 'TBD'
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})
module.exports = Game
