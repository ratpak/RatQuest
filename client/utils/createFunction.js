/* eslint-disable no-new-func */
const createFunction = (args, body) => {
  // Find and slice out function body
  try {
    let start
    for (let i = 0; i < body.length; i++) {
      if (body[i] === '/') {
        if (body.slice(i, i + 6) === '//**//') start = i + 6
      }
    }
    body = body.slice(start, body.length - 2)
    console.log(args, 'args')
    let func = new Function(args.join(', '), body)
    return func
  } catch (e) {
    console.log('error from createFunction: ', e.toString())
  }
}

export default createFunction
