'use strict'

const Model = use('Model')

class Event extends Model {
  static get table() {
    return 'events'
  }

  static get policy() {
    return 'App/Policies/Event'
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

  details() {
    return this.hasMany('App/Model/Detail')
  }

}

module.exports = Event
