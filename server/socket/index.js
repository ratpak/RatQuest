module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    socket.on('increment', user => {
      socket.broadcast.emit('received increment', user)
    })
    socket.on('I have joined the lobby', data => {
      setTimeout(() => socket.disconnect(), 300000)
      socket.broadcast.emit('Another user has joined the lobby', data)
    })
    socket.on('Send my data to new user', (data, email) => {
      socket.broadcast.emit(`Received another user's Data: ${email}`, data)
    })
    socket.on('I win', userEmail => {
      socket.broadcast.emit('A user has won', userEmail)
      socket.disconnect()
    })
    socket.on('Unplug me', () => {
      socket.disconnect()
    })
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
