module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.broadcast.emit('notice', 'message@')
    socket.on('SEND', variable => {
      console.log('received', variable)
      socket.broadcast.emit('send all', 'string')
    })
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
