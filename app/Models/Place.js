'use strict'

const Model = use('Model')
const difference = require('lodash/difference')
const intersection = require('lodash/intersection')

class Place extends Model {
  static get table() {
    return 'places'
  }

  static get policy() {
    return 'App/Policies/Place'
  }

  async sync(relations) {
    Object.entries(relations).forEach(async ([key, values]) => {
      const oldValues = await this[key]()
      const toAdd = difference(values, oldValues)
      const toRemove = difference(oldValues, intersection(values, oldValues))

      const toRemoveModels = await Promise.all(toRemove.map((value) => {
        const model = this

        if (key === 'pictures' || key === 'videos') {
          this.where('url', value).delete()
        }

        if (key === 'labels') {
          this.where('title', value).delete()
        }

        if (key === 'details') {
          this.where('label', value).delete()
        }

        return model
      }))

      const toAddModels = await this[key]().createMany(toAdd)
      debugger
      await this[key].attach(toAddModels.map(p => p.id))
      await this[key].detach(toRemoveModels.map(p => p.id))

      return this[key]
    })
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

  rating() {
    return this.hasMany('App/Models/PlaceRating')
  }

  pictures() {
    return this.belongsToMany('App/Models/Picture')
  }

  videos() {
    return this.belongsToMany('App/Models/Video')
  }

  details() {
    return this.hasMany('App/Models/Detail')
  }

  labels() {
    return this.belongsToMany('App/Models/Label')
  }
}

module.exports = Place
