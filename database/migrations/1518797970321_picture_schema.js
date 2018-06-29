'use strict'

const Schema = use('Schema')

class PictureSchema extends Schema {
  up() {
    this.create('pictures', (table) => {
      table.increments()
      table.string('url').notNullable()
      table.timestamps()
    })
  }

  // noinspection JSUnusedGlobalSymbols
  down() {
    this.drop('pictures')
  }
}

module.exports = PictureSchema
