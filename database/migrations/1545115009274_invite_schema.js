'use strict'

const Schema = use('Schema')

class InviteSchema extends Schema {
  up() {
    this.create('invites', (table) => {
      table.increments()
      table.string('hash')
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('event_id').unsigned().references('id').inTable('events').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('invites')
  }
}

module.exports = InviteSchema
