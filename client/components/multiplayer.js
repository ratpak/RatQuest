import React, {Fragment, Component} from 'react'
import socket from '../socket'
import Axios from 'axios'
import {connect} from 'react-redux'

socket.on('connect', function() {
  console.log('HAHA')
  // console.log('socket yazidi', socket.yazidi)
})

class Multiplayer extends Component {
  constructor() {
    super()
    this.state = {loading: true, lobby: {}}
    this.handleClick = this.handleClick.bind(this)
    // socket.on('send all', string => {
    //   console.log('how many')
    //   this.setState({opponent: this.state.opponent + 1})
    // })
    socket.on('joined', data => {
      console.log('got joined', data)
      socket.emit('sendback', this.props.user)
      this.setState({
        lobby: {...this.state.lobby, [data.email]: data}
      })
    })
    socket.on('sendback', data =>
      this.setState({
        lobby: {...this.state.lobby, [data.email]: data}
      })
    )
  }
  handleClick() {
    let me = this.props.user.email
    //add a DONE emit
    socket.emit('SEND', 'string')

    this.setState({lobby: {[me]: this.state.lobby[me] + 1}})
  }
  async componentDidMount() {
    const {data} = await Axios.get(`/api/users/${this.props.user.id}`)
    data.score = 0
    console.log('didmount with:', data)
    socket.emit('joined', data)
    this.setState({
      loading: false,
      lobby: {...this.state.lobby, [data.email]: data}
    })
    // console.log('data from socket', socket.user)
  }

  render() {
    // if (this.state.me >= 10 || this.state.opponent >= 10)
    //   return <h1>DONE!@#</h1>
    console.log(this.state)
    return (
      <Fragment>
        <h1>I am {this.props.user.email}</h1>
        <button onClick={this.handleClick}>+1</button>

        <br />
        <h1>Lobby: </h1>
        {Object.keys(this.state.lobby)
          ? Object.keys(this.state.lobby).map(key => {
              return <h2>{this.state.lobby[key].email}</h2>
            })
          : null}
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
