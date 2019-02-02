const router = require('express').Router()
const {User, Stage, Game} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const games = await Game.findAll()
    res.json(games)
  } catch (e) {
    next(e)
  }
})
router.get('/active', async (req, res, next) => {
  try {
    const games = await Game.findAll({
      where: {active: true},
      include: {model: User}
    })
    res.json(games)
  } catch (e) {
    next(e)
  }
})

router.get('/active/:lobbyName', async (req, res, next) => {
  try {
    const currentGame = await Game.findOne({
      where: {active: true, lobbyName: req.params.lobbyName}
    })
    res.json(currentGame)
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const game = await Game.findById(req.params.id, {include: {all: true}})
    res.json(game)
  } catch (e) {
    next(e)
  }
})
