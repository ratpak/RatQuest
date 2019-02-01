import axios from 'axios'

// INITIAL STATE
const initialState = {
  currentProblem: {},
  solvedProblems: {},
  allProblems: {}
}

// ACTION TYPES
const GOT_PROBLEM = 'GOT_PROBLEM'
const GOT_PROBLEMS = 'GOT_PROBLEMS'
const ALL_PROBLEMS = 'ALL_PROBLEMS'

// ACTION CREATORS
const gotProblem = data => ({
  type: GOT_PROBLEM,
  data
})

const gotProblems = data => ({
  type: GOT_PROBLEMS,
  data
})

const allProblems = data => ({
  type: ALL_PROBLEMS,
  data
})

// THUNK CREATOR

export const fetchProblem = (userId, problemId) => {
  return async function(dispatch) {
    let {data} = await axios.get(`/api/problems/${userId}`, {
      params: {problemId} || ''
    })
    dispatch(gotProblem(data))
  }
}

export const fetchSolvedProblems = userId => {
  return async function(dispatch) {
    let {data} = await axios.get(`/api/problems/solved/${userId}`)
    dispatch(gotProblems(data))
  }
}

export const fetchAllProblems = () => {
  return async function(dispatch) {
    let {data} = await axios.get('/api/problems')
    dispatch(allProblems(data))
  }
}

export const addSolvedProblem = (userId, problemId) => {
  return async function(dispatch) {
    await axios.post(`/api/problems/solved/${userId}/${problemId}`)
    let {data} = await axios.get(`/api/problems/solved/${userId}`)
    dispatch(gotProblems(data))
  }
}

// REDUCER

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_PROBLEM:
      return {...state, currentProblem: action.data}
    case GOT_PROBLEMS:
      return {...state, solvedProblems: action.data}
    case ALL_PROBLEMS:
      return {...state, allProblems: action.data}
    default:
      return state
  }
}
