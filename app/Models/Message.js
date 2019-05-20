'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Message extends Model {

  static boot() {
    super.boot()
    this.addHook('afterCreate', 'MessageHook.afterCreate')
  }

  static get policy() {
    return 'App/Policies/Message'
  }

  static get dates() {
    return super.dates.concat(['date'])
  }

  asset() {
    return this.belongsTo('App/Models/Asset')
  }

  place() {
    return this.belongsTo('App/Models/Place')
  }
}

module.exports = Message
