'use strict'

const Model = use('Model')
const difference = require('lodash/difference')
const differenceBy = require('lodash/differenceBy')

class Place extends Model {
  static get table() {
    return 'places'
  }

  static get policy() {
    return 'App/Policies/Place'
  }

  async sync(relations) {

    if (relations.pictures) {
      const oldPictures = await this.pictures()
      const toAdd = difference(relations.pictures, oldPictures)
      const toAddModels = await this.pictures().createMany(toAdd.map(url => ({ url })))
      await this.pictures().attach(toAddModels.map(p => p.id))
    }

    if (relations.videos) {
      const oldVideos = await this.videos()
      const toAdd = difference(relations.videos, oldVideos)
      const toAddModels = await this.videos().createMany(toAdd.map(url => ({ url })))
      await this.videos().attach(toAddModels.map(p => p.id))
    }

    if (relations.labels) {
      const oldLabels = await this.labels()
      const toAdd = difference(relations.labels, oldLabels)
      const toAddModels = await this.labels().createMany(toAdd.map(title => ({ title })))
      await this.labels().attach(toAddModels.map(p => p.id))
    }

    if (relations.details) {
      const oldDetails = await this.details().wherePivot('place_id', this.id).fetch()
      const toAdd = differenceBy(relations.details, oldDetails, 'label')
      const toAddModels = await this.details().createMany(toAdd)
      await this.details().attach(toAddModels.map(p => p.id))
    }

    /*
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
    */
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
