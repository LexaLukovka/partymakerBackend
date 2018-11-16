/* eslint-disable no-unused-expressions */
const isEmpty = use('lodash/isEmpty')
const autoBind = require('auto-bind')
const Place = use('App/Models/Place')
const AddressRepository = use('App/Repositories/Address')
const PictureRepository = use('App/Repositories/Picture')
const VideoRepository = use('App/Repositories/Video')
const DetailRepository = use('App/Repositories/Detail')

class PlaceRepository {

  constructor() {
    this.address = new AddressRepository()
    this.picture = new PictureRepository()
    this.videos = new VideoRepository()
    this.detail = new DetailRepository()
    autoBind(this)
  }

  paginate(options) {
    return Place.query()
      .with('admin')
      .with('address')
      .with('pictures')
      .with('details')
      .with('videos')
      .orderBy('updated_at', 'DESC')
      .paginate(options.page, options.limit)
  }

  find(id) {
    return Place
      .query()
      .with('admin')
      .with('address')
      .with('pictures')
      .with('details')
      .with('videos')
      .where('id', id)
      .first()
  }

  async create(place) {
    const addressModel = await this.address.create(place.address)

    const placeModel = await Place.create({
      title: place.title,
      admin_id: place.admin.id,
      address_id: addressModel.id,
      description: place.description,
    })

    !isEmpty(place.details) && await this.detail.update(placeModel, place.details)
    !isEmpty(place.pictures) && await this.picture.addTo(placeModel, place.pictures)
    !isEmpty(place.videos) && await this.videos.addTo(placeModel, place.videos)

    return placeModel
  }

  async edit(placeModel, place) {
    let addressModel

    if (place.address) addressModel = await this.address.create(place.address)

    placeModel.merge({
      title: place.title,
      admin_id: place.admin.id,
      address_id: addressModel && addressModel.id,
      description: place.description,
    })

    await placeModel.save()

    !isEmpty(place.details) && await this.detail.update(placeModel, place.details)
    !isEmpty(place.pictures) && await this.picture.update(placeModel, place.pictures)
    !isEmpty(place.videos) && await this.videos.update(placeModel, place.videos)

    return placeModel
  }
}

module.exports = PlaceRepository
