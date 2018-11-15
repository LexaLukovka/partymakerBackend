const autoBind = require('auto-bind')
const Detail = use('App/Models/Detail')

class DetailRepository {

  constructor() {
    autoBind(this)
  }

  get({ label, place_id }) {
    return Detail.query()
      .where('label', label)
      .where('place_id', place_id)
      .first()
  }

  set({ label, value, place_id }) {
    return Detail.updateOrCreate({ label, place_id }, { label, value })
  }
}

module.exports = DetailRepository
