'use strict'

const Message = use('App/Models/Message')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with messages
 */
class MessageController {
  /**
   * Show a list of all messages.
   * GET messages
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index({ request, params }) {
    const { rooms_id } = params
    const { page, limit } = request.all()

    return Message.query()
      .where({ room_id: rooms_id })
      .paginate(page, limit)
  }

  /**
   * Create/save a new message.
   * POST messages
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

    const message = await Message.create({
      ...fields,
      room_id: params.rooms_id,
      user_id: auth.user.id,
    })

    return response.created(await Message.find(message.id))
  }

  /**
   * Display a single message.
   * GET messages/:id
   *
   * @param {object} ctx
   */
  async show({ params }) {
    return Message.find(params.id)
  }

  /**
   * Update message details.
   * PUT or PATCH messages/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, auth, request, response }) {
    const fields = request.all()
    const message = await Message.find(params.id)

    if (!message) {
      return response.notFound()
    }

    if (auth.user.cannot('edit', message)) {
      return response.forbidden()
    }

    message.merge(fields)
    await message.save()

    return response.updated(message)
  }

  /**
   * Delete a message with id.
   * DELETE messages/:id
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
