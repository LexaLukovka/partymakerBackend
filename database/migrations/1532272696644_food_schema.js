/* eslint-disable newline-per-chained-call */

const Schema = use('Schema')

class Table extends Schema {
  up() {
    this.create('food', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('party_id').unsigned().references('id').inTable('parties').notNullable()
      table.string('title')
      table.string('total')
      table.string('brand')
      table.boolean('bought').notNullable()
      table.string('price')
      table.timestamps()
    })
  }

  down() {
    this.drop('food')
  }
}

module.exports = Table
