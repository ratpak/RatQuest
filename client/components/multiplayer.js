import React, {Fragment, Component} from 'react'
import socket from '../socket'
import Axios from 'axios'
import {connect} from 'react-redux'
import loadFunction from '../utils/loadFunction'
import createAndTest from '../utils/createAndTest'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import DoneIcon from '@material-ui/icons/Done'
import Fab from '@material-ui/core/Fab'
import Tooltip from '@material-ui/core/Tooltip'
import ClearIcon from '@material-ui/icons/RefreshSharp'
import HomeIcon from '@material-ui/icons/HomeSharp'
import ThemeIcon from '@material-ui/icons/ColorLensSharp'
import SkipIcon from '@material-ui/icons/FastForwardSharp'
import {Button} from '@material-ui/core'
import io from 'socket.io-client'
import SandboxRat from './sandbox-rat'
import gameStage from './game-stage'
import MultiStage from './multiplayerStage'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  button: {
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    '&:hover': {
      background: 'linear-gradient(180deg, #ffee33 30%, #FF8E53 90%)',
      color: '#fff'
    },
    boxShadow: theme.shadows[3]
  }
})

class Multiplayer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      victor: null,
      lobby: {},
      preGame: true,
      problems: [],
      sandbox: {
        result: '',
        editor: '',
        open: false,
        stageComplete: false,
        theme: 'dracula',
        readOnly: true,
        showThemes: false
      }
    }
    let {lobbyId} = props.match.params
    socket.on('A user has disconnected', socketId => {
      let lobby = this.state.lobby
      for (let key in lobby) {
        if (lobby[key].socketId === socketId) delete lobby[key]
      }
      console.log('old lobby')
      this.setState({lobby})
    })
    socket.on('requesting lobby info', () => {
      socket.emit('I have joined the lobby', props.user, lobbyId)
    })
    // This socket receives other users' score increment
    socket.on(`received increment ${lobbyId}`, user => {
      this.setState({
        ...this.state,
        lobby: {...this.state.lobby, [user.email]: user}
      })
    })
    // This socket receives other users' data when they join the lobby
    socket.on(
      `Another user has joined the lobby ${lobbyId}`,
      (data, socketId) => {
        if (props.user.score === undefined) props.user.score = 0
        data.socketId = socketId

        // This socket, upon receiving the message that another user has joined, sends its own user's information over to the new user to populate their game state with my info
        socket.emit(`Send my data to new user`, props.user, data.email, lobbyId)
        this.setState({
          lobby: {...this.state.lobby, [data.email]: data}
        })
      }
    )
    // This socket receives other users' information upon joining the lobby
    socket.on(
      `Received another user's Data: ${props.user.email} ${lobbyId}`,
      (data, socketId) => {
        data.socketId = socketId

        this.setState({
          lobby: {...this.state.lobby, [data.email]: data}
        })
      }
    )

    socket.on(`A user has won ${lobbyId}`, userEmail => {
      props.user.score = 0
      socket.emit('Unplug me')
      this.setState({lobby: {}, victor: userEmail})
    })
  }
  handleIncrement = () => {
    let {lobbyId} = this.props.match.params
    let me = this.props.user
    let problems = this.state.problems
    this.props.user.score += 1
    if (this.props.user.score >= 5) {
      this.props.user.score = 0
      socket.emit(`I win`, me.email, lobbyId)
      this.setState({lobby: {}, victor: me.email})
    } else {
      // This socket sends your score increment to other users
      socket.emit(`increment`, me, lobbyId)
      this.setState({
        ...this.state,
        lobby: {...this.state.lobby, [me.email]: me},
        sandbox: {
          ...this.state.sandbox,
          editor: loadFunction(
            problems[me.score].funcName,
            problems[me.score].arguments
          )
        }
      })
    }
  }
  handleBack = () => {
    socket.emit('Unplug me')
    this.props.history.push('/multiplayer')
  }
  handleClick = async () => {
    let score = this.props.user.score
    // Grab user input from the code editor stored in state.
    let body = this.state.sandbox.editor
    let currentProblem = this.state.problems[score]
    let result = await createAndTest(
      currentProblem.arguments,
      body,
      currentProblem.inputs,
      currentProblem.outputs
    )
    if (result === 'success') {
      this.handleIncrement()
    }
  }
  handleChange = e => {
    this.setState({sandbox: {...this.state.sandbox, editor: e}})
  }
  componentDidMount = async () => {
    socket.open()
    let {lobbyId} = this.props.match.params
    let {data: problems} = await Axios.get('/api/problems')
    const {user} = this.props
    user.score = 0
    user.socketId = socket.id
    socket.emit(`I have joined the lobby`, user, lobbyId)
    this.setState({
      ...this.state,
      loading: false,
      sandbox: {
        ...this.state.sandbox,
        editor: loadFunction(
          problems[user.score].funcName,
          problems[user.score].arguments
        )
      },
      problems,
      lobby: {...this.state.lobby, [user.email]: user}
    })
  }

  render() {
    console.log(this.state, 'this state')
    const {classes} = this.props
    return !this.state.victor ? (
      <Fragment>
        {/* <button onClick={this.handleBack}>back</button>
        <br />
        <button onClick={this.handleIncrement}>cheat</button> */}
        {/* <h1>I am {this.props.user.email}</h1> */}

        <div className="multiwrap mj-left-pad">
          <div className="description">
            <h3>Problem</h3>
            {console.log(
              'MWAHAHAHAHAH',
              this.state.problems,
              this.props.user.score
            )}
            {this.state.problems.length ? (
              // <h1>loaded</h1>
              <p>{this.state.problems[this.props.user.score].description}</p>
            ) : (
              <h1>loading</h1>
            )}
          </div>
          <br />
          <div className="meditor">
            <div className="meditorLeftHalf">
              <AceEditor
                mode="javascript"
                theme={this.state.sandbox.theme}
                value={this.state.sandbox.editor}
                // onPaste={this.handlePaste}
                onChange={this.handleChange}
                name="ace"
                // className="editorBox"
                height="70vh"
                width="50vw"
                editorProps={{$blockScrolling: Infinity}}
                fontSize={14}
                // onSelectionChange={this.handleSelectionChange}
                // onCursorChange={this.handleCursorChange}
                showPrintMargin={false}
                wrapEnabled={true}
                // readOnly={this.state.sandbox.readOnly}
              />
            </div>
            <div className="meditorRightHalf">
              {/* <h1>Lobby: </h1> */}

              {Object.keys(this.state.lobby)
                ? Object.keys(this.state.lobby).map(key => {
                    console.log('this.state score', this.state.lobby[key].score)
                    return (
                      <Fragment key={key}>
                        <div className="ratsRight">
                          <h2 key={key}>{this.state.lobby[key].email}</h2>
                          <MultiStage
                            displayInfo={{
                              progress: this.state.lobby[key].score,
                              goal: 5
                            }}
                          />
                        </div>
                      </Fragment>
                    )
                  })
                : null}
            </div>
          </div>
          <Tooltip title="Submit">
            <Button
              type="Button"
              className={classes.button}
              // style={{
              //   backgroundColor: 'blue',
              //   color: 'black',
              //   fontWeight: 550
              // }}
              onClick={this.handleClick}
            >
              Submit
              <DoneIcon />
            </Button>
          </Tooltip>
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <h1>{this.state.victor} has won!</h1>

        <button onClick={() => this.props.history.push('/home')}>Home</button>
      </Fragment>
    )
  }
}
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(withStyles(styles)(Multiplayer))
