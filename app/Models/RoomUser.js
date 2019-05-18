'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class RoomUser extends Model {
  static get table() {
    return 'room_user'
  }

  static boot() {
    super.boot()
    this.addHook('afterCreate', 'RoomUserHook.notifyAddUser')
  }


  static get dates() {
    return super.dates.concat(['last_seen'])
  }

  static get createdAtColumn() {
    return null
  }

  static get updatedAtColumn() {
    return null
  }

  static async isSomeoneOnline(room_id, auth) {
    return !!await this.query()
      .whereRaw(`room_id = ${room_id} and user_id != ${auth.user.id} and is_online = 1`)
      .first()
  }
}

module.exports = RoomUser
