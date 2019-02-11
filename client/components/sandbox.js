/* eslint-disable no-new-func */
/* eslint-disable id-length */
import React, {Fragment} from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import loadFunction from '../utils/loadFunction'
import {
  fetchProblem,
  addSolvedProblem,
  fetchSolvedProblems
} from '../store/problem'
import {nextStage} from '../store/stage'
import {connect} from 'react-redux'
import GameStage from './game-stage'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Slide from '@material-ui/core/Slide'
import createAndTest from '../utils/createAndTest'
import editorThemes from '../utils/editorThemes'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import HomeIcon from '@material-ui/icons/HomeSharp'
import ThemeIcon from '@material-ui/icons/ColorLensSharp'
import XIcon from '@material-ui/icons/CloseSharp'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import {Link} from 'react-router-dom'

editorThemes.forEach(theme => require(`brace/theme/${theme}`))

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
      readOnly: true,
      showThemes: false
    }
  }

  componentDidMount = async () => {
    await this.props.fetchSolvedProblems(this.props.user.id)
    await this.props.fetchProblem(this.props.user.id)
    this.setState({
      editor: loadFunction(
        this.props.currentProblem.funcName,
        this.props.currentProblem.arguments
      )
    })
  }
  handleSkip = async () => {
    await this.props.fetchProblem(
      this.props.user.id,
      this.props.currentProblem.id
    )
    this.setState({
      editor: loadFunction(
        this.props.currentProblem.funcName,
        this.props.currentProblem.arguments
      ),
      result: ''
    })
  }
  handleHome = () => {
    this.props.history.push('/home')
  }
  handleClear = () => {
    this.setState({
      editor: loadFunction(
        this.props.currentProblem.funcName,
        this.props.currentProblem.arguments
      )
    })
  }
  handleThemeChange = e => {
    this.setState({
      theme: e.target.value
    })
  }
  handleClose = () => {
    this.setState({open: false, stageComplete: false, result: ''})
    this.props.history.push('/home')
  }

  handleSuccess = async () => {
    await this.props.fetchSolvedProblems(this.props.user.id)
    await this.props.fetchProblem(this.props.user.id)
    this.setState({
      open: false,
      editor: loadFunction(
        this.props.currentProblem.funcName,
        this.props.currentProblem.arguments
      ),
      result: 'mwahaha'
    })
  }
  handleChange = e => {
    this.setState({editor: e})
  }

  //for testing and demo only
  handleCheat = () => {
    // let body = this.state.editor
    let currentProblem = this.props.currentProblem
    let userId = this.props.user.id
    this.props.addSolvedProblem(userId, currentProblem.id)
    if (
      this.props.solvedProblems[this.props.stage.id].problems.length + 1 ===
      this.props.stage.goal
    ) {
      this.props.nextStage(userId)
      this.setState({stageComplete: true})
    } else {
      this.setState({open: true})
    }

    this.setState({result: 'success'})
  }

  handleClick = async () => {
    // Grab user input from the code editor stored in state.
    let body = this.state.editor
    let currentProblem = this.props.currentProblem
    let userId = this.props.user.id
    let result = await createAndTest(
      currentProblem.arguments,
      body,
      currentProblem.inputs,
      currentProblem.outputs
    )
    if (result === 'success') {
      this.props.addSolvedProblem(userId, currentProblem.id)
      console.log(this.props.solvedProblems, 'SOLVED PROBLEMS')
      if (
        this.props.solvedProblems[this.props.stage.id].problems.length + 1 ===
        this.props.stage.goal
      ) {
        this.props.nextStage(userId)
        this.setState({stageComplete: true})
      } else {
        this.setState({open: true})
      }
    }
    this.setState({result})
  }
  handleSelectionChange = e => {
    if (
      e.selectionLead.row <= 1 ||
      e.selectionAnchor.row <= 1 ||
      e.selectionAnchor.row === e.doc.$lines.length - 1 ||
      e.selectionLead.row === e.doc.$lines.length - 1
    ) {
      if (!this.state.readOnly) this.setState({readOnly: true})
    } else if (this.state.readOnly) this.setState({readOnly: false})
  }
  handleCursorChange = e => {
    if (
      e.selectionLead.row > 1 &&
      e.selectionLead.row !== e.doc.$lines.length - 1
    ) {
      if (this.state.readOnly) this.setState({readOnly: false})
    } else if (!this.state.readOnly) this.setState({readOnly: true})
  }
  render() {
    return (
      <Fragment>
        {/* wrapper for nav - home link */}
        <div id="sandbox-global-nav">
          <Tooltip title="Home">
            <Fab
              type="Fab"
              style={{
                backgroundColor: '#bbdefb',
                color: 'black',
                fontWeight: 550
              }}
              onClick={this.handleHome}
            >
              <HomeIcon />
            </Fab>
          </Tooltip>
        </div>

        {/* wrapper for page outside of nav */}
        <div id="sandbox-wrapper">
          <div className="description">
            <h3>Problem</h3>
            <p>{this.props.currentProblem.description}</p>
          </div>

          {/* flex wrap for left and right editor sides*/}
          <div className="editor">
            {/* ace editor and nav buttons in here */}
            <div className="editorLeftHalf">
              <div className="editorBox">
                <AceEditor
                  mode="javascript"
                  theme={this.state.theme}
                  value={this.state.editor}
                  onPaste={this.handlePaste}
                  onChange={this.handleChange}
                  name="ace"
                  className="editorBox"
                  height="99%"
                  width="99%"
                  editorProps={{$blockScrolling: Infinity}}
                  fontSize={14}
                  onSelectionChange={this.handleSelectionChange}
                  onCursorChange={this.handleCursorChange}
                  showPrintMargin={false}
                  wrapEnabled={true}
                  readOnly={this.state.readOnly}
                />
              </div>
              <div className="editorTools">
                <div>
                  <Tooltip title="Change Theme">
                    <Fab
                      type="Fab"
                      style={{
                        backgroundColor: '#bbdefb',
                        color: 'black',
                        fontWeight: 550
                      }}
                      onClick={() => {
                        this.setState(prev => ({showThemes: !prev.showThemes}))
                      }}
                    >
                      <ThemeIcon />
                    </Fab>
                  </Tooltip>
                  <Tooltip title="Skip Problem">
                    <Fab
                      type="Fab"
                      style={{
                        backgroundColor: '#bbdefb',
                        color: 'black',
                        fontWeight: 550,
                        fontSize: '.75em'
                      }}
                      onClick={this.handleSkip}
                    >
                      Skip
                    </Fab>
                  </Tooltip>
                  <Tooltip title="Reset">
                    <Fab
                      type="Fab"
                      style={{
                        backgroundColor: '#bbdefb',
                        color: 'black',
                        fontWeight: 550,
                        fontSize: '.75em'
                      }}
                      onClick={this.handleClear}
                    >
                      Clear
                    </Fab>
                  </Tooltip>
                </div>
                <div>
                  <Tooltip title="Submit">
                    <Fab
                      type="Fab"
                      style={{
                        backgroundColor: '#ffff99',
                        color: 'black',
                        fontWeight: 550,
                        fontSize: '.75em'
                      }}
                      onClick={this.handleClick}
                    >
                      Submit
                    </Fab>
                  </Tooltip>
                </div>
              </div>
              {/* <div>
                <button id="demo-btn" type="button" onClick={this.handleCheat}>
                  cheat/demo
                </button>
              </div> */}
            </div>

            {/* results and progress within stage in here */}
            <div className="editorRightHalf">
              <div className="description" id="test-results">
                <h3>Test Results</h3>
                {this.state.result
                  .split('\n')
                  .map(thing => <p key={Math.random()}>{thing}</p>)}
              </div>
              <div>
                <GameStage solvedProblems={this.solvedProblems} />
              </div>
            </div>
          </div>
        </div>

        {/* Pop up for ace theme selector */}
        <Dialog open={this.state.showThemes}>
          <DialogTitle>Select a theme</DialogTitle>
          <DialogContent>
            <Select value={this.state.theme} onChange={this.handleThemeChange}>
              {editorThemes.map(theme => {
                return (
                  <MenuItem key={Math.random()} value={theme}>
                    {theme}
                  </MenuItem>
                )
              })}
            </Select>{' '}
            <Tooltip title="Close">
              <Fab
                size="small"
                onClick={() => {
                  this.setState(prev => ({showThemes: !prev.showThemes}))
                }}
              >
                <XIcon />
              </Fab>
            </Tooltip>
          </DialogContent>
        </Dialog>

        {/* problem success popup */}
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          // onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">Great Job!!</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              {/* <Link to="/home">Home</Link>  */}
              Home
            </Button>
            <Button onClick={this.handleSuccess} color="primary">
              Next Problem
              {/* <Link to={`/sandbox/${this.props.currentProblem.id + 1}`}>
                </Link> */}
            </Button>
          </DialogActions>
        </Dialog>

        {/* stage complete popup */}
        <Dialog
          open={this.state.stageComplete}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            Awesome Job! Stage {this.props.stage.id} Complete!!
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              {/* <Link to="/home">Home</Link> */}
              Home
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
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
  fetchProblem: (userId, problemId) =>
    dispatch(fetchProblem(userId, problemId)),
  addSolvedProblem: (userId, problemId) =>
    dispatch(addSolvedProblem(userId, problemId)),
  fetchSolvedProblems: userId => dispatch(fetchSolvedProblems(userId)),
  nextStage: userId => dispatch(nextStage(userId))
})

export default connect(mapState, mapDispatch)(Sandbox)
