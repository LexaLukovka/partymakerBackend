const Message = use('App/Models/Message')
const Room = use('App/Models/Room')

class RoomController {
  constructor({ socket, request, auth }) {
    this.auth = auth
    this.socket = socket
    this.request = request
  }


  async onMessage(form) {
    const user_id = this.auth.user.id
    const message = await Message.create({ ...form, user_id, })

    this.socket.emit('message', message)
  }

  async onJoin(room_id) {
    const user_id = this.auth.user.id
    const room = await Room.find(room_id)

    await room.users()
      .pivotQuery()
      .where({ user_id })
      .update({ is_online: true })

    this.socket.broadcast('join', user_id)
  }

  async onLeave(room_id) {
    const user_id = this.auth.user.id
    const room = await Room.find(room_id)

    await room.users()
      .pivotQuery()
      .where({ user_id })
      .update({ is_online: false })

    this.socket.broadcast('leave', user_id)
  }

  async onClose({ topic }) {
    const room_id = topic.substring(5, 6)
    const user_id = this.auth.user.id
    this.socket.broadcast('leave', user_id)

    const room = await Room.find(room_id)

    await room.users()
      .pivotQuery()
      .where({ user_id: this.auth.user.id })
      .update({ is_online: false })
  }

}

module.exports = RoomController
