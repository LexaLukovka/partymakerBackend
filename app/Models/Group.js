const Model = use('Model')

class Group extends Model {
  static get hidden() {
    return ['address_id', 'user_id', 'place_id']
  }

  static get policy() {
    return 'App/Policies/Group'
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

  async isOnParty(user_id) {
    const users = await this.users().fetch()
    return !!users.toJSON().find(user => user.id === user_id)
  }

}

module.exports = Group
