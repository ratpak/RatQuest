import React, {Fragment} from 'react'
import socket from '../socket'

socket.on('connect', function() {
  console.log('HAHA')
})
console.log('hello from mul')

const Multiplayer = props => {
  return (
    <Fragment>
      <button onClick={() => socket.emit('SEND', 'string')}>socket</button>
    </Fragment>
  )
}
export default Multiplayer
