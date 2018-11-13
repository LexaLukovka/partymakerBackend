/* eslint-disable radix,no-empty-function */
const Place = use('App/Models/Place')
const PlaceRepository = use('App/Repositories/Place')

/**
 * Resourceful controller for interacting with places
 */
class PlaceController {

  constructor() {
    this.place = new PlaceRepository()
    this.index = this.index.bind(this)
    this.store = this.store.bind(this)
    this.show = this.show.bind(this)
    this.update = this.update.bind(this)
    this.destroy = this.destroy.bind(this)
  }

  /**
   * Show a list of all places.
   * GET places
   */
  async index({ request }) {
    const { page, limit } = request.all()

    const places = await this.place.paginate({
      page: page || 1,
      limit: limit || 10,
    })

    return places
  }

  /**
   * Create/save a new place.
   * POST places
   */
  async store({ request, response, auth }) {
    const req = request.all()

    const place = await this.place.create({ ...req, admin: auth.user })

    return response.created({
      created: !!place,
      place: await this.place.find(place.id)
    })
  }

  /**
   * Display a single place.
   * GET places/:id
   */
  async show({ request, auth, params, response }) {

    const placeModel = await this.place.find(params.id)

    if (!placeModel) return response.notFound()

    const rating = await placeModel.rating().avg('rating as rating')

    const place = placeModel.toJSON()
    if (rating[0] && rating[0].rating) {
      place.rating = parseFloat(rating[0].rating.toFixed(1))
    } else {
      place.rating = null
    }

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

    const updatedPlace = await this.place.edit(place, { ...req, admin: auth.user })

    return {
      updated: !!updatedPlace,
      place: await this.place.find(updatedPlace.id)
    }
  }

  /**
   * Delete a place with id.
   * DELETE places/:id
   */
  async destroy({ params, request, auth, response }) {
    const place = await Place.find(params.id)

    if (!place) return response.notFound()

    const title = `Place ${place.title} deleted`

    await place.delete()

    return { title }
  }
}

module.exports = PlaceController
