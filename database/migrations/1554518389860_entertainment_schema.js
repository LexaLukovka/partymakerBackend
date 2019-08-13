'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EntertainmentsSchema extends Schema {
  up() {
    this.create('entertainments', (table) => {
      table.increments()
      table.string('title')
      table.timestamps()
    })
  }

  down() {
    this.drop('entertainments')
  }
}

module.exports = EntertainmentsSchema
