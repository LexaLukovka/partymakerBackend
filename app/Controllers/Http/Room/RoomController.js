'use strict'

const User = use('App/Models/User')
const Room = use('App/Models/Room')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with rooms
 */
class RoomController {
  /**
   * Show a list of all rooms.
   * GET rooms
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index({ request, auth }) {
    const { page, limit } = request.all()

    return auth.user.rooms().paginate({ page, limit })
  }

  /**
   * Create/save a new room.
   * POST rooms
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const fields = request.all()

    if (auth.user.cannot('create', Room)) {
      return response.forbidden()
    }

    const room = await Room.create({
      ...fields,
      admin_id: auth.user.id,
    })

    await room.users().attach([auth.user.id])

    return response.created(await Room.find(room.id))
  }

  /**
   * Display a single room.
   * GET rooms/:id
   *
   * @param {object} ctx
   */
  async show({ params }) {
    return Room.find(params.id)
  }

  /**
   * Update room details.
   * PUT or PATCH rooms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, auth, request, response }) {
    const fields = request.all()
    const room = await Room.find(params.id)

    if (auth.user.cannot('edit', room)) {
      return response.forbidden()
    }

    room.merge(fields)
    await room.save()

    return response.updated(room)
  }

  /**
   * Delete a room with id.
   * DELETE rooms/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ params, auth, response }) {
    const room = await Room.find(params.id)

    if (!room) {
      return response.notFound()
    }

    if (auth.user.cannot('delete', room)) {
      return response.forbidden()
    }

    await room.delete()

    return response.deleted()
  }
}

module.exports = RoomController
