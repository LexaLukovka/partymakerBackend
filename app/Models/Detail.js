'use strict'

const Model = use('Model')

class Detail extends Model {
  static boot() {
    super.boot()

    this.addTrait('@provider:Lucid/UpdateOrCreate')
  }

  places() {
    return this.belongsTo('App/Models/Place')
  }

  events() {
    return this.belongsTo('App/Models/Events')
  }

}

module.exports = Detail
