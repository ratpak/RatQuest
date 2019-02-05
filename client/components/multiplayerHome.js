import React, {Fragment, Component} from 'react'
import socket from '../socket'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import JoinIcon from '@material-ui/icons/ForwardSharp'
import {Button, Fab} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/HomeSharp'

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
  }
  // {
  //   id: 4,
  //   email: 'test',
  //   isAdmin: false,
  //   avatarUrl: 'https://robohash.org/5'
  // }
]
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

  componentDidMount = () => {
    socket.emit('entered lobby screen')
  }

  handleHome = () => {
    this.props.history.push('/home')
  }
  handleClick = e => {
    console.log(e)
    let lobbyId = e
    this.props.history.push(`/multiplayer/${lobbyId}`)
  }
  render() {
    console.log('TCL: MultiplayerHome -> render -> this.state', this.state)
    return (
      <Fragment>
        <Fab onClick={this.handleHome}>
          <HomeIcon />
        </Fab>

        <h1>List of Lobbies</h1>
        <div className="lobbyHome">
          {Object.keys(this.state).map(key => {
            let lobby = this.state[key]
            return (
              <div className="lobby" key={key}>
                <List key={key}>
                  <Fragment key={key}>
                    <ListItem>
                      {/* <h1>{key}</h1> */}
                      <Button onClick={() => this.handleClick(key)}>
                        <b>{key}</b>
                        <JoinIcon />
                        {/* <ListItem
                    button
                    type="button"
                    id={key}
                    // src={dummyLobby}
                    src="https://robohash.org/1"
                    // onClick={this.handleClick}
                    onClick={this.handleShow}
                    disabled={lobby.length >= 4}
                  >
                    <h1>join</h1>
                  </ListItem> */}
                      </Button>
                    </ListItem>
                    {/* <ListItem
                      button
                      type="button"
                      id={key}
                      // src={dummyLobby}
                      src="https://robohash.org/1"
                      // onClick={this.handleClick}
                      onClick={this.handleShow}
                      disabled={lobby.length >= 4}
                    >
                      <b>join</b>
                    </ListItem> */}

                    {lobby.length === 0 ? (
                      <ListItem>
                        <i>empty</i>
                      </ListItem>
                    ) : (
                      lobby.map(data => (
                        <Fragment key={data.email}>
                          {/* <img src={data.avatarUrl} /> */}
                          <ListItem>
                            <div>{data.email}</div>
                          </ListItem>
                        </Fragment>
                      ))
                    )}
                  </Fragment>
                </List>
              </div>
            )
          })}
        </div>
      </Fragment>
    )
  }
}
export default MultiplayerHome
