/* eslint-disable no-console */

const Message = use('App/Models/Message')
const User = use('App/Models/User')
const RoomChannel = use('App/Services/RoomChannel')

const Guest = exports = module.exports = {}

Guest.add = async (room_id, user_id, callback = () => {}) => {
  try {
    const channel = new RoomChannel(room_id)
    const user = await User.find(user_id)
    await Message.create({ room_id, text: `${user.name} присоденился к событию` })
    channel.broadcast('guest:joined', user)
    callback(null, user)
  } catch (err) {
    console.error('add guest failed', err)
    callback(err)
  }
}

Guest.remove = async (room, user, guest, callback = () => {}) => {
  try {
    const channel = new RoomChannel(room.id)
    await room.notify(`${user.name} удалил(а) пользователя ${guest.name} из события`)
    await room.users().detach([guest.id])
    channel.broadcast('guest:left', user)
    callback(null, user)
  } catch (err) {
    console.error('remove guest failed', err)
    callback(err)
  }
}
