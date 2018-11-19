'use strict'

const Model = use('Model')

class Idea extends Model {

  places() {
    return this.hasMany('App/Models/Place')
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

module.exports = Idea
