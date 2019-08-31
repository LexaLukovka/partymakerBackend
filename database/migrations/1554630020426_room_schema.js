'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoomSchema extends Schema {
  up() {
    this.create('rooms', (table) => {
      table.increments()
      table.string('title')
      table.string('invite_token')
      table.integer('place_id').unsigned().references('id').inTable('places').onDelete('CASCADE')
      table.integer('order_id').unsigned().references('id').inTable('orders').onDelete('CASCADE')
      table.date('date')
      table.string('time')
      table.timestamps()
    })
  }

  down() {
    this.drop('rooms')
  }
}

module.exports = RoomSchema
