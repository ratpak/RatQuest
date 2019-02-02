import axios from 'axios'

// INITIAL STATE
const initialState = {
  activeGames: [],
  currentGame: {}
}

// ACTION TYPES

const GOT_ACTIVE_GAMES = 'GOT_ACTIVE_GAMES'
const GOT_CURRENT_GAME = 'GOT_CURRENT_GAME'
const JOIN_LOBBY = 'JOIN_LOBBY'

// ACTION CREATORS

// This action is for grabbing game state from DB
export const gotCurrentGame = data => ({
  type: GOT_CURRENT_GAME,
  data
})

// This action is for joining a lobby in the DB
export const joinLobby = user => ({
  type: JOIN_LOBBY,
  user
})

// This action is for the list of lobbies from DB
const gotActiveGames = data => ({
  type: GOT_ACTIVE_GAMES,
  data
})

// THUNKS
export const fetchActiveGames = () => {
  return async function(dispatch) {
    let {data} = await axios.get('/api/games/active')
    dispatch(gotActiveGames(data))
  }
}

export const fetchCurrentGame = lobbyName => {
  return async function(dispatch) {
    let {data} = await axios.get(`/api/games/active/${lobbyName}`)
    dispatch(gotCurrentGame(data))
  }
}

// REDUCER

export default function(state = initialState, action) {
  switch (action.type) {
    // case JOIN_LOBBY:
    // return {...state,currentGame}
    case GOT_ACTIVE_GAMES:
      return {...state, activeGames: action.data}
    case GOT_CURRENT_GAME:
      return {
        ...state,
        currentGame: action.data
      }
    default:
      return state
  }
}
