/* eslint-disable radix,object-shorthand */
const Event = use('App/Models/Event')
const autoBind = require('auto-bind')

class EventGuestsController {

  constructor() {
    autoBind(this)
  }

  /**
   * Show a list of all event guests.
   * GET events/:events_id/guests
   */
  async index({ request, params }) {
    const { page, limit } = request.all()

    const event = await Event.find(params.events_id)

    return event.guests().paginate(page, limit)
  }

  /**
   * Add new guest to current event.
   * POST events/:events_id/guests
   */
  async store({ request, auth, response, params }) {
    const { id } = request.all()
    const event = await Event.find(params.events_id)

    if (!event) return response.notFound()

    await event.guests().attach([id])

    return response.created()
  }

  /**
   * Display a single event.
   * GET  events/:event_id/guests/:id
   */
  async show({ request, response, auth, params }) {
    const event = await Event.find(params.events_id)

    if (!event) return response.notFound()

    const guest = await event.guests().where('users.id', params.id).first()

    if (!guest) return response.notFound()

    return guest
  }

  /**
   * Detach an event guest with id.
   * DELETE events/:events_id/guests/:id
   */
  async destroy({ params, request, response }) {
    const event = await Event.find(params.events_id)

    if (!event) return response.notFound()

    const guest = await event.guests().where('users.id', params.id).first()

    if (!guest) return response.notFound()

    await event.guests().detach([guest.id])

    return response.deleted()
  }
}

module.exports = EventGuestsController

