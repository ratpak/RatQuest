const router = require('express').Router()
const {Problem, UserProblems} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const problems = await Problem.findAll({})
    res.json(problems)
  } catch (err) {
    next(err)
  }
})

router.get('/solved/:userId', async (req, res, next) => {
  try {
    const solvedProblems = await UserProblems.findAll({
      where: {
        userId: req.params.userId
      }
    })
    let sortedSolvedProblems = {}
    for (let i = 0; i < solvedProblems.length; i++) {
      let problem = solvedProblems[i]
      let prob = await Problem.findById(problem.problemId)
      if (sortedSolvedProblems[prob.stageId]) {
        sortedSolvedProblems[prob.stageId].push(problem)
      } else {
        sortedSolvedProblems[prob.stageId] = [problem]
      }
    }
    res.json(sortedSolvedProblems)
  } catch (err) {
    next(err)
  }
})

router.post('/solved/:userId/:problemId', async (req, res, next) => {
  try {
    await UserProblems.create({
      userId: req.params.userId,
      problemId: req.params.problemId
    })
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
