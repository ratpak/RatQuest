import React, {Fragment, Component} from 'react'
import socket from '../socket'
import Axios from 'axios'

socket.on('connect', async function() {
  console.log('HAHA')
  // console.log('socket yazidi', socket.yazidi)
  // const {data} = await Axios.get(`/api/users/1`)
  // console.log('data from socket on', data)
})
console.log('hello from mul')

class Multiplayer extends Component {
  constructor() {
    super()
    this.state = {me: 0, opponent: 0}
    this.handleClick = this.handleClick.bind(this)
    socket.on('send all', string => {
      console.log('how many')
      this.setState({opponent: this.state.opponent + 1})
    })
    socket.on('notice', message => {
      console.log('notice received', message)
    })
    socket.on('login', user => console.log('got user>>>', user))
  }
  handleClick() {
    socket.emit('SEND', 'string')
    this.setState({me: this.state.me + 1})
  }

  render() {
    if (this.state.me >= 10 || this.state.opponent >= 10)
      return <h1>DONE!@#</h1>
    return (
      <Fragment>
        <button onClick={this.handleClick}>socket</button>
        <h1>Opponent:{this.state.opponent}</h1>
        <h1>Me: {this.state.me}</h1>
      </Fragment>
    )
  }
}
export default Multiplayer
