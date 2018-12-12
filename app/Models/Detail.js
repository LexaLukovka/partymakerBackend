'use strict'

const Model = use('Model')

class Detail extends Model {

  static get hidden() {
    return ['created_at', 'updated_at', 'id']
  }

  static boot() {
    super.boot()

    this.addTrait('@provider:Lucid/UpdateOrCreate')
  }

  places() {
    return this.belongsToMany('App/Models/Place')
  }

  events() {
    return this.belongsToMany('App/Models/Event')
  }

}

module.exports = Detail
