'use strict'

const Model = use('Model')

class ResetToken extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = ResetToken
