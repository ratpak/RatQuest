import React, {Fragment, Component} from 'react'
import socket from '../socket'

class MultiplayerHome extends Component {
  constructor() {
    super()
    this.state = {Mocha: [], Chai: [], Express: []}

    socket.on('Lobby spot taken', (lobbyId, data) => {
      console.log('lobby spot taken', lobbyId, data)
      this.setState({
        ...this.state,
        [lobbyId]: [...this.state[lobbyId], data.email]
      })
    })
  }

  handleClick = e => {
    console.log(e.target.value)
    let lobbyId = e.target.value
    this.props.history.push(`/multiplayer/${lobbyId}`)
  }
  render() {
    console.log(this.state, 'from multiplayer home')
    return (
      <Fragment>
        <h1>List of Lobbies</h1>
        {Object.keys(this.state).map(key => {
          let lobby = this.state[key]
          return (
            <Fragment>
              <button
                value={key}
                onClick={this.handleClick}
                disabled={lobby.length >= 4}
              >
                {key}
              </button>
            </Fragment>
          )
        })}
      </Fragment>
    )
  }
}
export default MultiplayerHome
