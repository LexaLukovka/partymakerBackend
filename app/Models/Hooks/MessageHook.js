/* eslint-disable no-multi-assign */
const Event = use('Event')
const MessageRepository = use('App/Repositories/MessageRepository')

const MessageHook = exports = module.exports = {}

MessageHook.afterCreate = async (message) => {
  const messageRepository = new MessageRepository()
  Event.fire('ws:message', await messageRepository.find(message.id))
}
