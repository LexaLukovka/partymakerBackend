/* eslint-disable newline-per-chained-call */

const Schema = use('Schema')

class PlacePictureSchema extends Schema {
  up() {
    this.create('event_picture', (table) => {
      table.increments()
      table.integer('event_id').unsigned().references('id').inTable('events').notNullable()
      table.integer('picture_id').unsigned().references('id').inTable('pictures').notNullable()
    })
  }

  down() {
    this.drop('event_picture')
  }
}

module.exports = PlacePictureSchema
