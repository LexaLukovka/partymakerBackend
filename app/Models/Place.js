const Model = use('App/Models/Model')
const differenceBy = require('lodash/differenceBy')
const intersectionBy = require('lodash/intersectionBy')
const uniq = require('lodash/uniq')

class Place extends Model {

  static get table() {
    return 'places'
  }

  static get policy() {
    return 'App/Policies/Place'
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

    if (request.labels) {
      await this.diff({
        data: uniq(request.labels),
        relation: this.labels(),
        field: 'title'
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

  admin() {
    return this.belongsTo('App/Models/User', 'admin_id', 'id')
  }

  pictures() {
    return this.belongsToMany('App/Models/Picture')
  }

  videos() {
    return this.belongsToMany('App/Models/Video')
  }

  details() {
    return this.belongsToMany('App/Models/Detail')
  }

  labels() {
    return this.belongsToMany('App/Models/Label')
  }
}

module.exports = Place
