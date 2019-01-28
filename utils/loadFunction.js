// This utility function takes in function name (string) and arguments (array), returns the function in string format for the react-ace code editor! -yh

// REVIEW: let's talk about what's going on here
const loadFunction = (name, args) => {
  return `function ${name}(${args.join(', ')}){

// Your code below! (please don't edit this comment) //**//













}`
}
export default loadFunction
