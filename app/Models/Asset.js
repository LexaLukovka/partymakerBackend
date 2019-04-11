'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Asset extends Model {
  static get policy() {
    return 'App/Policies/Asset'
  }
}

module.exports = Asset
