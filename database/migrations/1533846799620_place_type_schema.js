/* eslint-disable newline-per-chained-call */

const Schema = use('Schema')

class PlaceTypeSchema extends Schema {
  up() {
    this.create('place_type', (table) => {
      table.increments()
      table.integer('place_id').unsigned().references('id').inTable('places').notNullable().onDelete('CASCADE')
      table.integer('type_id').unsigned().references('id').inTable('types').notNullable().onDelete('CASCADE')
    })
  }

  down() {
    this.drop('place_type')
  }
}

module.exports = PlaceTypeSchema
