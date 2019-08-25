'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlaceSchema extends Schema {
  up() {
    this.create('places', (table) => {
      table.increments()
      table.string('title')
      table.string('picture_url')
      table.string('working_hours')
      table.string('price')
      table.string('website_url')
      table.text('map_url')
      table.string('phone')
      table.integer('entertainment_id').unsigned().references('id').inTable('entertainments')
      table.timestamps()
    })
  }

  down() {
    this.drop('places')
  }
}

module.exports = PlaceSchema
