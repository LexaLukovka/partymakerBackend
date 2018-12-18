const Model = use('App/Models/Model')
const differenceBy = require('lodash/differenceBy')
const intersectionBy = require('lodash/intersectionBy')
const difference = require('lodash/difference')
const intersection = require('lodash/intersection')
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
      const oldLabelModels = await this.labels()
      const oldLabels = oldLabelModels.map(l => l.title)
      const toAdd = difference(request.labels, oldLabels)
      const addedModels = await this.labels().createMany(toAdd.map(title => ({ title })))
      await this.labels().attach(addedModels.map(m => m.id))

      const toRemove = difference(oldLabels, intersection(request.labels, oldLabels))
      const toRemoveModels = toRemove.map(title => oldLabelModels.find(l => l.title === title))
      await this.labels().detach(toRemoveModels.map(m => m.id))

      const toAddOld = intersection(request.labels, oldLabels)
      const addedOldModels = toAddOld.map(v => oldLabelModels.findIndex(value => value.title === v) + 1)
      await this.labels().attach(addedOldModels.map(m => m))
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

  address() {
    return this.belongsTo('App/Models/Address')
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
