/* eslint-disable no-multi-assign */
const Message = use('App/Models/Message')
const User = use('App/Models/User')
const Ws = use('Ws')

const RoomUser = exports = module.exports = {}

RoomUser.notifyAddUser = async (room_user) => {
  const user = await User.find(room_user.user_id)

  await Message.create({
    text: `${user.name} присоденился к событию`,
    room_id: room_user.room_id,
  })

  const chat = Ws.getChannel('room:*')
  const topic = chat.topic(`room:${room_user.room_id}`)

  if (topic) topic.broadcast('guest:joined', user)
}
