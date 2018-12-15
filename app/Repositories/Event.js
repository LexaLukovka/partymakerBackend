const Event = use('App/Models/Event')
const autoBind = require('auto-bind')

class EventRepository {

  constructor() {
    autoBind(this)

    this.query = Event.query()
      .with('admin')
      .with('place')
      .with('guests')
  }

  _values(request) {
    return {
      title: request.title,
      date: request.date,
      description: request.description,
      admin_id: request.admin_id,
      private: request.private,
    }
  }

  async _sync(event, request) {
    await event.sync({
      details: request.details,
      pictures: request.pictures,
      videos: request.videos,
    })

    return event
  }

  paginate({ page, limit }) {
    return this.query.paginate(page, limit)
  }

  find(id) {
    return this.query.where('id', id).first()
  }

  async create(request, admin) {
    const event = await Event.create(this._values({
      ...request, admin_id: admin.id,
    }))

    await event.guests().attach([admin.id])

    return this._sync(event, request)
  }

  async edit(event, request) {
    event.merge(this._values(request))
    await event.save()

    return this._sync(event, request)
  }
}

module.exports = EventRepository
