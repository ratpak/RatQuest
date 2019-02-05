import io from 'socket.io-client'

const lobbySocket = io(window.location.origin)

lobbySocket.on('connect', () => {
  console.log('lobby socket connected')
})
lobbySocket.on('disconnect', () => {
  console.log('lobby socket disconnected!')
})
export default lobbySocket
