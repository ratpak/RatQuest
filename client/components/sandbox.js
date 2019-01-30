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
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import DoneIcon from '@material-ui/icons/Done'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import ClearIcon from '@material-ui/icons/Clear'
import HomeIcon from '@material-ui/icons/HomeSharp'
import ThemeIcon from '@material-ui/icons/ColorLensSharp'
import Dialog from '@material-ui/core/Dialog'
import {DialogContent, DialogTitle} from '@material-ui/core'

editorThemes.forEach(theme => require(`brace/theme/${theme}`))

class Sandbox extends React.Component {
  constructor() {
    super()
    this.state = {
      result: '',
      editor: '',
      theme: 'dracula',
      readOnly: true,
      showThemes: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleThemeChange = this.handleThemeChange.bind(this)
    this.handleSelectionChange = this.handleSelectionChange.bind(this)
    this.handleCursorChange = this.handleCursorChange.bind(this)
    this.handleHome = this.handleHome.bind(this)
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
    // console.log('moved')
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
              // onMouseOver={() => console.log('hovered doneicon')}
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
          <Dialog
            // disableBackdropClick
            // disableEscapeKeyDown
            open={this.state.showThemes}
            // onClose={this.handleClose}
          >
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

          {/* {this.state.showThemes && (
            <Select value={this.state.theme} onChange={this.handleThemeChange}>
              {editorThemes.map(theme => {
                return (
                  <MenuItem key={Math.random()} value={theme}>
                    {theme}
                  </MenuItem>
                )
              })}
            </Select>
          )} */}
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
          // editorProps={{$blockScrolling: Infinity}}
          cursorStart={12}
          fontSize={14}
          focus={true}
          onSelectionChange={this.handleSelectionChange}
          onCursorChange={this.handleCursorChange}
          wrapEnabled={true}
          readOnly={this.state.readOnly}
          editorProps={{$blockScrolling: true}}
        />

        {this.state.result
          .split('\n')
          .map(thing => <h1 key={Math.random()}>{thing}</h1>)}
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
