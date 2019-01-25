import axios from 'axios'

// INITIAL STATE
const initialState = {
  currentProblem: {}
}

// ACTION TYPES
const GOT_PROBLEM = 'GOT_PROBLEM'

// ACTION CREATORS
const gotProblem = data => ({
  type: 'GOT_PROBLEM',
  data
})

// THUNK CREATOR

export const fetchProblem = id => {
  return async function(dispatch) {
    let {data} = await axios.get(`/api/problems/${id}`)
    console.log('thunk>>>', data)
    dispatch(gotProblem(data))
  }
}

// REDUCER

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_PROBLEM:
      return {...state, currentProblem: action.data}
    default:
      return state
  }
}
