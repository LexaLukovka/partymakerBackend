'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ResetTokenSchema extends Schema {
  up() {
    this.create('reset_tokens', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('resetToken', 255).notNullable().unique().index()
      table.string('type', 80).notNullable()
      table.boolean('is_revoked').defaultTo(false)
      table.timestamps()
    })
  }

  down() {
    this.drop('reset_tokens')
  }
}

module.exports = ResetTokenSchema
