/* eslint-disable radix,no-empty-function */
const autoBind = require('auto-bind')
const Place = use('App/Models/Place')
const PlaceRepository = use('App/Repositories/Place')

/**
 * Resourceful controller for interacting with places
 */
class PlaceController {

  constructor() {
    this.place = new PlaceRepository()
    autoBind(this)
  }

  /**
   * Show a list of all places.
   * GET places
   */
  async index({ request }) {
    return this.place.paginate(request.all())
  }

  /**
   * Create/save a new place.
   * POST places
   */
  async store({ request, response, auth }) {
    const req = request.all()

    const place = await this.place.create({ ...req, admin: auth.user })

    return response.created(await this.place.find(place.id))
  }

  /**
   * Display a single place.
   * GET places/:id
   */
  async show({ request, auth, params, response }) {

    const place = await this.place.find(params.id)

    if (!place) return response.notFound()

    return place
  }

  /**
   * Update place details.
   * PUT or PATCH places/:id
   */
  async update({ params, request, auth, response }) {
    const req = request.all()
    const place = await Place.find(params.id)

    if (!place) return response.notFound()

    const updatedPlace = await this.place.update(place, {
      ...req,
      admin: auth.user
    })

    return response.accepted(await this.place.find(updatedPlace.id))
  }

  /**
   * Delete a place with id.
   * DELETE places/:id
   */
  async destroy({ params, request, auth, response }) {
    const place = await Place.find(params.id)

    if (auth.user.cannot('delete', place)) return response.forbidden()

    if (!place) return response.notFound()

    const title = `Place ${place.title} deleted`

    await place.delete()

    return response.deleted({ title })
  }
}

module.exports = PlaceController
