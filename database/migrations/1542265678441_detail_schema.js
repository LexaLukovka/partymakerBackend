'use strict'

const Schema = use('Schema')

class DetailSchema extends Schema {
  up() {
    this.create('details', (table) => {
      table.increments()
      table.string('label')
      table.string('value')
      table.timestamps()
    })
  }

  down() {
    this.drop('details')
  }
}

module.exports = DetailSchema
