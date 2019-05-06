const autoBind = require('auto-bind')

const RoomUser = use('App/Models/RoomUser')
const Message = use('App/Models/Message')
const MessageRepository = use('App/Repositories/MessageRepository')
const Ws = use('Ws')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with messages
 */
class MessageController {

  constructor() {
    autoBind(this)
    this.messages = new MessageRepository()
  }

  /**
   * Show a list of all messages of room.
   * GET /rooms/:rooms_id/messages
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */

  async index({ request, params }) {
    const { rooms_id } = params
    const { page, limit } = request.all()

    return this.messages.paginate(rooms_id, { page, limit })
  }

  /**
   * Create/save a new message for current room.
   * POST /rooms/:rooms_id/messages
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, params, auth }) {
    const fields = request.all()

    if (auth.user.cannot('create', Message)) {
      return response.forbidden()
    }

    const is_read = await RoomUser.isSomeoneOnline(params.rooms_id, auth)

    const message = await Message.create({
      ...fields,
      room_id: params.rooms_id,
      user_id: auth.user.id,
      is_read,
    })

    const chat = Ws.getChannel('room:*')
    const topic = chat.topic(`room:${message.room_id}`)
    const newMessage = await this.messages.find(message.id)

    if (topic) topic.broadcast('message', newMessage)

    return response.created(newMessage)
  }

  /**
   * Display a single message.
   * GET /rooms/:rooms_id/messages/:id
   *
   * @param {object} ctx
   */
  async show({ params }) {
    return this.messages.find(params.id)
  }

  /**
   * Update message details.
   * PUT or PATCH /rooms/:rooms_id/messages/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, auth, request, response }) {
    const fields = request.all()
    const message = await Message.findOrFail(params.id)

    if (auth.user.cannot('edit', message)) {
      return response.forbidden()
    }

    message.merge(fields)
    await message.save()

    const newMessage = await this.messages.find(message.id)

    return response.updated(newMessage)
  }

  /**
   * Delete a message with id.
   * DELETE /rooms/:rooms_id/messages/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ params, auth, response }) {
    const message = await Message.find(params.id)

    if (!message) {
      return response.notFound()
    }

    if (auth.user.cannot('delete', message)) {
      return response.forbidden()
    }

    await message.delete()

    return response.deleted()
  }
}

module.exports = MessageController
