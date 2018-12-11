const Event = use('App/Models/Event')
const AddressRepository = use('App/Repositories/Address')
const PictureRepository = use('App/Repositories/Picture')
const autoBind = require('auto-bind')

class EventRepository {

  constructor() {
    this.address = new AddressRepository()
    this.picture = new PictureRepository()
    autoBind(this)
  }

  paginate({ page, limit, params }) {
    return Event.query()
      .with('admin')
      .with('address')
      .with('place')
      .where(params)
      .orderBy('updated_at', 'DESC')
      .paginate(page, limit)
  }

  find(id) {
    return Event
      .query()
      .with('admin')
      .with('address')
      .with('place')
      .where('id', id)
      .first()
  }

  async create(data) {
    let addressModel

    if (data.address) {
      addressModel = await this.address.create(data.address)
    }

    const isValid = data.place_id || data.address

    if (!isValid) {
      throw new Error('you should choose between place_id or address and leave only one')
    }

    const event = await Event.create({
      title: data.title,
      admin_id: data.admin.id,
      place_id: data.place_id,
      invite_url: data.invite_url,
      address_id: data.address && addressModel.id,
      date: data.date,
      description: data.description,
    })

    await event.users().attach([data.admin.id])

    return this.find(event.id)
  }

  async edit(event, data) {
    let addressModel

    if (data.address) addressModel = await this.address.create(data.address)

    event.merge({
      title: data.title,
      place_id: data.place_id,
      address_id: data.address && addressModel.id,
      date: data.date,
      description: data.description,
    })
    await event.save()

    if (data.pictures) {
      await this.picture.update(data.pictures)
    }

    return this.find(event.id)
  }
}

module.exports = EventRepository
