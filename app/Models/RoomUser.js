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
}

module.exports = RoomUser
