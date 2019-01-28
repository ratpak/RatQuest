/* eslint-disable no-new-func */
/* eslint-disable id-length */
import React from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import loadFunction from '../utils/loadFunction'
import createFunction from '../utils/createFunction'
import testFunction from '../utils/testFunction'
import createAndTest from '../utils/createAndTest'
import {fetchProblem} from '../store/problem'
import {connect} from 'react-redux'

class Sandbox extends React.Component {
  constructor() {
    super()
    this.state = {
      result: '',
      editor: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleClear = this.handleClear.bind(this)
  }

  async componentDidMount() {
    await this.props.fetchProblem(this.props.match.params.problemId)
    this.setState({
      editor: loadFunction(
        this.props.currentProblem.funcName,
        this.props.currentProblem.arguments
      )
    })
  }
  handleClear() {
    this.setState({
      editor: loadFunction(
        this.props.currentProblem.funcName,
        this.props.currentProblem.arguments
      )
    })
  }

  handleChange(e) {
    this.setState({editor: e})
  }
  async handleClick() {
    // Grab user input from the code editor stored in state.
    let body = this.state.editor
    let result = await createAndTest(
      this.props.currentProblem.arguments,
      body,
      this.props.currentProblem.inputs,
      this.props.currentProblem.outputs
    )

    console.log('gotFromCreateAndTest', result)
    this.setState({result})
  }

  render() {
    // console.log('state', this.state)
    // console.log(this.props)
    return (
      <div>
        <h2>
          Problem #{this.props.match.params.problemId}
          {this.test}
        </h2>
        <h3>{this.props.currentProblem.description}</h3>
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
        <button type="button" onClick={this.handleClear}>
          clear
        </button>
      </div>
    )
  }
}

const mapState = state => ({
  currentProblem: state.problem.currentProblem
})
const mapDispatch = dispatch => ({
  fetchProblem: id => dispatch(fetchProblem(id))
})

export default connect(mapState, mapDispatch)(Sandbox)
