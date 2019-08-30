'use strict'

const Room = use('App/Models/Room')


class InviteController {

  /**
   * Show invite.
   * GET /invite/:token
   *
   * @param {object} ctx
   */
  async show({ params: { token }, response }) {
    const room = await Room.findBy({ invite_token: token })

    return response.accepted(room)
  }

  /**
   * Accept invite and add user to room
   * POST /invite/:token
   *
   * @param {object} ctx
   */
  async accept({ auth, response, params: { room_id } }) {
    const room = await Room.find(room_id)
    await room.users().attach([auth.user.id])
    return response.accepted(room)
  }
}

module.exports = InviteController
