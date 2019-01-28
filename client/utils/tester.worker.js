import testFunction from './testFunction'
import createFunction from './createFunction'

// Every time submit is clicked, a message is sent from /createAndTest which will trigger the whole process of creating, testing, and returing the result of a function.

self.addEventListener('message', event => {
  let {data} = event
  let {args, body, input, output} = data
  let result = testFunction(createFunction(args, body), input, output)
  console.log('1234')
  self.postMessage(result)
})
