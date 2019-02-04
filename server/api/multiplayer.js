const router = require('express').Router()
const {User, Stage, Game} = require('../db/models')
module.exports = router

router.get('/games', async (req, res, next) => {
  try {
    const games = await Game.findAll({include: {all: true}})
    res.json(games)
  } catch (e) {
    next(e)
  }
})
