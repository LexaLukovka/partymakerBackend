const Room = use('App/Models/Room')

class RoomController {
  constructor({ socket, request, auth }) {
    this.auth = auth
    this.socket = socket
    this.request = request
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

    try {
      this.socket.broadcast('leave', user_id)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e)
    }
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
