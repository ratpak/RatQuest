import Worker from './tester.worker'

const createAndTest = (args, body, input, output) => {
  let result = new Promise(resolve => {
    let problemData = {args, body, input, output}
    const worker = new Worker()
    setTimeout(() => {
      worker.terminate()
      resolve('timeout exceeded')
    }, 2000)
    worker.postMessage(problemData)
    worker.onmessage = event => {
      let {data} = event
      resolve(data)
    }
  })
  return result
}
export default createAndTest
