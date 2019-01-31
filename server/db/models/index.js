const db = require('../db')

const User = require('./user')
const Stage = require('./stage')
const Problem = require('./problem')
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

User.belongsToMany(Problem, {through: UserProblems})
Problem.belongsToMany(User, {through: UserProblems})
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
  UserProblems
}
