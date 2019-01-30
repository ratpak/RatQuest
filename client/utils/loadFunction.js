// This utility function takes in function name (string) and arguments (array), returns the function in string format for the react-ace code editor! -yh

const loadFunction = (name, args) => {
  return `function ${name}(${args.join(', ')}){        
// Your code below!//**//






























}`
}
export default loadFunction
