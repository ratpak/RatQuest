/* eslint-disable no-new-func */
/* eslint-disable id-length */

import React from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import loadFunction from '../utils/loadFunction'
import {fetchProblem, addSolvedProblem} from '../store/problem'
import {connect} from 'react-redux'
import GameStage from './game-stage'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import {Link} from 'react-router-dom'
import createAndTest from '../utils/createAndTest'
import editorThemes from '../utils/editorThemes'
editorThemes.forEach(theme => require(`brace/theme/${theme}`))

// let dummyProblem = {
//   desc: 'write a function that multiplies 2 numbers',
//   args: ['num1', 'num2'],
//   input: [[11, 3], [2, 2], [11, 7]],
//   output: [33, 4, 77],
//   name: 'yaodi'
// }

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class Sandbox extends React.Component {
  constructor() {
    super()
    this.state = {
      result: '',
      editor: '',
      open: false,
      stageComplete: false,
      theme: 'dracula',
      readOnly: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleThemeChange = this.handleThemeChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchProblem(this.props.user.id)
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
    console.log(result)
    if (result === 'success') {
      this.props.addSolvedProblem(
        this.props.user.id,
        this.props.currentProblem.id
      )
      if (
        this.props.solvedProblems[this.props.user.id].problems.length + 1 ===
        this.props.stage.goal
      ) {
        this.setState({stageComplete: true})
      } else {
        this.setState({open: true})
      }
    }
    this.setState({result})
  }

  handleClose() {
    this.setState({open: false, result: ''})
  }

  render() {
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
        <div>
          <button type="button" onClick={this.handleClick}>
            submit
          </button>
          <Dialog
            open={this.state.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">Great Job!!</DialogTitle>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                <Link to="/home">Home</Link>
              </Button>
              <Button onClick={this.handleClose} color="primary">
                <Link to={`/sandbox/${this.props.currentProblem.id + 1}`}>
                  Next Problem
                </Link>
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={this.state.stageComplete}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              Awesome Job! Stage {this.props.user.stageId} Complete!!
            </DialogTitle>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                <Link to="/home">Home</Link>
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <button type="button" onClick={this.handleClear}>
          clear
        </button>
      </div>
    )
  }
}

const mapState = state => ({
  currentProblem: state.problem.currentProblem,
  solvedProblems: state.problem.solvedProblems,
  user: state.user,
  stage: state.stage
})
const mapDispatch = dispatch => ({
  fetchProblem: id => dispatch(fetchProblem(id)),
  addSolvedProblem: (userId, problemId) =>
    dispatch(addSolvedProblem(userId, problemId))
})

export default connect(mapState, mapDispatch)(Sandbox)
