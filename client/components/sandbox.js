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
import ClearIcon from '@material-ui/icons/Clear'
import HomeIcon from '@material-ui/icons/HomeSharp'
import ThemeIcon from '@material-ui/icons/ColorLensSharp'
import SkipIcon from '@material-ui/icons/FastForwardSharp'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'

editorThemes.forEach(theme => require(`brace/theme/${theme}`))

// function Transition(props) {
//   return <Slide direction="up" {...props} />
// }

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    // padding: theme.spacing.unit * 2
    padding: '10px'
  }
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
    this.handleClear = this.handleClear.bind(this)
    // this.handleClose = this.handleClose.bind(this)
    this.handleThemeChange = this.handleThemeChange.bind(this)
    this.handleSelectionChange = this.handleSelectionChange.bind(this)
    this.handleCursorChange = this.handleCursorChange.bind(this)
    this.handleHome = this.handleHome.bind(this)
  }

  async componentDidMount() {
    await this.props.fetchProblem(this.props.match.params.problemId)
    // await this.props.fetchProblem(this.props.user.id)
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
    console.log(this.props, 'props')
    return (
      <Grid container className={styles.root} spacing={16}>
        <div>
          <div>
            <Grid item xs={12} name="top right">
              <GameStage />
            </Grid>
          </div>
          <h2>
            Problem #{this.props.match.params.problemId}
            {this.test}
          </h2>

          <Grid item xs={12} name="top left">
            <h3>{this.props.currentProblem.description}</h3>
          </Grid>

          <Grid item xs={12} name="bottom left">
            <div>
              <Tooltip title="Clear">
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
                  onClick={() => {
                    console.log('add skip thunk here')
                  }}
                >
                  <SkipIcon />
                </Fab>
              </Tooltip>

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
                      <ClearIcon />
                    </Fab>
                  </Tooltip>
                </DialogContent>
              </Dialog>
              <br />
            </div>
            <br />

            <AceEditor
              mode="javascript"
              theme={this.state.theme}
              value={this.state.editor}
              onPaste={this.handlePaste}
              onChange={this.handleChange}
              // name="myEditor"
              // height="400px"
              // width="500px"
              cursorStart={12}
              fontSize={14}
              focus={true}
              onSelectionChange={this.handleSelectionChange}
              onCursorChange={this.handleCursorChange}
              wrapEnabled={true}
              readOnly={this.state.readOnly}
              editorProps={{$blockScrolling: true}}
            />
          </Grid>

          <Grid item xs={12} name="bottom right">
            {this.state.result
              .split('\n')
              .map(thing => <h1 key={Math.random()}>{thing}</h1>)}
          </Grid>
        </div>
      </Grid>
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
export default connect(mapState, mapDispatch)(withStyles(styles)(Sandbox))
