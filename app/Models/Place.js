'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Place extends Model {

  static boot() {
    super.boot()
    this.addHook('afterCreate', 'PlaceHook.broadcast')
  }

  static get policy() {
    return 'App/Policies/Place'
  }
}

module.exports = Place
