/* eslint-disable newline-per-chained-call */

const Schema = use('Schema')

class PlacePictureSchema extends Schema {
  up() {
    this.create('picture_place', (table) => {
      table.increments()
      table.integer('place_id').unsigned().references('id').inTable('places').notNullable()
      table.integer('picture_id').unsigned().references('id').inTable('pictures').notNullable()
    })
  }

  down() {
    this.drop('picture_place')
  }
}

module.exports = PlacePictureSchema
