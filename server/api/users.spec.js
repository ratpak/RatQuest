/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Stage = db.model('stage')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const user1email = 'user@user.com'

    beforeEach(() => {
      return User.create({
        email: user1email
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app)
        .get('/api/users')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(user1email)
    })
  }) // end describe('/api/users')

  describe('/api/users/stages/:userId', () => {
    const stageName = 'test-stage-name'
    const stageProgress = 0
    const stageGoal = 10
    const user2email = 'admin@admin.com'
    const user2AdminStatus = true
    let stageId
    let user2Id

    beforeEach(async () => {
      const newStage = await Stage.create({
        name: stageName,
        progress: stageProgress,
        goal: stageGoal
      })
      stageId = newStage.id

      const newUser = await User.create({
        email: user2email,
        admin: user2AdminStatus
      }).then(user => user.setStage(stageId))
      user2Id = newUser.id
      return newUser
    })

    it('GET /api/users/stages/:userId', async () => {
      const res = await request(app)
        .get(`/api/users/stages/${user2Id}`)
        .expect(200)

      expect(res.body).to.be.an('object')
      // expect(res.body.stage.id).to.be.equal(stageId)
    })
  }) // end describe('/api/users/stages/:userId')
}) // end describe('User routes')
