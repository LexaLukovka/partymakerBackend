const Model = use('Model')

// eslint-disable-next-line
class Cargo extends Model {

  static get hidden() {
    return ['to_id', 'from_id', 'user_id']
  }

  pictures() {
    return this.belongsToMany('App/Models/Picture')
  }

  from() {
    return this.belongsTo('App/Models/Location', 'from_id')
  }

  to() {
    return this.belongsTo('App/Models/Location', 'to_id')
  }

  user() {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Cargo
