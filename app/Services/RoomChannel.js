const Ws = use('Ws')

class RoomChannel {
  constructor(room_id) {
    this.room_id = room_id
  }

  broadcast(name, data) {
    const chat = Ws.getChannel('room:*')
    const topic = chat.topic(`room:${this.room_id}`)
    if (topic) topic.broadcast(name, data)
  }

}


module.exports = RoomChannel
