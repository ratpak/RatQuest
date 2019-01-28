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
// REVIEW: should user be authenticated so othres cant see this?
router.get('/stages/:userId', async (req, res, next) => {
  try {
    const stages = await User.findById(req.params.userId, {
      // REVIEW: include all ? danger zone?
      include: {all: true}
    })
    res.json(stages.stage)
  } catch (err) {
    next(err)
    console.log(err, '<<< users stages error')
  }
})
