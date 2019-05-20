const Message = use('App/Models/Message')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Room extends Model {

  static get policy() {
    return 'App/Policies/Room'
  }

  static boot() {
    super.boot()
    this.addHook('afterCreate', 'RoomHook.afterUpdate')

  }

  static get dates() {
    return super.dates.concat(['date'])
  }

  async contains(user) {
    const result = await this.users().wherePivot('user_id', user.id).first()
    return !!result
  }

  users() {
    return this.belongsToMany('App/Models/User')
      .pivotModel('App/Models/RoomUser')
      .withPivot(['is_online', 'last_seen'])
  }

  invite() {
    return this.hasOne('App/Models/Invite')
  }

  place() {
    return this.belongsTo('App/Models/Place')
  }

  messages() {
    return this.hasMany('App/Models/Message')
  }

  async notify(text) {
    await Message.create({
      text,
      room_id: this.id,
    })
  }
}

module.exports = Room
