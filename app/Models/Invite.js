'use strict'

const Model = use('Model')

class Invite extends Model {

  event() {
    return this.belongsTo('App/Models/Event')
  }

}

module.exports = Invite
