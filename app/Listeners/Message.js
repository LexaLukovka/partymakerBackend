/* eslint-disable no-console */
const RoomChannel = use('App/Services/RoomChannel')

const Message = exports = module.exports = {}

Message.read = async (room, user, callback = () => {}) => {
  try {
    const channel = new RoomChannel(room.id)
    await room
      .messages()
      .whereRaw(`user_id != ${user.id} and is_read = 0`)
      .update({ is_read: true })

    channel.broadcast('read', user)
    callback(null, user)
  } catch (err) {
    console.error('Read messages failed', err)
    callback(err)
  }
}

Message.send = async (message, callback = () => {}) => {
  try {
    callback(null, message)
  } catch (err) {
    callback(err)
  }
}
