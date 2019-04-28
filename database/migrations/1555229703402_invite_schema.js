'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InviteSchema extends Schema {

  up() {
    this.create('invites', (table) => {
      table.increments()
      table.string('headline')
      table.string('title')
      table.string('preposition')
      table.string('address')
      table.string('background_url')
      table.date('date')
      table.time('time')
      table.string('token')
      table.integer('room_id').unsigned().references('id').inTable('rooms').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('invites')
  }
}

module.exports = InviteSchema
