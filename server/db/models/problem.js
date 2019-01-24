const Sequelize = require('sequelize')
const db = require('../db')

const Problem = db.define('problem', {
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  arguments: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  input: {
    type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.TEXT)),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  output: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Problem
