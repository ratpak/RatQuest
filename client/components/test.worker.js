// Worker.js
// const _ = require('lodash')

// const obj = {foo: 'foo'}

// _.has(obj, 'foo')

// // Post data to parent thread
// // Respond to message from parent thread

console.log('hello from worker.js')
self.addEventListener('message', event => {
  console.log('received from master', event)
  self.postMessage({foo: 'bar'})
})
