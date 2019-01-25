const router = require('express').Router()
const {Problem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const problems = await Problem.findAll({})
    res.json(problems)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const singleProblem = await Problem.findById(req.params.id)
    res.json(singleProblem)
  } catch (e) {
    next(e)
  }
})
