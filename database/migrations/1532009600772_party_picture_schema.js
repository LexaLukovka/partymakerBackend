/* eslint-disable newline-per-chained-call */

'use strict'

const Schema = use('Schema')

class PartyPictureSchema extends Schema {
  up() {
    this.create('party_picture', (table) => {
      table.increments()
      table.integer('party_id').unsigned().references('id').inTable('parties').notNullable()
      table.integer('picture_id').unsigned().references('id').inTable('pictures').notNullable()
    })
  }

  down() {
    this.drop('party_picture')
  }
}

module.exports = PartyPictureSchema
