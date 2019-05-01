const Room = use('App/Models/Room')
const Place = use('App/Models/Place')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with places
 */
class PlaceController {

  /**
   * Display place.
   * GET /rooms/:rooms_id/place
   *
   * @param {object} ctx
   */
  async index({ params }) {
    const room = await Room.findOrFail(params.rooms_id)

    return room.place().fetch()
  }

  /**
   * Create a new place.
   * POST /rooms/:rooms_id/place
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, params, auth }) {
    const fields = request.all()
    const room = await Room.findOrFail(params.rooms_id)

    if (auth.user.cannot('create', Place)) {
      return response.forbidden()
    }

    const place = await room.place().create(fields)

    return response.created(place)
  }

  /**
   * Update place details.
   * PUT or PATCH /rooms/:rooms_id/place
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const fields = request.all()
    const room = await Room.findOrFail(params.rooms_id)

    await room.place().update(fields)

    return response.updated(await room.place().fetch())
  }

  /**
   * Delete a place with id.
   * DELETE /rooms/:rooms_id/place
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ params, auth, response }) {
    const room = await Room.findOrFail(params.rooms_id)
    const place = await room.place()

    if (!place) {
      return response.notFound()
    }

    if (auth.user.cannot('delete', room)) {
      return response.forbidden()
    }

    await place.delete()

    return response.deleted('Place was deleted!')
  }
}

module.exports = PlaceController
