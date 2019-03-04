'use strict'

const Schema = use('Schema')

class TypeSchema extends Schema {
  up() {
    this.create('types', (table) => {
      table.increments()
      table.string('type').notNullable()
      table.timestamps()
    })
  }

  // noinspection JSUnusedGlobalSymbols
  down() {
    this.drop('types')
  }
}

module.exports = TypeSchema
