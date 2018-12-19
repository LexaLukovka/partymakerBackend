const Invite = use('App/Models/Invite')
const User = use('App/Models/User')
const Event = use('App/Models/Event')
const RandomString = require('randomstring')

/**
 * Resourceful controller for interacting with event invites
 */
class EventInvitesController {
  /**
   * Show a list of all event invites.
   * GET events/:events_id/invites
   */
  async index({ request, params }) {
    const { page, limit } = request.all()

    const event = await Event.find(params.events_id)

    return event.invites().paginate(page, limit)
  }

  /**
   * Create new event invite.
   * POST event/:events_id/invites
   */
  async store({ request, response, params }) {

    const user = await User.create(request.all())

    const invite = await Invite.create({
      hash: RandomString.generate(12),
      event_id: params.events_id,
      user_id: user.id,
    })

    return response.created(invite)
  }

}

module.exports = EventInvitesController
