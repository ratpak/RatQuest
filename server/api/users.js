const router = require('express').Router()
const {User, Stage} = require('../db/models')
//??
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'isAdmin', 'avatarUrl']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//route to toggle the user is admin
router.put('/:id', async function(req, res, next) {
  try {
    const user = await User.findById(req.params.id)

    const updatedUser = await user.update(
      {isAdmin: !user.isAdmin},
      {
        returning: true,
        plain: true
      }
    )

    res.json(updatedUser)
  } catch (err) {
    next(err)
  }
})

//endpoint to delete a user
router.delete('/:id', async function(req, res, next) {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      const err = new Error('Not Found')
      err.status = 404
      return next(err)
    }
    await user.destroy()
    res.sendStatus(204)
  } catch (error) {
    res.sendStatus(500)
  }
})

// endpoint to get stages associated with user
router.get('/stages/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId, {
      include: [{model: Stage}]
    })
    res.json(user.stage)
  } catch (err) {
    next(err)
    console.error(err, '<<< users stages error')
  }
})

router.post('/stages/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId, {
      include: [{model: Stage}]
    })
    user.update({
      stageId: user.stageId + 1
    })
    res.json(user.stage)
  } catch (err) {
    next(err)
  }
})
