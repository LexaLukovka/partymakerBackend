'use strict'

const Schema = use('Schema')

class LabelSchema extends Schema {
  up() {
    this.create('labels', (table) => {
      table.increments()
      table.string('title')
      table.timestamps()
    })
  }

  down() {
    this.drop('labels')
  }
}

module.exports = LabelSchema
