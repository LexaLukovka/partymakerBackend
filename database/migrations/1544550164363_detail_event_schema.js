'use strict'

const Schema = use('Schema')

class DetailEventSchema extends Schema {
  up() {
    this.create('detail_event', (table) => {
      table.increments()
      table.integer('detail_id').unsigned().references('id').inTable('details').notNullable().onDelete('CASCADE')
      table.integer('event_id').unsigned().references('id').inTable('events').notNullable().onDelete('CASCADE')
    })
  }

  down() {
    this.drop('detail_event')
  }
}

module.exports = DetailEventSchema
