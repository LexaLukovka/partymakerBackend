const autoBind = require('auto-bind')
const isEmpty = require('lodash/isEmpty')
const Place = use('App/Models/Place')
const Address = use('App/Models/Address')

class PlaceRepository {

  constructor() {
    autoBind(this)
    this.query = Place.query()
      .with('admin')
      .with('address')
      .with('pictures')
      .with('details')
      .with('videos')
      .with('labels')
  }

  async _values(place) {
    return {
      title: place.title,
      admin_id: place.admin_id,
      address_id: place.address && (await Address.create(place.address)).id,
      description: place.description,
    }
  }

  async _sync(request, place) {
    await place.sync({
      details: request.details,
      labels: request.labels,
      pictures: request.pictures,
      videos: request.videos,
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
    const placeModel = await Place.create(await this._values({
      ...place, admin_id: admin.id
    }))

    return this._sync(place, placeModel)
  }

  async update(placeModel, place) {
    placeModel.merge(await this._values(place))
    await placeModel.save()

    return this._sync(place, placeModel)
  }
}

module.exports = PlaceRepository
