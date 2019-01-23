const Sequelize = require('sequelize')
const db = require('../db')

const Problem = db.define('problem', {
  question: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  answer: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  url: {
    type: Sequelize.string,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Problem
