/* eslint-disable newline-per-chained-call */
const Schema = use('Schema')

class PartySchema extends Schema {
  up() {
    this.create('parties', (table) => {
      table.increments()
      table.string('title')
      table.string('status').notNullable()
      table.integer('admin_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('place_id').unsigned().references('id').inTable('places')
      table.integer('address_id').unsigned().references('id').inTable('address')
      table.string('primary_picture')
      table.integer('people_max')
      table.integer('people_min')
      table.string('telegram_url')
      table.string('type').notNullable()
      table.string('description')
      table.boolean('private_party').notNullable()
      table.dateTime('start_time').notNullable()
      table.dateTime('end_time')
      table.timestamps()
    })
  }

  down() {
    this.drop('parties')
  }
}

module.exports = PartySchema
