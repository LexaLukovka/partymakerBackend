'use strict'

const Model = use('Model')

class Place extends Model {
  static get table() {
    return 'places'
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

  rating() {
    return this.hasMany('App/Models/PlaceRating')
  }

  pictures() {
    return this.belongsToMany('App/Models/Picture')
  }

  static async total() {
    const { total } = (await this.query().count('* as total'))[0]
    return total
  }
}

module.exports = Place
