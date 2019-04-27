const randomString = require('randomstring')
const Room = use('App/Models/Room')
const Invite = use('App/Models/Invite')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with invites
 */
class InviteController {

  /**
   * Display invite.
   * GET /rooms/:rooms_id/invite
   *
   * @param {object} ctx
   */
  async index({ params }) {
    const room = await Room.findOrFail(params.rooms_id)

    return room.invite().fetch()
  }

  /**
   * Create a new invite.
   * POST /rooms/:rooms_id/invite
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, params, auth }) {
    const fields = request.all()
    const room = await Room.findOrFail(params.rooms_id)

    if (auth.user.cannot('create', Invite)) {
      return response.forbidden()
    }

    const form = { ...fields, token: randomString.generate() }
    const invite = await room.invite().create(form)

    return response.created(invite)
  }

  /**
   * Update invite details.
   * PUT or PATCH /rooms/:rooms_id/invite
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, auth, request, response }) {
    const fields = request.all()
    const room = await Room.findOrFail(params.rooms_id)

    if (auth.user.cannot('edit', room)) {
      return response.forbidden()
    }

    await room.invite().update(fields)

    return response.updated(await room.invite().fetch())
  }

  /**
   * Delete a invite with id.
   * DELETE /rooms/:rooms_id/invite
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ params, auth, response }) {
    const room = await Room.findOrFail(params.rooms_id)
    const invite = await room.invite()

    if (!invite) {
      return response.notFound()
    }

    if (auth.user.cannot('delete', room)) {
      return response.forbidden()
    }

    await invite.delete()

    return response.deleted('Invite was deleted!')
  }
}

module.exports = InviteController
