module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    // Here are the socket broadcasts for multiplayer
    socket.on('increment', (user, lobbyId) => {
      socket.broadcast.emit(`received increment ${lobbyId}`, user)
    })
    socket.on('I have joined the lobby', (data, lobbyId) => {
      console.log(`A user has joined the lobby: ${socket.id}`)
      setTimeout(() => socket.disconnect(), 600000)
      socket.broadcast.emit('Lobby spot taken', lobbyId, data)
      socket.broadcast.emit(
        `Another user has joined the lobby ${lobbyId}`,
        data,
        socket.id
      )
    })
    socket.on('Send my data to new user', (data, email, lobbyId) => {
      socket.broadcast.emit(
        `Received another user's Data: ${email} ${lobbyId}`,
        data,
        socket.id
      )
    })
    socket.on('entered lobby screen', () => {
      socket.broadcast.emit('requesting lobby info')
    })
    socket.on('I win', (userEmail, lobbyId) => {
      socket.broadcast.emit(`A user has won ${lobbyId}`, userEmail)
      socket.disconnect()
    })
    socket.on('Unplug me', () => {
      socket.disconnect()
    })
    socket.on('disconnect', () => {
      socket.broadcast.emit('clear lobby', socket.id)
      socket.broadcast.emit('A user has disconnected', socket.id)

      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
