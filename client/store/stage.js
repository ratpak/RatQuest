import axios from 'axios'

// INITIAL STATE
const initialStages = {}

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
      const {data} = await axios.get(`/api/users/stages/${userId}`)
      dispatch(gotStages(data))
    } catch (err) {
      console.error(err, '<<< fetchStages Thunk')
    }
  }
}

// REDUCER
export default function(state = initialStages, action) {
  switch (action.type) {
    case GOT_STAGES:
      return action.stages
    default:
      return state
  }
}
