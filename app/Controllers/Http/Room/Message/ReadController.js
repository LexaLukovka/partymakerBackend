const Room = use('App/Models/Room')
const Event = use('Event')
const Ws = use('Ws')

/** @typedef {import('@adonisjs/framework/src/Response')} Response */

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

    Ws.getChannel('room:*')
      .topic(`room:${room.id}`)
      .broadcast('message:read', auth.user)

    return response.accepted()
  }

}

module.exports = ReadController
