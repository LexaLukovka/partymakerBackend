'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoomSchema extends Schema {
  up() {
    this.create('rooms', (table) => {
      table.increments()
      table.string('title')
      table.date('date')
      table.integer('place_id').unsigned().references('id').inTable('places').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('rooms')
  }
}

module.exports = RoomSchema
