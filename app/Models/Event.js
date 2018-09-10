'use strict'

const Model = use('Model')

class Event extends Model {
  static get table() {
    return 'events'
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

  static async total() {
    const { total } = (await this.query().count('* as total'))[0]
    return total
  }
}

module.exports = Event
