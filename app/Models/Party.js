
const Model = use('Model')

class Party extends Model {
  static get hidden() {
    return ['address_id', 'user_id']
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

  pictures() {
    return this.belongsToMany('App/Models/Picture')
  }

  async isOnParty(user_id) {
    return !!this.users().where('id', user_id).first()
  }

}

module.exports = Party
