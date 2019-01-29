/* eslint-disable no-new-func */
/* eslint-disable id-length */
import React from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import loadFunction from '../../utils/loadFunction'
import createFunction from '../../utils/createFunction'
import testFunction from '../../utils/testFunction'
import {fetchProblem, addSolvedProblem} from '../store/problem'
import {connect} from 'react-redux'
import GameStage from './game-stage'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import {Link} from 'react-router-dom'

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
      open: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleClose = this.handleClose.bind(this)
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
  handleClick() {
    // Grab user input from the code editor stored in state.
    let body = this.state.editor
    let result = testFunction(
      createFunction(this.props.currentProblem.arguments, body),
      this.props.currentProblem.inputs,
      this.props.currentProblem.outputs
    )
    console.log(result)
    if (result === 'success') {
      this.props.addSolvedProblem(
        this.props.user.id,
        this.props.currentProblem.id
      )
      this.setState({open: true})
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
  user: state.user
})
const mapDispatch = dispatch => ({
  fetchProblem: id => dispatch(fetchProblem(id)),
  addSolvedProblem: (userId, problemId) =>
    dispatch(addSolvedProblem(userId, problemId))
})

export default connect(mapState, mapDispatch)(Sandbox)
