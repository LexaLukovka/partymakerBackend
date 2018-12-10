/* eslint-disable newline-per-chained-call */
const Schema = use('Schema')

class PlaceSchema extends Schema {
  up() {
    this.create('places', (table) => {
      table.increments()
      table.string('title')
      table.text('description')
      table.integer('admin_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('address_id').unsigned().references('id').inTable('address').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('places')
  }
}

module.exports = PlaceSchema
