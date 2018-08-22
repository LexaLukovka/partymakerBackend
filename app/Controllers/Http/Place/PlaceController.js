/* eslint-disable radix,no-empty-function */
const Place = use('App/Models/Place')

/**
 * Resourceful controller for interacting with places
 */
class PlaceController {
  // noinspection JSUnusedGlobalSymbols
  /**
   * Show a list of all places.
   * GET places
   */
  async index({ request }) {
    const { cursor } = request.all()

    const total = await Place.total()

    const places = await Place
      .query()
      .with('admin')
      .with('address')
      .with('pictures')
      .where('id', '>', parseInt(cursor) || 0)
      .limit(10)
      .orderBy('updated_at', 'DESC')
      .fetch()


    return {
      status: 200,
      cursor,
      total,
      data: places,
    }
  }

  /**
   * Create/save a new place.
   * POST places
   */
  async store({ request, response }) {
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Display a single place.
   * GET places/:id
   */
  async show({ request, auth, params }) {
    const placeModel = await Place
      .query()
      .with('admin')
      .with('address')
      .with('pictures')
      .where('id', params.id)
      .first()

    const rating = await placeModel.rating().avg('rating as rating')

    const place = placeModel.toJSON()
    if (rating[0] && rating[0].rating) {
      place.rating = parseFloat(rating[0].rating.toFixed(1))
    } else {
      place.rating = null
    }
    return {
      status: 200,
      data: place,
    }
  }

  /**
   * Update place details.
   * PUT or PATCH places/:id
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a place with id.
   * DELETE places/:id
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = PlaceController
