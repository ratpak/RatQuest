import React, {Fragment, Component} from 'react'
import socket from '../socket'
import Axios from 'axios'
import {connect} from 'react-redux'
import {
  fetchActiveGames,
  getCurrentGame,
  joinLobby,
  fetchCurrentGame
} from '../store/game'

let refreshed = false
socket.on('connect', function() {
  // ON CONNECT SHOULD TAKE CARE OF REFRESHES
  // HERE WE SHOULD DISPATCH A THUNK WHICH LOADS THE GAMESTATE FROM THE DATABASE, ONLY IF THE USER IS IN THE DATABASE FOR THIS GAME
  console.log('REFRESHED PAGE')
  refreshed = true
  // console.log('socket yazidi', socket.yazidi)
})
class Multiplayer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleClick = this.handleClick.bind(this)

    let {lobbyName} = props.match.params

    socket.on('send all', (string, string2) => {
      console.log('message received:', string, string2)
      // this.setState({opponent: this.state.opponent + 1})
    })

    socket.on(`incremented${lobbyName}`, user =>
      console.log(`incremented${lobbyName}`, user)
    )

    socket.on('joined', user => {
      console.log('got joined', user)
      // socket.emit('sendback', this.props.user)
      // this.setState({
      //   lobby: {...this.state.lobby, [data.email]: data}
      // })
    })
    // socket.on('sendback', data =>
    //   this.setState({
    //     lobby: {...this.state.lobby, [data.email]: data}
    //   })
    // )
  }
  handleClick() {
    let me = this.props.user

    //add a DONE emit
    let {lobbyName} = this.props.match.params
    socket.emit('increment', lobbyName, me)

    // this.setState({lobby: {[me]: this.state.lobby[me] + 1}})
  }
  async componentDidMount() {
    if (refreshed) {
      refreshed = false
      console.log('need to fetch')
      await this.props.fetchCurrentGame(this.props.match.params.lobbyName)
      socket.emit('joined', this.props.user)
    }

    // socket.emit('joined', data)
    // this.setState({
    //   loading: false,
    //   lobby: {...this.state.lobby, [data.email]: data}
    // })
    // console.log('data from socket', socket.user)
  }
  // if (this.state.me >= 10 || this.state.opponent >= 10)
  //   return <h1>DONE!@#</h1>
  render() {
    console.log('TCL: Multiplayer -> render -> this.props', this.props)
    return (
      <Fragment>
        <h1>Your Username: {this.props.user.email}</h1>
        <h1>Game:</h1>
        {/* {Object.keys(this.props.currentGame) && Object.keys(this.props.currentGame).map(key=>{
          return (
            {this.props.currentGame.users}
          )
        })} */}
        <button onClick={this.handleClick}>+</button>
      </Fragment>
    )
  }
}
const mapState = state => ({
  user: state.user,
  currentGame: state.game.currentGame
})
const mapDispatch = dispatch => ({
  fetchCurrentGame: lobbyName => dispatch(fetchCurrentGame(lobbyName)),
  joinLobby: user => dispatch(joinLobby(user))
})

export default connect(mapState, mapDispatch)(Multiplayer)
