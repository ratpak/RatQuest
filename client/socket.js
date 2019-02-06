import io from 'socket.io-client'

let socket = io(window.location.origin)
// let lobbySocket = io(window.location.origin)
socket.on('connect', () => {
  console.log('Connected!')
})
socket.on('disconnect', () => {
  console.log('disconnected!')
})

export default socket
