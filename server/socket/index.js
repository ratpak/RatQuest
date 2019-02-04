module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    // Here are the socket broadcasts for multiplayer

    socket.on('increment', user => {
      socket.broadcast.emit('received increment', user)
    })
    socket.on('I have joined the lobby', data => {
      console.log(`A user has joined the lobby: ${socket.id}`)
      setTimeout(() => socket.disconnect(), 600000)
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
      socket.broadcast.emit('A user has disconnected')
      console.log(`Connection ${socket.id} has left the building`)
      socket.open()
    })
  })
}
