/* eslint-disable no-new-func */
/* eslint-disable id-length */
import React from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import loadFunction from '../../utils/loadFunction'
import createFunction from '../../utils/createFunction'
import testFunction from '../../utils/testFunction'

let dummyProblem = {
  desc: 'good luck noob',
  args: ['num1', 'num2'],
  input: [[11, 3], [2, 2], [11, 7]],
  output: [33, 4, 77],
  name: 'yaodi'
}

class Sandbox extends React.Component {
  constructor() {
    super()
    this.state = {
      result: '',
      editor: loadFunction(dummyProblem.name, dummyProblem.args)
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
    let result = testFunction(
      createFunction(dummyProblem.args, string),
      dummyProblem.input,
      dummyProblem.output
    )

    this.setState({result})
  }

  render() {
    console.log('state', this.state)
    return (
      <div>
        <h6>{this.state.test}</h6>
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
        {this.state.result
          .split('\n')
          .map(thing => <h1 key={Math.random()}>{thing}</h1>)}
        <button type="button" onClick={this.handleClick}>
          submit
        </button>
      </div>
    )
  }
}

export default Sandbox
