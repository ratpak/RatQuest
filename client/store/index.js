import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {loadState, saveState} from './sessionStorage'
import user from './user'
import problem from './problem'
import stage from './stage'
import game from './game'

import users from './admin'
const throttle = require('lodash').throttle

const debounce = require('lodash').debounce

const reducer = combineReducers({user, problem, stage, users, game})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
// persisted state loads serialize verison of store state to client session storage
// allows data to remain client side upon hard browser refresh
const persistedState = loadState()
const store = createStore(reducer, persistedState, middleware)

// saveState saves state to client session storage to be retreieved
// by loadState clientside upon hard browser refresh
// wrapping store.subscribe callback in debounce to ensure only write to session storage at most once per second
// debounce will save only the last update within that second so latest changes captured
store.subscribe(
  debounce(() => {
    saveState({
      problem: store.getState().problem,
      stage: store.getState().stage
    })
  }),
  1000
)

export default store
export * from './user'
export * from './stage'
export * from './admin'
export * from './problem'
