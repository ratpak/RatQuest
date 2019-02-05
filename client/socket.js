import io from 'socket.io-client'

let socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})
socket.on('disconnect', () => {
  console.log('disconnected!')
  socket = io(window.location.origin, {forceNew: true})
  socket.open()
})

export default socket
