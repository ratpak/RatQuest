// Worker.js
// const _ = require('lodash')

// const obj = {foo: 'foo'}

// _.has(obj, 'foo')

// // Post data to parent thread
// // Respond to message from parent thread
// self.addEventListener('message', event => console.log(event))

self.postMessage({foo: 'foo'})

console.log('hello from worker.js')
