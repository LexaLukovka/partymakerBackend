'use strict'

const Model = use('Model')

class Party extends Model {
  static get hidden() {
    return ['address_id', 'user_id']
  }

  pictures() {
    return this.belongsToMany('App/Models/Picture')
  }

  address() {
    return this.belongsTo('App/Models/Location', 'address_id')
  }

  user() {
    return this.belongsTo('App/Models/User')
  }

}


module.exports = Party
