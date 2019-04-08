'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AssetSchema extends Schema {
  up() {
    this.create('assets', (table) => {
      table.increments()
      table.string('url').nullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('assets')
  }
}

module.exports = AssetSchema
