'use strict'

const Model = use('Model')

class Detail extends Model {

  static get hidden() {
    return ['created_at', 'updated_at', 'place_id', 'id']
  }

  static boot() {
    super.boot()

    this.addTrait('@provider:Lucid/UpdateOrCreate')
  }

  places() {
    return this.belongsTo('App/Models/Place')
  }

}

module.exports = Detail
