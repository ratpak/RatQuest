'use strict'

const db = require('../server/db')
const {User, Problem, Stage, UserProblems} = require('../server/db/models')
const stageData = require('./stageData')
const problemData = require('./problemData')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'user@user.com', password: 'user'}),
    User.create({
      email: 'jerry@jerry.com',
      password: 'jerry',
      avatarUrl:
        'https://www.dwerghamster.nl/fotoalbum/fotos/forum/2009/20080309-rat8.jpg'
    }),
    User.create({
      email: 'admin@admin.com',
      password: 'admin',
      avatarUrl:
        'https://wallscover.com/images/pinky-and-the-brain-wallpaper-6.jpg',
      isAdmin: true
    })
  ])

  const stages = await Promise.all([
    Stage.bulkCreate(stageData, {returning: true})
  ])

  const problems = await Promise.all([
    Problem.bulkCreate(problemData, {returning: true})
  ])

  const userProblems = await Promise.all([
    UserProblems.create({userId: 1, problemId: 5}),
    UserProblems.create({userId: 1, problemId: 3}),
    UserProblems.create({userId: 1, problemId: 4})
  ])

  // creating user association with stage
  try {
    const [user1, user2, user3] = users
    return await Promise.all([
      user1.setStage(1),
      user2.setStage(1),
      user3.setStage(1)
    ])
  } catch (err) {
    console.error(err, '<<<failed seeding user stage with Magic Method')
  }

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${stages.length} stages`)
  console.log(`seeded ${problems.length} problems`)
  console.log(`seeded ${userProblems.length} userProblems`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
