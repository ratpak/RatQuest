/* eslint-disable no-new-func */
/* eslint-disable id-length */

import React from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import loadFunction from '../utils/loadFunction'
import createAndTest from '../utils/createAndTest'
import {fetchProblem} from '../store/problem'
import {connect} from 'react-redux'
import GameStage from './game-stage'
import editorThemes from '../utils/editorThemes'
editorThemes.forEach(theme => require(`brace/theme/${theme}`))

class Sandbox extends React.Component {
  constructor() {
    super()
    this.state = {
      result: '',
      editor: '',
      theme: 'dracula',
      readOnly: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleThemeChange = this.handleThemeChange.bind(this)
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
  handleThemeChange(e) {
    this.setState({
      theme: e.target.value
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

    this.setState({result})
  }

  render() {
    console.log('rerender')
    return (
      <div>
        <div>
          <GameStage />
        </div>
        <h2>
          Problem #{this.props.match.params.problemId}
          {this.test}
        </h2>
        <h3>{this.props.currentProblem.description}</h3>
        <select onChange={this.handleThemeChange}>
          {editorThemes.map(theme => {
            return (
              <option
                key={Math.random()}
                value={theme}
                selected={theme === this.state.theme}
              >
                {theme}
              </option>
            )
          })}
        </select>
        <br />
        <AceEditor
          mode="javascript"
          theme={this.state.theme}
          value={this.state.editor}
          onPaste={this.handlePaste}
          onChange={this.handleChange}
          name="myEditor"
          height="500px"
          width="500px"
          editorProps={{$blockScrolling: Infinity}}
          cursorStart={12}
          fontSize={14}
          focus={true}
          onSelectionChange={e => {
            if (
              e.selectionLead.row <= 1 ||
              e.selectionAnchor.row <= 1 ||
              e.selectionAnchor.row === e.doc.$lines.length - 1 ||
              e.selectionLead.row === e.doc.$lines.length - 1
            ) {
              if (!this.state.readOnly) this.setState({readOnly: true})
            } else if (this.state.readOnly) this.setState({readOnly: false})
          }}
          onCursorChange={e => {
            if (
              e.selectionLead.row > 1 &&
              e.selectionLead.row !== e.doc.$lines.length - 1
            ) {
              if (this.state.readOnly) this.setState({readOnly: false})
            } else if (!this.state.readOnly) this.setState({readOnly: true})
          }}
          wrapEnabled={true}
          readOnly={this.state.readOnly}
        />
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
