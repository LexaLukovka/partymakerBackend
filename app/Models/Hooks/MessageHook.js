/* eslint-disable no-multi-assign */
const Ws = use('Ws')
const MessageRepository = use('App/Repositories/MessageRepository')

const MessageHook = exports = module.exports = {}

MessageHook.afterCreate = async (message) => {
  const messageRepository = new MessageRepository()

  const chat = Ws.getChannel('room:*')
  const topic = chat.topic(`room:${message.room_id}`)
  const newMessage = await messageRepository.find(message.id)

  if (topic) topic.broadcast('message', newMessage)
}
