import axios from 'axios'

// INITIAL STATE
const initialState = {
  currentProblem: {},
  solvedProblems: {}
}

// ACTION TYPES
const GOT_PROBLEM = 'GOT_PROBLEM'
const GOT_PROBLEMS = 'GOT_PROBLEMS'

// ACTION CREATORS
const gotProblem = data => ({
  type: GOT_PROBLEM,
  data
})

const gotProblems = data => ({
  type: GOT_PROBLEMS,
  data
})

// THUNK CREATOR

export const fetchProblem = id => {
  return async function(dispatch) {
    let {data} = await axios.get(`/api/problems/${id}`)
    dispatch(gotProblem(data))
  }
}

export const fetchSolvedProblems = userId => {
  return async function(dispatch) {
    let {data} = await axios.get(`/api/problems/solved/${userId}`)
    dispatch(gotProblems(data))
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
    default:
      return state
  }
}
