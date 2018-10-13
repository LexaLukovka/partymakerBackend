/* eslint-disable newline-per-chained-call */

const Schema = use('Schema')

class PartyUserSchema extends Schema {
  up() {
    this.create('group_user', (table) => {
      table.increments()
      table.integer('group_id').unsigned().references('id').inTable('groups').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
    })
  }

  down() {
    this.drop('group_user')
  }
}

module.exports = PartyUserSchema
