'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Invite extends Model {
  static get policy() {
    return 'App/Policies/Invite'
  }

  room() {
    return this.belongsTo('App/Models/Invite')
  }
}

module.exports = Invite
