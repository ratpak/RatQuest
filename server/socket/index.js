module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.on('send all', variable => {
      console.log('received', variable)
      socket.broadcast.emit('send all', 'string', 'string 2')
    })
    socket.on('joined', data => {
      socket.broadcast.emit('joined', data)
    })

    socket.on('increment', (lobbyName, user) => {
      console.log('from server index', lobbyName, user)
      socket.broadcast.emit(`incremented${lobbyName}`, user)
    })

    // broadcast message customized based on lobby name!!
    socket.on('sendback', data => {
      socket.broadcast.emit('sendback', data)
    })
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
