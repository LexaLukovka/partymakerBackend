const Model = use('Model')

class Event extends Model {
  static get hidden() {
    return ['address_id', 'user_id', 'place_id']
  }

  static get policy() {
    return 'App/Policies/Event'
  }

  getStartTime(value) {
    return (new Date(value)).toString()
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

  place() {
    return this.belongsTo('App/Models/Place')
  }

  pictures() {
    return this.belongsToMany('App/Models/Picture')
  }
}

module.exports = Event
