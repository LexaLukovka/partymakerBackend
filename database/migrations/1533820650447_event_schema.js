/* eslint-disable newline-per-chained-call */
const Schema = use('Schema')

class PlaceSchema extends Schema {
  up() {
    this.create('events', (table) => {
      table.increments()
      table.string('title')
      table.integer('admin_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('address_id').unsigned().references('id').inTable('address').notNullable()
      table.string('working_hours')
      table.string('price')
      table.string('description')
      table.dateTime('starts_at')
      table.dateTime('ends_at')
      table.timestamps()
    })
  }

  down() {
    this.drop('places')
  }
}

module.exports = PlaceSchema
