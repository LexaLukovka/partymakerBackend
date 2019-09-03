const Room = use('App/Models/Room')
const moment = require('moment')
const Ws = use('Ws')


const diff = (fields, room, name) => fields[name] && room[name] !== fields[name]

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
    room.users().attach([auth.user.id])
    return response.created(room)
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
    room.merge(fields)
    await room.save()

    const newRoom = await Room.query().with('place').where({ id: room.id }).first()

    const date = moment(fields.date).format('D MMMM, dddd')

    if (diff(fields, room, 'date')) {
      await room.notify(`${auth.user.name} установил(а) дату события на ${date}`)
    }

    if (diff(fields, room, 'time')) {
      await room.notify(`${auth.user.name} установил(а) время события на ${fields.time}`)
    }

    if (diff(fields, room, 'place_id')) {
      await room.notify(`${auth.user.name} установил(а) место события ${newRoom.place.title}`)
    }


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

    await room.users().detach([user.id])

    await room.notify(`${user.name} покинул к событие`)

    Ws.getChannel('room:*')
      .topic(`room:${room.id}`)
      .broadcast('guest:left', user)

    return response.deleted(`${user.name} left ${room.title}`)
  }
}

module.exports = RoomController
