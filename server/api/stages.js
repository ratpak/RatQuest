const router = require('express').Router()
const {Stage, Problem} = require('../db/models')
module.exports = router

// may not need - pulling in stage from user model in api/users
router.get('/', async (req, res, next) => {
  try {
    const stages = await Stage.findAll()
    res.json(stages)
  } catch (err) {
    next(err)
  }
})
