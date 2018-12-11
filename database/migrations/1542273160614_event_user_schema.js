/* eslint-disable newline-per-chained-call */

const Schema = use('Schema')

class PartyUserSchema extends Schema {
  up() {
    this.create('event_user', (table) => {
      table.increments()
      table.integer('event_id').unsigned().references('id').inTable('events').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
    })
  }

  down() {
    this.drop('event_user')
  }
}

module.exports = PartyUserSchema
