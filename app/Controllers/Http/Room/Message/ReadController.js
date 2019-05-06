const Room = use('App/Models/Room')
const Ws = use('Ws')


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with messages
 */
class ReadController {

  /**
   * Create/save a new message for current room.
   * PUT /rooms/:rooms_id/messages/read
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async update({ response, params, auth }) {
    const room = await Room.findOrFail(params.rooms_id)

    await room.messages()
      .whereRaw(`user_id != ${auth.user.id} and is_read = 0`)
      .update({ is_read: true })

    const chat = Ws.getChannel('room:*')
    const topic = chat.topic(`room:${params.rooms_id}`)

    if (topic) topic.broadcast('read', auth.user)

    return response.accepted()
  }

}

module.exports = ReadController
