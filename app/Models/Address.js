const Model = use('Model')

class Address extends Model {

  static get table() {
    return 'address'
  }

  static get createTimestamp() {
    return 'created_at'
  }

  static get updateTimestamp() {
    return 'updated_at'
  }

  static get hidden() {
    return ['created_at', 'updated_at', 'id']
  }

  group() {
    return this.hasOne('App/Models/Group')
  }

  place() {
    return this.hasOne('App/Models/Place')
  }
}

module.exports = Address
