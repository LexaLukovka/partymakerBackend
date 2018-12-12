'use strict'

const Schema = use('Schema')

class DetailPlaceSchema extends Schema {
  up() {
    this.create('detail_place', (table) => {
      table.increments()
      table.integer('detail_id').unsigned().references('id').inTable('details').notNullable()
      table.integer('place_id').unsigned().references('id').inTable('places').notNullable()
    })
  }

  down() {
    this.drop('detail_place')
  }
}

module.exports = DetailPlaceSchema
