const Env = use('Env')
const Model = use('Model')
const difference = require('lodash/difference')
const intersection = require('lodash/intersection')
const differenceBy = require('lodash/differenceBy')
const intersectionBy = require('lodash/intersectionBy')
const uniq = require('lodash/uniq')
const isString = require('lodash/isString')

class Place extends Model {

  static get table() {
    return 'places'
  }

  static get policy() {
    return 'App/Policies/Place'
  }

  /**
   * Returns fields in simple format and also removes base from urls
   *
   * @param  {BelongsToMany} relation of current model
   * @return {GeneralSerializer}
   */
  async _getJSON(relation) {
    return (await relation.fetch()).toJSON().map(p => (isString(p) ? p.replace(Env.get('APP_URL'), '') : p))
  }

  /**
   * sync request data to the table relations
   *
   * @param  {Object} data from request
   * @param  {Object} relation of current model
   * @param  {String} field name in table
   * @return {void}
   */
  async _diff({ data, relation, field }) {
    const oldValues = await this._getJSON(relation)
    const toAdd = difference(data, oldValues)
    const addedModels = await relation.createMany(toAdd.map(f => ({ [field]: f })))
    await relation.attach(addedModels.map(m => m.id))
    const toRemove = difference(oldValues, intersection(data, oldValues))
    await Promise.all(toRemove.map(value => relation.where(field, value).delete()))
  }

  async sync(request) {

    if (request.pictures) {
      await this._diff({
        data: uniq(request.pictures),
        relation: this.pictures(),
        field: 'url'
      })
    }

    if (request.videos) {
      await this._diff({
        data: uniq(request.videos),
        relation: this.videos(),
        field: 'url'
      })
    }

    if (request.labels) {
      await this._diff({
        data: uniq(request.labels),
        relation: this.labels(),
        field: 'title'
      })
    }

    if (request.details) {
      const oldDetails = await this._getJSON(this.details())
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

  address() {
    return this.belongsTo('App/Models/Address', 'address_id', 'id')
  }

  users() {
    return this.belongsToMany('App/Models/User')
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
