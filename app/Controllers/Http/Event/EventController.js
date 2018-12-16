/* eslint-disable radix,object-shorthand */
const Event = use('App/Models/Event')
const EventRepository = use('App/Repositories/Event')
const autoBind = require('auto-bind')

class EventController {

  constructor() {
    this.event = new EventRepository()
    autoBind(this)
  }

  /**
   * Show a list of all events.
   * GET events
   */
  async index({ request }) {
    const { page, limit } = request.all()

    return this.event.paginate({
      page: page || 1,
      limit: limit || 10
    })
  }

  /**
   * Create/save a new event.
   * POST events
   */
  async store({ request, auth, response }) {
    const event = await this.event.create(request.all(), auth.user)

    return response.created(await this.event.find(event.id))
  }

  /**
   * Display a single event.
   * GET events/:id
   */
  async show({ request, response, auth, params }) {
    const event = await this.event.find(params.id)

    if (!event) return response.notFound()

    return this.event.find(event.id)
  }

  /**
   * Update event details.
   * PUT or PATCH events/:id
   */
  async update({ request, auth, response, params }) {
    const event = await Event.find(params.id)

    if (!event) return response.notFound()

    if (auth.user.cannot('edit', event)) {
      return response.forbidden()
    }

    await this.event.edit(event, request.all())

    return response.accepted(await this.event.find(event.id))
  }

  /**
   * Delete a event with id.
   * DELETE events/:id
   */
  async destroy({ params, response, auth }) {
    const event = await Event.find(params.id)

    if (!event) return response.notFound()

    if (auth.user.cannot('delete', event)) {
      return response.forbidden()
    }

    event.delete()

    return response.deleted()
  }
}

module.exports = EventController

