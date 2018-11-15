const autoBind = require('auto-bind')
const Event = use('App/Models/Event')
const AddressRepository = use('App/Repositories/Address')
const PictureRepository = use('App/Repositories/Picture')

class EventRepository {

  constructor() {
    this.address = new AddressRepository()
    this.picture = new PictureRepository()

    autoBind(this)
  }

  paginate(options) {
    return Event.query()
      .with('admin')
      .with('address')
      .with('pictures')
      .orderBy('updated_at', 'DESC')
      .paginate(options.page, options.limit)
  }

  find(id) {
    return Event
      .query()
      .with('admin')
      .with('address')
      .with('pictures')
      .where('id', id)
      .first()
  }

  async create(event) {
    const addressModel = await this.address.create(event.address)

    const placeModel = await Event.create({
      title: event.title,
      admin_id: event.admin.id,
      address_id: addressModel.id,
      date: event.date,
      description: event.description,
    })

    await this.picture.addTo(placeModel, event.pictures)

    return placeModel
  }

  async edit(eventModel, event) {
    let addressModel

    if (event.address) addressModel = await this.address.create(event.address)

    eventModel.merge({
      title: event.title,
      admin_id: event.admin.id,
      address_id: addressModel && addressModel.id,
      date: event.date,
      description: event.description,
    })
    await eventModel.save()

    if (event.pictures) {
      await this.picture.update(event.pictures)
    }

    return eventModel
  }
}

module.exports = EventRepository
