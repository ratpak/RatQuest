const router = require('express').Router()
const {User, Stage, Game} = require('../db/models')
const socketio = require('socket.io')
const app = require('../index')

module.exports = router

router.get('/games', async (req, res, next) => {
  try {
    console.log('hit games')
    const games = await Game.findAll({include: {all: true}})

    // set up our socket control center
    // const startListening = async () => {
    //   let PORT = 1337

    //   const multiplayerServer = await app.listen(PORT, () =>
    //     console.log(`multiplayer listening on ${PORT}`)
    //   )
    //   console.log('after listen')
    //   const io = socketio(multiplayerServer)

    //   require('../socket/multiplayer')(io)
    //   console.log('should come before res')
    // }
    // await startListening()
    console.log('right before res')
    res.json(games)
  } catch (e) {
    next(e)
  }
})
