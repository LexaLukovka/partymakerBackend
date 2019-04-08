'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SocialSchema extends Schema {
  up() {
    this.create('socials', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.string('provider_id').nullable()
      table.string('provider').nullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('socials')
  }
}

module.exports = SocialSchema
