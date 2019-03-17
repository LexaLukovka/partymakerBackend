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
    const { page, limit, filter, sort, sortBy } = request.all()
    return this.place.paginate({
      page: page || 1,
      limit: limit || 9,
      filter: filter || null,
      sort: sort || 'desc',
      sortBy: sortBy || 'updated_at',
    })
  }

  /**
   * Create/save a new place.
   * POST places
   */
  async store({ request, response, auth }) {
    const req = request.all()

    console.log(req.places, req.search, req.bounds, req.location)

    await req.places.map(async value => {
      const place = await this.place.create(value)

      await this.place.find(place.id)
    })

    return response.accepted()
  }

  /**
   * Display a single place.
   * GET places/:id
   */
  async show({ request, auth, params, response }) {

    const place = await this.place.find(params.id)

    if (!place) return response.notFound()

    return this.place.find(place.id)
  }

  /**
   * Update place details.
   * PUT or PATCH places/:id
   */
  async update({ params, request, auth, response }) {
    const place = await Place.find(params.id)

    if (!place) return response.notFound()

    const updatedPlace = await this.place.update(place, request.all())

    return this.place.find(updatedPlace.id)
  }

  /**
   * Delete a place with id.
   * DELETE places/:id
   */
  async destroy({ params, request, auth, response }) {
    const place = await Place.find(params.id)

    if (auth.user.cannot('delete', place)) {
      return response.forbidden()
    }

    if (!place) return response.notFound()

    await place.delete()

    return response.deleted()
  }
}

module.exports = PlaceController
