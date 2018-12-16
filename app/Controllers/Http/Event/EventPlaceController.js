/* eslint-disable radix,object-shorthand */
const Event = use('App/Models/Event')
const autoBind = require('auto-bind')

class EventPlaceController {

  constructor() {
    autoBind(this)
  }

  /**
   * Show an event place.
   * GET events/:events_id/place
   */
  async index({ request, params, response }) {
    const event = await Event.find(params.events_id)

    if (!event) return response.notFound()

    const place = await event.place().fetch()

    if (place) return response.notFound()

    return place
  }

  /**
   * Add new place to current event.
   * POST events/:events_id/place
   */
  async store({ request, auth, response, params }) {
    const { id } = request.all()
    const event = await Event.find(params.events_id)

    if (!event) return response.notFound()

    event.merge({ place_id: id })
    await event.save()

    return response.created(await event.place().fetch())
  }

  /**
   * Detach an event place with id.
   * DELETE events/:events_id/place/:id
   */
  async destroy({ params, request, response }) {
    const event = await Event.find(params.events_id)

    if (!event) return response.notFound()

    event.merge({ place_id: null })
    await event.save()

    return response.deleted()
  }
}

module.exports = EventPlaceController

