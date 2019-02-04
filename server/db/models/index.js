const db = require('../db')
const User = require('./user')
const Stage = require('./stage')
const Problem = require('./problem')
const Game = require('./game')
const Sequelize = require('sequelize')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Stage.hasMany(User)
User.belongsTo(Stage)

Stage.hasMany(Problem)
Problem.belongsTo(Stage)

const UserProblems = db.define('user_problems', {})
const UserGames = db.define('user_games', {
  score: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

User.belongsToMany(Problem, {through: UserProblems})
Problem.belongsToMany(User, {through: UserProblems})

User.belongsToMany(Game, {through: UserGames})
Game.belongsToMany(User, {through: UserGames})
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Stage,
  Problem,
  Game,
  UserProblems,
  UserGames
}
