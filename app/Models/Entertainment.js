'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Entertainment extends Model {

  static get policy() {
    return 'App/Policies/Entertainment'
  }

  places() {
    return this.hasMany('App/Models/Place')
  }
}

module.exports = Entertainment
