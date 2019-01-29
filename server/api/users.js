const router = require('express').Router()
const {User, Stage} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// endpoint to get stages associated with user
router.get('/stages/:userId', async (req, res, next) => {
  try {
    const stages = await User.findById(req.params.userId, {
      include: [{model: Stage}]
    })
    res.json(stages.stage)
  } catch (err) {
    next(err)
    console.error(err, '<<< users stages error')
  }
})
