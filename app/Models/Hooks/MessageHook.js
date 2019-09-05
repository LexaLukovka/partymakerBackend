/* eslint-disable no-multi-assign */
const Event = use('Event')
const Message = use('App/Models/Message')

const MessageHook = exports = module.exports = {}

MessageHook.afterCreate = async (message) => {

  const newMessage = await Message.query()
    .with('asset')
    .with('place')
    .where({ id: message.id })
    .first()

  Event.fire('ws:room', message.room_id, 'message', newMessage)
}
