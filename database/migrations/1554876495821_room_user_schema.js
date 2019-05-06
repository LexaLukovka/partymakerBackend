'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoomUserSchema extends Schema {
  up() {
    this.create('room_user', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('room_id').unsigned().references('id').inTable('rooms').onDelete('CASCADE')
      table.bool('is_online').default(false)
    })
  }

  down() {
    this.drop('room_user')
  }
}

module.exports = RoomUserSchema
