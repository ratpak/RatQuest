const testFunction = (func, input, output) => {
  let result = ''
  console.log('arguments', func, input, output)
  try {
    for (let i = 0; i < input.length; i++) {
      console.log('created function wrapper', func)
      let theirResult = func.createdFunc(...input[i])
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
