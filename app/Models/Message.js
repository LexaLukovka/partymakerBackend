'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Message extends Model {
  static get policy() {
    return 'App/Policies/Message'
  }

  asset() {
    return this.belongsTo('App/Models/Asset')
  }
}

module.exports = Message
