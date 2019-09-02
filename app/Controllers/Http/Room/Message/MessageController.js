const Message = use('App/Models/Message')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with messages
 */
class MessageController {

  /**
   * Show a list of all messages of room.
   * GET /rooms/:rooms_id/messages
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */

  async index({ request, params: { rooms_id } }) {
    const { page, limit } = request.all()

    return Message.query()
      .with('asset')
      .with('place')
      .orderBy('created_at', 'DESC')
      .where({ room_id: rooms_id })
      .paginate(page, limit)
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

    const message = await Message.create({
      ...fields,
      room_id: params.rooms_id,
      user_id: auth.user.id,
      is_read: false,
    })

    const newMessage = await Message.query()
      .with('asset')
      .with('place')
      .where({ id: message.id })
      .first()

    return response.created(newMessage)
  }

  /**
   * Display a single message.
   * GET /rooms/:rooms_id/messages/:id
   *
   * @param {object} ctx
   */
  async show({ params }) {
    return Message.query()
      .with('asset')
      .with('place')
      .where({ id: params.id })
      .first()
  }

  /**
   * Update message details.
   * PUT or PATCH /rooms/:rooms_id/messages/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ request, response, message }) {
    const fields = request.all()
    message.merge(fields)
    await message.save()

    const newMessage = await Message.query()
      .with('asset')
      .with('place')
      .where({ id: message.id })
      .first()

    return response.updated(newMessage)
  }

  /**
   * Delete a message with id.
   * DELETE /rooms/:rooms_id/messages/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ response, message }) {
    await message.delete()
    return response.deleted()
  }
}

module.exports = MessageController
