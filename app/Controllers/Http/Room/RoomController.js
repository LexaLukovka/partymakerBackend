const Room = use('App/Models/Room')
const Event = use('Event')
const moment = require('moment')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */

/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/**
 * Resourceful controller for interacting with rooms
 */
class RoomController {
  /**
   * Show a list of all rooms.
   * GET /rooms
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index({ request }) {
    const { page, limit } = request.all()
    return Room.query().with('place').paginate({ page, limit })
  }

  /**
   * Create/save a new room.
   * POST /rooms
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const fields = request.all()
    const room = await Room.create(fields)
    await room.users().attach([auth.user.id])
    return response.created(await Room.find(room.id))
  }

  /**
   * Display a single room.
   * GET /rooms/:id
   *
   * @param {object} ctx
   */
  async show({ params }) {
    return Room
      .query()
      .with('users')
      .with('place.entertainment')
      .where({ id: params.id })
      .first()
  }

  /**
   * Update room details.
   * PUT or PATCH /rooms/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ auth, request, response, room }) {
    const fields = request.all()
    const date = moment(fields.date).format('D MMMM, dddd')
    const isNewDate = room.date !== fields.date
    if (isNewDate) await room.notify(`${auth.user.name} установил(а) дату события на ${date}`)
    room.merge(fields)
    await room.save()

    const newRoom = await Room.query()
      .with('users')
      .with('place')
      .where({ id: room.id })
      .first()

    return response.updated(newRoom)
  }

  /**
   * Remove user from room.
   * DELETE /rooms/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ auth: { user }, response, room }) {
    Event.fire('ws:guest:left', user)
    await room.notify(`${user.name} покинул к событие`)
    await room.users().detach([user.id])
    return response.deleted(`${user.name} left ${room.title}`)
  }
}

module.exports = RoomController
