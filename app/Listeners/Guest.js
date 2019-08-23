/* eslint-disable no-console */

const Message = use('App/Models/Message')
const User = use('App/Models/User')
const Event = use('Event')
const Guest = exports = module.exports = {}

Guest.add = async (room_id, user_id, callback = () => {}) => {
  try {
    const user = await User.find(user_id)
    await Message.create({ room_id, text: `${user.name} присоденился к событию` })
    Event.fire('ws:guest:joined', user)
    callback(null, user)
  } catch (err) {
    console.error('add guest failed', err)
    callback(err)
  }
}

Guest.remove = async (room, user, guest, callback = () => {}) => {
  try {
    await room.notify(`${user.name} удалил(а) пользователя ${guest.name} из события`)
    await room.users().detach([guest.id])
    Event.fire('ws:guest:left', user)
    callback(null, user)
  } catch (err) {
    console.error('remove guest failed', err)
    callback(err)
  }
}
