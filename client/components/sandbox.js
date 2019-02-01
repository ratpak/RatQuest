/* eslint-disable no-new-func */
/* eslint-disable id-length */
import React from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import loadFunction from '../utils/loadFunction'
import {
  fetchProblem,
  addSolvedProblem,
  fetchSolvedProblems
} from '../store/problem'
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
import DoneIcon from '@material-ui/icons/Done'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import ClearIcon from '@material-ui/icons/RefreshSharp'
import HomeIcon from '@material-ui/icons/HomeSharp'
import ThemeIcon from '@material-ui/icons/ColorLensSharp'
import SkipIcon from '@material-ui/icons/FastForwardSharp'
import Paper from '@material-ui/core/Paper'
import XIcon from '@material-ui/icons/CloseSharp'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import {Link} from 'react-router-dom'

editorThemes.forEach(theme => require(`brace/theme/${theme}`))

function Transition(props) {
  return <Slide direction="up" {...props} />
}

const styles = theme => ({
  // root: {
  //   flexGrow: 1
  // },
  // paper: {
  //   // padding: 0,
  //   textAlign: 'center',
  //   backgroundColor: 'skyblue'
  //   // color: theme.palette.text.secondary,
  // },
  // ace: {
  //   textAlign: 'left',
  //   height: '50vw',
  //   width: '50vw'
  //   // border: '5px'
  // }
  // // control: {
  // //   // padding: theme.spacing.unit * 2
  // //   padding: '10px'
  // // }
})

class Sandbox extends React.Component {
  constructor() {
    super()
    this.state = {
      result: 'lorem ipsum dolor \n lorem ipsum dolor \n lorem ipsum dolor',
      editor: '',
      open: false,
      stageComplete: false,
      theme: 'dracula',
      readOnly: true,
      showThemes: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleThemeChange = this.handleThemeChange.bind(this)
    this.handleSelectionChange = this.handleSelectionChange.bind(this)
    this.handleCursorChange = this.handleCursorChange.bind(this)
    this.handleHome = this.handleHome.bind(this)
    this.handleSuccess = this.handleSuccess.bind(this)
    this.handleSkip = this.handleSkip.bind(this)
  }

  async componentDidMount() {
    await this.props.fetchProblem(this.props.user.id)
    this.setState({
      editor: loadFunction(
        this.props.currentProblem.funcName,
        this.props.currentProblem.arguments
      )
    })
  }
  async handleSkip() {
    await this.props.fetchProblem(
      this.props.user.id,
      this.props.currentProblem.id
    )
    this.setState({
      editor: loadFunction(
        this.props.currentProblem.funcName,
        this.props.currentProblem.arguments
      )
    })
  }
  handleHome() {
    this.props.history.push('/home')
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

  handleClose() {
    this.setState({open: false, result: ''})
  }
  async handleSuccess() {
    await this.props.fetchProblem(this.props.user.id)
    await this.props.fetchSolvedProblems(this.props.user.id)
    this.setState({
      open: false,
      editor: loadFunction(
        this.props.currentProblem.funcName,
        this.props.currentProblem.arguments
      ),
      result: 'mwahaha'
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

  handleSelectionChange(e) {
    if (
      e.selectionLead.row <= 1 ||
      e.selectionAnchor.row <= 1 ||
      e.selectionAnchor.row === e.doc.$lines.length - 1 ||
      e.selectionLead.row === e.doc.$lines.length - 1
    ) {
      if (!this.state.readOnly) this.setState({readOnly: true})
    } else if (this.state.readOnly) this.setState({readOnly: false})
  }
  handleCursorChange(e) {
    if (
      e.selectionLead.row > 1 &&
      e.selectionLead.row !== e.doc.$lines.length - 1
    ) {
      if (this.state.readOnly) this.setState({readOnly: false})
    } else if (!this.state.readOnly) this.setState({readOnly: true})
  }

  render() {
    let {classes} = this.props
    return (
      <div className="editorContainerLol">
        <div className="biggerWrapper">
          <div className="editorStage">
            <GameStage />
          </div>
          <div className="editor">
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
                  width="100%"
                  editorProps={{$blockScrolling: false}}
                  fontSize={14}
                  onSelectionChange={this.handleSelectionChange}
                  onCursorChange={this.handleCursorChange}
                  showPrintMargin={false}
                  wrapEnabled={true}
                  readOnly={this.state.readOnly}
                />
              </div>
              <div className="editorTools">
                <Tooltip title="Reset">
                  <Fab
                    type="Fab"
                    style={{
                      backgroundColor: '#bbdefb',
                      color: 'black',
                      fontWeight: 550
                    }}
                    onClick={this.handleClear}
                  >
                    <ClearIcon />
                  </Fab>
                </Tooltip>
                <Tooltip title="Submit">
                  <Fab
                    type="Fab"
                    style={{
                      backgroundColor: '#bbdefb',
                      color: 'black',
                      fontWeight: 550
                    }}
                    onClick={this.handleClick}
                  >
                    <DoneIcon />
                  </Fab>
                </Tooltip>
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
                <Tooltip title="Change Theme">
                  <Fab
                    type="Fab"
                    style={{
                      backgroundColor: '#bbdefb',
                      color: 'black',
                      fontWeight: 550
                    }}
                    onClick={() => {
                      this.setState({showThemes: !this.state.showThemes})
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
                      fontWeight: 550
                    }}
                    onClick={this.handleSkip}
                  >
                    <SkipIcon />
                  </Fab>
                </Tooltip>
              </div>
            </div>
            <div className="editorRightHalf">
              <Paper className="editorDescription">
                <h3>Problem description</h3>
                <p>
                  {this.props.currentProblem.description} lorem ipsum dolor
                  lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem
                  ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum
                  dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor
                  lorem ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem
                  ipsum dolor lorem ipsum dolor lorem ipsum dolor lorem ipsum
                  dolor
                </p>
              </Paper>

              <Dialog open={this.state.showThemes}>
                <DialogTitle>Select a theme</DialogTitle>
                <DialogContent>
                  <Select
                    value={this.state.theme}
                    onChange={this.handleThemeChange}
                  >
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
                        this.setState({showThemes: !this.state.showThemes})
                      }}
                    >
                      <XIcon />
                    </Fab>
                  </Tooltip>
                </DialogContent>
              </Dialog>
              <Dialog
                open={this.state.open}
                TransitionComponent={Transition}
                keepMounted
                // onClose={this.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle id="alert-dialog-slide-title">
                  Great Job!!
                </DialogTitle>
                <DialogActions>
                  {/* <Button onClick={this.handleClose} color="primary"> */}
                  <Link to="/home">Home</Link>
                  {/* </Button> */}
                  <Button onClick={this.handleSuccess} color="primary">
                    Next Problem
                    {/* <Link to={`/sandbox/${this.props.currentProblem.id + 1}`}>
                    </Link> */}
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

              <Paper className="editorResult">
                <h3>Test Results</h3>
                {this.state.result
                  .split('\n')
                  .map(thing => <p key={Math.random()}>{thing}</p>)}
              </Paper>
            </div>
          </div>
        </div>
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
  fetchProblem: (userId, problemId) =>
    dispatch(fetchProblem(userId, problemId)),
  addSolvedProblem: (userId, problemId) =>
    dispatch(addSolvedProblem(userId, problemId)),
  fetchSolvedProblems: userId => dispatch(fetchSolvedProblems(userId))
})
export default connect(mapState, mapDispatch)(withStyles(styles)(Sandbox))
