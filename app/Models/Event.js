const Model = use('App/Models/Model')
const differenceBy = require('lodash/differenceBy')
const intersectionBy = require('lodash/intersectionBy')
const uniq = require('lodash/uniq')

class Event extends Model {
  static get hidden() {
    return ['address_id', 'user_id', 'place_id', 'pivot']
  }

  static get policy() {
    return 'App/Policies/Event'
  }


  async sync(request) {

    if (request.pictures) {
      await this.diff({
        data: uniq(request.pictures),
        relation: this.pictures(),
        field: 'url'
      })
    }

    if (request.videos) {
      await this.diff({
        data: uniq(request.videos),
        relation: this.videos(),
        field: 'url'
      })
    }

    if (request.details) {
      const oldDetails = await this.getJSON(this.details())
      const toAdd = differenceBy(request.details, oldDetails, 'label')
      const toAddModels = await this.details().createMany(toAdd)
      await this.details().attach(toAddModels.map(p => p.id))

      const toRemove = differenceBy(oldDetails, intersectionBy(request.details, oldDetails, 'label'), 'label')
      await Promise.all(toRemove.map(value => this.details().where('label', value.label).delete()))
    }
  }

  getStartTime(value) {
    return (new Date(value)).toString()
  }

  admin() {
    return this.belongsTo('App/Models/User', 'admin_id', 'id')
  }

  place() {
    return this.belongsTo('App/Models/Place')
  }

  pictures() {
    return this.belongsToMany('App/Models/Picture')
  }

  details() {
    return this.belongsToMany('App/Models/Detail')
  }

  videos() {
    return this.belongsToMany('App/Models/Video')
  }

  guests() {
    return this.belongsToMany('App/Models/User')
  }
}

module.exports = Event
