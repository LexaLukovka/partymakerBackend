/* eslint-disable radix,object-shorthand */
const Event = use('App/Models/Event')
const autoBind = require('auto-bind')

class EventDetailsController {

  constructor() {
    autoBind(this)
  }

  /**
   * Show a list of all event details.
   * GET events/:events_id/details
   */
  async index({ request, params, response }) {
    const { page, limit } = request.all()

    const event = await Event.find(params.events_id)

    if (!event) return response.notFound()

    return event.details().paginate(page, limit)
  }

  /**
   * Add new detail to current event.
   * POST events/:events_id/details
   */
  async store({ request, auth, response, params }) {
    const { id } = request.all()
    const event = await Event.find(params.events_id)

    if (!event) return response.notFound()

    await event.details().attach([id])


    return response.created()
  }

  /**
   * Display a single event detail.
   * GET events/:events_id/details/:id
   */
  async show({ request, response, auth, params }) {
    const event = await Event.find(params.events_id)

    if (!event) return response.notFound()

    const detail = await event.details().where('details.id', params.id).first()

    if (!detail) return response.notFound()

    return detail
  }

  /**
   * Detach a event detail with id.
   * DELETE events/:events_id/details/:id
   */
  async destroy({ params, request, response }) {
    const event = await Event.find(params.events_id)

    if (!event) return response.notFound()

    const detail = await event.details().where('details.id', params.id).first()

    if (!detail) return response.notFound()

    await event.details().detach([detail.id])

    return response.deleted()
  }
}

module.exports = EventDetailsController

