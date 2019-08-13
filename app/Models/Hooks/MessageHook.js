/* eslint-disable no-multi-assign */
const RoomChannel = use('App/Services/RoomChannel')
const MessageRepository = use('App/Repositories/MessageRepository')

const MessageHook = exports = module.exports = {}

MessageHook.afterCreate = async (message) => {
  const messageRepository = new MessageRepository()
  const channel = new RoomChannel(message.room_id)
  const newMessage = await messageRepository.find(message.id)
  channel.broadcast('message', newMessage)
}
