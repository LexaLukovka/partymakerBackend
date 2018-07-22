/* eslint-disable newline-per-chained-call */

const Schema = use('Schema')

class PartyUserSchema extends Schema {
  up() {
    this.create('party_user', (table) => {
      table.increments()
      table.integer('party_id').unsigned().references('id').inTable('parties').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
    })
  }

  down() {
    this.drop('party_user')
  }
}

module.exports = PartyUserSchema
