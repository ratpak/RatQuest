const assert = require('chai').assert

const testFunction = (func, input, output) => {
  if (typeof func === 'string') return func
  let errorMessages = []
  let result = ''
  for (let i = 0; i < input.length; i++) {
    try {
      assert.deepEqual(func(...input[i]), output[i])
    } catch (e) {
      errorMessages.push(e.message)
    }
  }
  if (!errorMessages.length) result = 'success'
  else {
    for (let i = 0; i < errorMessages.length; i++) {
      result += errorMessages[i] + ' \n'
    }
  }
  return result
}

export default testFunction
