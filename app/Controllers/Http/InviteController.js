const Invite = use('App/Models/Invite')

/**
 * Resourceful controller for interacting with invites
 */
class InviteController {

  /**
   * Display a single invite.
   * GET invites/:id
   */
  async show({ params }) {
    return Invite.query().with('event').where('hash', params.id).first()
  }

  /**
   * Delete a invite with hash.
   * DELETE invites/:id
   */
  async destroy({ params, request, response }) {
    const invite = await Invite.findBy('hash', params.id)

    if (!invite) return response.notFound()

    await invite.delete()

    return response.deleted()
  }
}

module.exports = InviteController
