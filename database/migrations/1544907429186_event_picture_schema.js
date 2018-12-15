'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventPictureSchema extends Schema {
  up() {
    this.create('event_picture', (table) => {
      table.increments()
      table.integer('picture_id').unsigned().references('id').inTable('pictures').notNullable().onDelete('CASCADE')
      table.integer('event_id').unsigned().references('id').inTable('events').notNullable().onDelete('CASCADE')
    })
  }

  down() {
    this.drop('event_picture')
  }
}

module.exports = EventPictureSchema
