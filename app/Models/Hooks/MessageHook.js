/* eslint-disable no-multi-assign */
const Ws = use('Ws')
const Message = use('App/Models/Message')

const MessageHook = exports = module.exports = {}

MessageHook.afterCreate = async (message) => {

  const newMessage = await Message.query()
    .with('asset')
    .with('place')
    .where({ id: message.id })
    .first()

  const topic = Ws.getChannel('room:*').topic(`room:${message.room_id}`)
  if (topic) topic.broadcastToAll('message', newMessage)
}
