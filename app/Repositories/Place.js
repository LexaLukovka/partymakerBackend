const autoBind = require('auto-bind')
const isEmpty = require('lodash/isEmpty')
const Place = use('App/Models/Place')
const Address = use('App/Models/Address')

class PlaceRepository {

  constructor() {
    autoBind(this)
    this.query = Place.query()
      .with('address')
      .with('types')
      .with('pictures')
  }

  async _values(place) {
    return {
      name: place.name,
      rating: place.rating,
      user_ratings_total: place.user_ratings_total,
      address_id: place.address && (await Address.create(place.address)).id,
    }
  }

  async _sync(request, place) {
    await place.sync({
      types: request.types,
      pictures: request.pictures,
    })

    return place
  }

  paginate({ page, limit, filter, sort, sortBy }) {

    if (isEmpty(filter)) {
      return this.query.orderBy(sortBy, sort).paginate({ page, limit })
    }

    const query = this.query
      .whereHas('address', (builder) => {
        builder.where('address', 'like', `%${filter}%`)
      })
      .orWhereHas('labels', (builder) => {
        builder.where('title', 'like', `%${filter}%`)
      })

    return query.orderBy(sortBy, sort).paginate({ page, limit })
  }

  find(id) {
    return this.query.where('id', id).first()
  }

  async create(place, admin) {
    const placeModel = await Place.create(await this._values(place))

    const sync = await this._sync(place, placeModel)

    return sync
  }

  async update(placeModel, place) {
    placeModel.merge(await this._values(place))
    await placeModel.save()

    return this._sync(place, placeModel)
  }
}

module.exports = PlaceRepository
