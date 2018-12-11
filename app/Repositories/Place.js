/* eslint-disable no-unused-expressions */
const isEmpty = use('lodash/isEmpty')
const autoBind = require('auto-bind')
const Place = use('App/Models/Place')
const AddressRepository = use('App/Repositories/Address')
const PictureRepository = use('App/Repositories/Picture')
const VideoRepository = use('App/Repositories/Video')
const DetailRepository = use('App/Repositories/Detail')
const LabelRepository = use('App/Repositories/Label')

class PlaceRepository {

  constructor() {
    this.address = new AddressRepository()
    this.pictures = new PictureRepository()
    this.videos = new VideoRepository()
    this.details = new DetailRepository()
    this.labels = new LabelRepository()

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
      address_id: place.address && (await this.address.create(place.address)).id,
      description: place.description,
    }
  }

  async _updateRelations(place, placeModel) {
    !isEmpty(place.labels) && await this.labels.update(placeModel, place.labels)
    !isEmpty(place.details) && await this.details.update(placeModel, place.details)
    !isEmpty(place.pictures) && await this.pictures.update(placeModel, place.pictures)
    !isEmpty(place.videos) && await this.videos.update(placeModel, place.videos)

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

    return this._updateRelations(place, placeModel)
  }

  async update(placeModel, place) {
    placeModel.merge(await this._values(place))
    await placeModel.save()

    return this._updateRelations(place, placeModel)
  }
}

module.exports = PlaceRepository
