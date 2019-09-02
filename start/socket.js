const Ws = use('Ws')

class ActiveUsers {

  users = {}

  all() {
    return Object.values(this.users)
  }

  ids() {
    return this.all().map(u => u.id)
  }

  add(socket_id, user) {
    this.users[socket_id] = user
  }

  remove(socket_id) {
    delete this.users[socket_id]
  }
}

const activeUsers = new ActiveUsers()

Ws.channel('room:*', ({ socket, auth }) => {
  activeUsers.add(socket.id, auth.user)
  socket.emit('online', activeUsers.ids())

  socket.on('close', (closingSocket) => {
    activeUsers.remove(closingSocket.id)
    socket.emit('online', activeUsers.ids())
    socket.close()
    // Event.removeAllListeners()
  })
}).middleware(['auth'])
