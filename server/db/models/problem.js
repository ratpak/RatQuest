const Sequelize = require('sequelize')
const db = require('../db')

const Problem = db.define('problem', {
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  arguments: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  },
  funcName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  inputs: {
    type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.STRING)),
    allowNull: false,
    get: function()  {
      let types = this.getDataValue('arguments');
      let inputs = this.getDataValue('inputs');
      for (let j = 0; j < inputs.length; j++) {
        for (let i = 0; i < types.length; i++) {
          switch (types[i].slice(0,3)) {
            case 'num':
              inputs[j][i] = parseInt(inputs[j][i])
              break;
            case 'arr':
              if (inputs[j][i].includes(',')) {
                inputs[j][i] = inputs[j][i].split(', ')
              } else {
                inputs[j][i] = [inputs[j][i]]
                break;
              }
            // case 'obj':
            //   return inputs[j].map((input) => {
            //   })
            default:
              continue
          }
        }
      }
      return inputs
    },
  },
  outputs: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  }
})

module.exports = Problem
