'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InviteSchema extends Schema {

  up() {
    this.create('invites', (table) => {
      table.increments()
      table.string('headline')
      table.integer('background_id').unsigned().references('id').inTable('assets').onDelete('CASCADE')
      table.integer('admin_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('room_id').unsigned().references('id').inTable('rooms').onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('invites')
  }
}

module.exports = InviteSchema
