const autoBind = require('auto-bind')
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
      admin_id: place.admin.id,
      address_id: place.address && (await Address.create(place.address)).id,
      description: place.description,
    }
  }

  async _sync(place, placeModel) {

    await placeModel.sync({
      details: place.details,
      labels: place.labels,
      pictures: place.pictures,
      videos: place.videos,
    })

    return placeModel
  }

  paginate(options) {
    return this.query
      .orderBy('updated_at', 'DESC')
      .paginate(options.page || 1, options.limit || 9)
  }

  find(id) {
    return this.query
      .where('id', id)
      .first()
  }

  async create(place) {
    const placeModel = await Place.create(await this._values(place))

    return this._sync(place, placeModel)
  }

  async update(placeModel, place) {
    placeModel.merge(await this._values(place))
    await placeModel.save()

    return this._sync(place, placeModel)
  }
}

module.exports = PlaceRepository
