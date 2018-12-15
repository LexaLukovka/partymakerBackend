'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventVideoSchema extends Schema {
  up() {
    this.create('event_video', (table) => {
      table.integer('video_id').unsigned().references('id').inTable('videos').notNullable().onDelete('CASCADE')
      table.integer('event_id').unsigned().references('id').inTable('events').notNullable().onDelete('CASCADE')
    })
  }

  down() {
    this.drop('event_video')
  }
}

module.exports = EventVideoSchema
