const router = require('express').Router()
const {Stage, Problem} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const stages = await Stage.findAll()
    res.json(stages)
  } catch (err) {
    next(err)
  }
})
