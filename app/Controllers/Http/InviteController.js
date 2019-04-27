'use strict'

const Invite = use('App/Models/Invite')
const Room = use('App/Models/Room')


class InviteController {

  /**
   * Show invite.
   * GET /invite/:token
   *
   * @param {object} ctx
   */
  async show({ params: { token } }) {
    return Invite.findBy({ token })
  }

  /**
   * Accept invite and add user to room
   * POST /invite/:token
   *
   * @param {object} ctx
   */
  async accept({ auth, response, params: { token } }) {
    const invite = await Invite.findBy({ token })
    const room = await Room.find(invite.room_id)

    await room.users().attach([auth.user.id])

    return response.accepted(room)
  }

}

module.exports = InviteController
