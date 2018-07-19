/* eslint-disable newline-per-chained-call */
const Schema = use('Schema')

class PartySchema extends Schema {
  up() {
    this.create('parties', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('address_id').unsigned().references('id').inTable('locations').notNullable()
      table.string('icon')
      table.string('district')
      table.string('time')
      table.double('after')
      table.double('before')
      table.string('description')
      table.boolean('checked')
      table.string('primary_picture')
      table.timestamps()
    })
  }

  down() {
    this.drop('parties')
  }
}

module.exports = PartySchema
