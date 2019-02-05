import React, {Fragment, Component} from 'react'
import socket from '../socket'
import {SSL_OP_SSLEAY_080_CLIENT_DH_BUG} from 'constants'

class MultiplayerHome extends Component {
  constructor() {
    super()
    this.state = {
      Mocha: [],
      Chai: [],
      Express: [],
      Sequelize: [],
      React: [],
      Redux: []
    }

    socket.on('Lobby spot taken', (lobbyId, data) => {
      console.log('lobby spot taken', lobbyId, data)
      let something = true
      for (let i = 0; i < this.state[lobbyId].length; i++) {
        if (this.state[lobbyId][i].email === data.email) something = false
      }

      if (something)
        this.setState({
          ...this.state,
          [lobbyId]: [...this.state[lobbyId], data]
        })
    })

    socket.on('clear lobby', socketId => {
      let lobbies = this.state
      console.log('got to clear lobby', socketId)
      // eslint-disable-next-line guard-for-in
      for (let key in lobbies) {
        lobbies[key] = lobbies[key].filter(data => data.socketId !== socketId)
      }
      this.setState(lobbies)
    })
  }

  componentDidMount() {
    socket.emit('entered lobby screen')
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
              {lobby.map(data => <h1>{data.email}</h1>)}
            </Fragment>
          )
        })}
      </Fragment>
    )
  }
}
export default MultiplayerHome
