import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {loadState, saveState} from './localStorage'
import user from './user'
import problem from './problem'
import stage from './stage'
const throttle = require('lodash').throttle

const reducer = combineReducers({user, problem, stage})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
// persisted state loads serialize verison of store state to local storage
// allows data to remain client side upon hard browser refresh
const persistedState = loadState()
const store = createStore(reducer, persistedState, middleware)

// saveStage saves state to localalized storage to be retreieved
// by loadState clientside upon hard browser refresh
// wrapping store.subscribe callback in throttle to ensure only write to local storage at most once per second
store.subscribe(
  throttle(() => {
    saveState(store.getState())
  }),
  1000
)

export default store
export * from './user'
export * from './stage'
