'use strict'

const Invite = use('App/Models/Invite')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with invites
 */
class InviteController {
  /**
   * Show a list of all invites.
   * GET invites
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */

  async index({ request, auth, params }) {
    const { page, limit } = request.all()

    return Invite
      .query()
      .where({
        admin_id: auth.user.id,
        room_id: params.rooms_id,
      })
      .paginate({ page, limit })
  }

  /**
   * Create a new invite.
   * POST invites
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, params, auth }) {
    const fields = request.all()

    if (auth.user.cannot('create', Invite)) {
      return response.forbidden()
    }

    const invite = await Invite.create({
      ...fields,
      room_id: params.rooms_id,
      admin_id: auth.user.id,
    })

    return response.created(invite)
  }

  /**
   * Display a single invite.
   * GET invites/:id
   *
   * @param {object} ctx
   */
  async show({ params }) {
    return Invite.find(params.id)
  }

  /**
   * Update invite details.
   * PUT or PATCH invites/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, auth, request, response }) {
    const fields = request.all()
    const invite = await Invite.find(params.id)

    if (!invite) {
      return response.notFound('Invite not found!')
    }

    if (auth.user.cannot('edit', invite)) {
      return response.forbidden()
    }

    invite.merge(fields)
    await invite.save()

    return response.updated(invite)
  }

  /**
   * Delete a invite with id.
   * DELETE invites/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ params, auth, response }) {
    const invite = await Invite.find(params.id)


    if (!invite) {
      return response.notFound()
    }

    if (auth.user.cannot('delete', invite)) {
      return response.forbidden()
    }

    await invite.delete()

    return response.deleted('Invite was deleted!')
  }
}

module.exports = InviteController
