'use strict'

const Schema = use('Schema')

class PlaceLabelSchema extends Schema {
  up() {
    this.create('label_place', (table) => {
      table.increments()
      table.integer('label_id').unsigned().references('id').inTable('labels')
      table.integer('place_id').unsigned().references('id').inTable('places')
    })
  }

  down() {
    this.drop('label_place')
  }
}

module.exports = PlaceLabelSchema