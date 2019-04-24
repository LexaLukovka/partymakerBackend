const Message = use('App/Models/Message')

class RoomController {
  constructor({ socket, request, auth }) {
    this.auth = auth
    this.socket = socket
    this.request = request
  }


  async onMessage({ text, asset_id, room_id }) {

    const message = await Message.create({
      user_id: this.auth.user.id,
      asset_id,
      room_id,
      text,
    })

    this.socket.emit('message', message)
  }

}

module.exports = RoomController
