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
    let wrapper = {}
    console.log(args, 'args')
    wrapper.stuff = 'stuff'
    wrapper.createdFunc = new Function(args.join(', '), 'arg3=this.stuff', body)
    return wrapper
  } catch (e) {
    console.log('weird error: ', e.toString())
  }
}

export default createFunction
