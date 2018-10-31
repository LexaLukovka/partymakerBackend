/* eslint-disable no-unused-expressions */
const Place = use('App/Models/Place')
const AddressRepository = use('App/Repositories/Address')
const PictureRepository = use('App/Repositories/Picture')
const VideoRepository = use('App/Repositories/Video')

class PlaceRepository {

  constructor() {
    this.address = new AddressRepository()
    this.picture = new PictureRepository()
    this.video = new VideoRepository()

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

    place.pictures && await this.picture.addTo(placeModel, place.pictures)
    place.videos && await this.video.addTo(placeModel, place.videos)

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

    if (place.pictures) {
      await this.picture.update(place.pictures)
    }

    return placeModel
  }
}

module.exports = PlaceRepository
