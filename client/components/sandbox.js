/* eslint-disable no-new-func */
/* eslint-disable id-length */
import React from 'react'
import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import {stringify} from 'querystring'

let dummyProblem = {
  desc: 'good luck noob',
  args: ['num1', 'num2'],
  input: [[11, 3], [2, 2], [11, 7]],
  output: [33, 4, 78],
  name: 'yaodi'
}

class Sandbox extends React.Component {
  constructor() {
    super()
    this.state = {
      status: '',
      editor: `function ${dummyProblem.name}(${dummyProblem.args.join(', ')}){
        
// Your code below! (please don't edit this comment) //**//








}`
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  handleChange(e) {
    this.setState({...this.state, editor: e})
  }
  handleClick() {
    // Grab user input from the code editor stored in state.
    let string = this.state.editor
    let start

    // Find and slice out function body
    for (let i = 0; i < string.length; i++) {
      if (string[i] === '/') {
        if (string.slice(i, i + 6) === '//**//') start = i + 6
      }
    }
    let funcString = string.slice(start, string.length - 2)

    // Construct the function using the function constructor. Argument names come from database (dummy data right now), function body comes from user input.
    let theirFunc = new Function(dummyProblem.args.join(', '), funcString)

    // Test their function against our input/outputs
    let status = ''
    try {
      for (let i = 0; i < dummyProblem.input.length; i++) {
        let theirResult = theirFunc(...dummyProblem.input[i])
        if (theirResult !== dummyProblem.output[i])
          status += `expected: ${
            dummyProblem.output[i]
          } actual: ${theirResult} for inputs: ${dummyProblem.input[i].join(
            ', '
          )}\n`
      }
    } catch (e) {
      // While we test their function, if it returns an error the status should be set to the error (this is very flimsy).
      status = e.toString()
      console.log('found it')
    }
    if (status === '') status = 'success'
    this.setState({status})
  }

  render() {
    console.log('state', this.state)
    return (
      <div>
        <h1>{dummyProblem.desc}</h1>
        <AceEditor
          mode="javascript"
          theme="monokai"
          value={this.state.editor}
          onPaste={this.handlePaste}
          onChange={this.handleChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{$blockScrolling: true}}
        />{' '}
        {this.state.status.split('\n').map(thing => <h1>{thing}</h1>)}
        <button type="button" onClick={this.handleClick}>
          submit
        </button>
      </div>
    )
  }
}

export default Sandbox
