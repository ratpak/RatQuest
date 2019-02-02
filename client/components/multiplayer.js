import React, {Fragment, Component} from 'react'
import socket from '../socket'
import Axios from 'axios'
import {connect} from 'react-redux'

socket.on('connect', async function() {
  console.log('HAHA')
  // console.log('socket yazidi', socket.yazidi)
})

class Multiplayer extends Component {
  constructor() {
    super()
    this.state = {me: 0, opponent: 0, loading: true, opponentData: {}}
    this.handleClick = this.handleClick.bind(this)
    socket.on('send all', string => {
      console.log('how many')
      this.setState({opponent: this.state.opponent + 1})
    })
    socket.on('joined', data => {
      console.log('got joined', data)
      this.setState({opponentData: data})
    })
  }
  handleClick() {
    this.setState({me: this.state.me + 1})
  }
  async componentDidMount() {
    const {data} = await Axios.get(`/api/users/${this.props.user.id}`)
    socket.user = data
    console.log('socket')
    socket.emit('joined', data)
    this.setState({loading: false})
    // console.log('data from socket', socket.user)
  }

  render() {
    if (this.state.me >= 10 || this.state.opponent >= 10)
      return <h1>DONE!@#</h1>
    return (
      <Fragment>
        <button onClick={this.handleClick}>socket</button>
        <h1>
          opponent
          {this.state.loading ? 'Opponent' : this.state.opponentData.email}:{
            this.state.opponent
          }
        </h1>
        <h1>
          {this.state.loading ? 'Me' : socket.user.email}:{this.state.me}
        </h1>
      </Fragment>
    )
  }
}
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(Multiplayer)
