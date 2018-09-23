const Place = use('App/Models/Place')
const AddressRepository = use('App/Repositories/Address')
const PictureRepository = use('App/Repositories/Picture')

class PlaceRepository {

  constructor() {
    this.address = new AddressRepository()
    this.picture = new PictureRepository()

    this.create = this.create.bind(this)
  }

  paginate(options) {
    return Place.query()
      .with('admin')
      .with('address')
      .with('pictures')
      .orderBy('updated_at', 'DESC')
      .paginate(options.page, options.limit)
  }

  find(id) {
    return Place
      .query()
      .with('admin')
      .with('address')
      .with('pictures')
      .where('id', id)
      .first()
  }

  async create(place) {
    const addressModel = await this.address.create(place.address)

    const placeModel = await Place.create({
      title: place.title,
      admin_id: place.admin.id,
      address_id: addressModel.id,
      working_hours: place.working_hours,
      price: place.price,
      description: place.description,
    })


    await this.picture.addTo(placeModel, place.pictures)

    return placeModel
  }

  async edit(placeModel, place) {
    let addressModel

    if (place.address) addressModel = await this.address.create(place.address)

    placeModel.merge({
      title: place.title,
      admin_id: place.admin.id,
      address_id: addressModel && addressModel.id,
      working_hours: place.working_hours,
      price: place.price,
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
