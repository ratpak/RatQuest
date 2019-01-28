import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {loadState, saveState} from './sessionStorage'
import user from './user'
import problem from './problem'
import stage from './stage'
const throttle = require('lodash').throttle

function localStateCache (cacheKey, reducer) {
  const throttledWrite = throttle((nextState) => {
    localStorage.setItem(cacheKey, JSON.stringify(nextState))
  }, 1000)

  return function (state, action) {
    if (state === undefined) {
      state = JSON.parse(localStorage.getItem(cacheKey))
    }
    const nextState = reducer(state, action)
    throttledWrite(nextState)
    return nextState
  }
}

const reducer = combineReducers({
  user,
  problem,
  localStateCache('solution', solution),
  localStateCache('stage', stage),
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
// persisted state loads serialize verison of store state to HTML5 session storage
// allows data to remain client side upon hard browser refresh
const persistedState = loadState()
const store = createStore(reducer, persistedState, middleware)

// saveState saves state to HTML 5 session storage to be retreieved
// by loadState clientside upon hard browser refresh
// wrapping store.subscribe callback in throttle to ensure only write to HTML5 session storage at most once per second
// REVIEW: lets talk about this
let lestSetState
store.subscribe(
  () => lastSetStae = store.getState()
)

setInterval(() => {
  if (lastSetStae) {
    saveState(lastSetStae)
  }
  lastSetStae = undefined
}, 1000)

export default store
export * from './user'
export * from './stage'
