'use strict'

const Model = use('Model')

class Place extends Model {
  static get table() {
    return 'places'
  }

  static get policy() {
    return 'App/Policies/Place'
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

  videos() {
    return this.belongsToMany('App/Models/Video')
  }

  details() {
    return this.hasMany('App/Models/Detail')
  }
}

module.exports = Place
