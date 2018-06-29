const Model = use('Model')

class Location extends Model {

  static get createTimestamp() {
    return 'created_at'
  }

  static get updateTimestamp() {
    return 'updated_at'
  }

  static get hidden() {
    return ['created_at', 'updated_at', 'id']
  }
}

module.exports = Location
