/* eslint-disable no-unused-expressions */
const isEmpty = use('lodash/isEmpty')

const Place = use('App/Models/Place')
const AddressRepository = use('App/Repositories/Address')
const PictureRepository = use('App/Repositories/Picture')
const VideoRepository = use('App/Repositories/Video')

class PlaceRepository {

  constructor() {
    this.address = new AddressRepository()
    this.picture = new PictureRepository()
    this.videos = new VideoRepository()

    this.create = this.create.bind(this)
  }

  paginate(options) {
    return Place.query()
      .with('admin')
      .with('address')
      .with('pictures')
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
      working_day: place.working_day,
      working_hours: place.working_hours,
      description: place.description,
    })

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
      working_day: place.working_day,
      working_hours: place.working_hours,
      description: place.description,
    })
    await placeModel.save()

    console.log(1, place.videos)

    !isEmpty(place.pictures) && await this.picture.update(placeModel, place.pictures)
    !isEmpty(place.videos) && await this.videos.update(placeModel, place.videos)


    return placeModel
  }
}

module.exports = PlaceRepository
