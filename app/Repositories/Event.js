const Event = use('App/Models/Event')
const PictureRepository = use('App/Repositories/Picture')
const autoBind = require('auto-bind')

class EventRepository {

  constructor() {
    this.picture = new PictureRepository()
    autoBind(this)

    this._query = Event.query()
      .with('admin')
      .with('address')
      .with('place')
  }

  _values(request) {
    return {
      title: request.title,
      admin_id: request.admin.id,
      place_id: request.place_id,
      invite_url: request.invite_url,
      date: request.date,
      description: request.description,
    }
  }

  paginate({ page, limit, params }) {
    return this._query
      .where(params)
      .orderBy('updated_at', 'DESC')
      .paginate(page, limit)
  }

  find(id) {
    return this._query.where('id', id).first()
  }

  async create(request) {
    const event = await Event.create(this._values(request))
    await event.users().attach([request.admin.id])

    return this.find(event.id)
  }

  async edit(event, request) {
    event.merge(this._values(request))
    await event.save()
    if (request.pictures) await this.picture.update(request.pictures)

    return this.find(event.id)
  }
}

module.exports = EventRepository
