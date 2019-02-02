import React, {Fragment, Component} from 'react'
import socket from '../socket'
import Axios from 'axios'
import {connect} from 'react-redux'
import {fetchActiveGames} from '../store/game'

class MultiplayerHome extends Component {
  constructor() {
    super()
    this.handleJoin = this.handleJoin.bind(this)
  }
  async componentDidMount() {
    console.log('?')
    await this.props.fetchActiveGames()
  }

  handleJoin(e) {
    console.log('TCL: handleJoin -> e', e.target.value)
    this.props.history.push(`/game/${e.target.value}`)
  }
  render() {
    console.log('lsajkfd', this.props)
    return (
      <Fragment>
        <h1>List of Game Lobbies</h1>
        {this.props.activeGames.length &&
          this.props.activeGames.map(game => {
            return (
              <Fragment key={game.id}>
                <h2>
                  {game.lobbyName}: {game.users.length}/2
                </h2>

                <button
                  disabled={game.users.length === 2}
                  value={game.lobbyName}
                  onClick={this.handleJoin}
                >
                  join game
                </button>
              </Fragment>
            )
          })}
      </Fragment>
    )
  }
}

const mapState = state => ({
  activeGames: state.game.activeGames
})
const mapDispatch = dispatch => ({
  fetchActiveGames: () => dispatch(fetchActiveGames())
})
export default connect(mapState, mapDispatch)(MultiplayerHome)
