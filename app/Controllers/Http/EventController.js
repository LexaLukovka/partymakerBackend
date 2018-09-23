/* eslint-disable radix,no-empty-function */
const Event = use('App/Models/Event')
const EventRepository = use('App/Repositories/Event')

/**
 * Resourceful controller for interacting with events
 */
class EventController {

  constructor() {
    this.event = new EventRepository()
    this.index = this.index.bind(this)
    this.store = this.store.bind(this)
    this.show = this.show.bind(this)
    this.update = this.update.bind(this)
    this.destroy = this.destroy.bind(this)
  }

  /**
   * Show a list of all events.
   * GET events
   */
  async index({ request }) {
    const { page, limit } = request.all()

    const events = await this.event.paginate({
      page: page || 1,
      limit: limit || 10,
    })

    return events
  }

  /**
   * Create/save a new event.
   * POST events
   */
  async store({ request, response, auth }) {
    const req = request.all()

    if (auth.user.cannot('create', Event)) {
      return response.forbidden()
    }

    const event = this.event.create({ ...req, admin: auth.user })

    return response.created({ created: !!event, event })
  }

  /**
   * Display a single event.
   * GET events/:id
   */
  async show({ request, auth, params, response }) {

    const eventModel = await this.event.find(params.id)

    if (!eventModel) return response.notFound()

    return eventModel
  }

  /**
   * Update event details.
   * PUT or PATCH events/:id
   */
  async update({ params, request, auth, response }) {
    const req = request.all()
    const event = await Event.find(params.id)

    if (!event) return response.notFound()
    if (auth.user.cannot('edit', event)) return response.forbidden()

    const updatedEvent = await this.event.edit(event, { ...req, admin: auth.user })

    return { updated: !!updatedEvent, updatedEvent }
  }

  /**
   * Delete a event with id.
   * DELETE events/:id
   */
  async destroy({ params, request, auth, response }) {
    const event = await Event.find(params.id)

    if (auth.user.cannot('delete', event)) return response.forbidden()

    await event.delete()

    return event
  }
}

module.exports = EventController
