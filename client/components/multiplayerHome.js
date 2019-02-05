import React, {Fragment, Component} from 'react'
import socket from '../socket'

let dummyData = [
  {
    id: 2,
    email: 'jerry@jerry.com',
    isAdmin: false,
    avatarUrl: 'https://robohash.org/2'
  },
  {
    id: 3,
    email: 'admin@admin.com',
    isAdmin: true,
    avatarUrl: 'https://robohash.org/9'
  },
  {
    id: 1,
    email: 'user@user.com',
    isAdmin: false,
    avatarUrl: 'https://robohash.org/3'
  },
  {
    id: 4,
    email: 'test',
    isAdmin: false,
    avatarUrl: 'https://robohash.org/5'
  }
]
let dummyLobby =
  'https://www.thelobby.lv/wp-content/uploads/2017/07/lobby_logo_large.png'
class MultiplayerHome extends Component {
  constructor() {
    super()
    this.state = {
      Show: {
        Mocha: false,
        Chai: false,
        Express: false,
        Sequelize: false,
        React: false,
        Redux: false
      },
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
      let lobbies = this.state
      delete lobbies.Show
      for (let i = 0; i < lobbies; i++) {
        if (lobbies[lobbyId][i].email === data.email) something = false
      }

      if (something)
        this.setState({
          ...this.state,
          [lobbyId]: [...this.state[lobbyId], data]
        })
    })

    socket.on('clear lobby', socketId => {
      let lobbies = this.state
      delete lobbies.Show
      console.log('got to clear lobby', socketId)
      // eslint-disable-next-line guard-for-in
      for (let key in lobbies) {
        lobbies[key] = lobbies[key].filter(data => data.socketId !== socketId)
      }
      this.setState(lobbies)
    })
  }

  componentDidMount = () => {
    socket.emit('entered lobby screen')
  }

  handleHome = () => {
    this.props.history.push('home')
  }
  handleShow = e => {
    let lobby = e.target.id

    this.setState({
      ...this.state,
      Show: {...this.state.Show, [lobby]: !this.state.Show[lobby]}
    })
  }
  handleClick = e => {
    console.log(e.target.id)
    let lobbyId = e.target.id
    this.props.history.push(`/multiplayer/${lobbyId}`)
  }
  render() {
    console.log('TCL: MultiplayerHome -> render -> this.state', this.state)
    return (
      <Fragment>
        <button type="button" onClick={this.handleHome}>
          home
        </button>
        <div className="lobbyHome">
          <h1>List of Lobbies</h1>
          {Object.keys(this.state)
            .filter(key => key !== 'Show')
            .map(key => {
              let lobby = this.state[key]
              return (
                <Fragment key={key}>
                  <div className="lobby" key={key}>
                    {key}
                    <img
                      id={key}
                      // src={dummyLobby}
                      src="https://robohash.org/1"
                      // onClick={this.handleClick}
                      onClick={this.handleShow}
                      disabled={lobby.length >= 4}
                    />
                    {this.state.Show[key]
                      ? lobby.map(data => (
                          <Fragment key={data.email}>
                            <div className="lobbyItem">
                              <img src={data.avatarUrl} />
                              <p>{data.email}</p>
                            </div>
                          </Fragment>
                        ))
                      : null}
                  </div>
                </Fragment>
              )
            })}
        </div>
      </Fragment>
    )
  }
}
export default MultiplayerHome
