/* eslint-disable newline-per-chained-call */
const Schema = use('Schema')

class PlaceSchema extends Schema {
  up() {
    this.create('places', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.double('rating').notNullable()
      table.integer('user_ratings_total').notNullable()
      table.integer('address_id').unsigned().references('id').inTable('address').notNullable().onDelete('CASCADE')
      table.timestamps()
    })
  }

  down() {
    this.drop('places')
  }
}

module.exports = PlaceSchema
