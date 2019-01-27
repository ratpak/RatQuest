import axios from 'axios'

// INITIAL STATE
const initialState = {
  stages: {}
}

// ACTION TYPES
const GOT_STAGES = 'GOT_STAGES'

// ACTION CREATORS
const gotStages = stages => ({
  type: 'GOT_STAGES',
  stages
})

// THUNK CREATOR
export const fetchStages = userId => {
  return async function(dispatch) {
    try {
      console.log(userId, '<<< userId in thunk')
      const {data} = await axios.get(`/api/users/stages/${userId}`)
      dispatch(gotStages(data.stage))
    } catch (err) {
      console.error(err, '<<< fetchStages Thunk')
    }
  }
}

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_STAGES:
      return {...state, stages: action.stages}
    default:
      return state
  }
}
