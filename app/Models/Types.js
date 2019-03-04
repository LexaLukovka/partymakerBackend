const Model = use('Model')
const TypeSerializer = require('./Serializers/TypeSerializer')

class Types extends Model {

  static get Serializer() {
    return TypeSerializer
  }

  static get hidden() {
    return ['created_at', 'updated_at', 'id', 'pivot']
  }
}

module.exports = Types
