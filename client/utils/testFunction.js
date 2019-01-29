const testFunction = (func, input, output) => {
  if (typeof func === 'string') return func
  let result = ''
  console.log('arguments', func, input, output)
  console.log('created function wrapper', func)
  try {
    for (let i = 0; i < input.length; i++) {
      let theirResult = func(...input[i])
      if (theirResult !== output[i])
        result += `expected: ${
          output[i]
        } actual: ${theirResult} for inputs: ${input[i].join(', ')}\n`
    }
    if (result === '') result = 'success'
  } catch (e) {
    result = e.toString()
  }
  return result
}

export default testFunction
