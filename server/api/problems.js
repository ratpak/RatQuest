const router = require('express').Router()
const {Problem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const problems = await Problem.findAll({
    })
    res.json(problems)
  } catch (err) {
    next(err)
  }
})
