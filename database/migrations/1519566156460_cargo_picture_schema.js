/* eslint-disable newline-per-chained-call */

const Schema = use('Schema')

class CreateCargoPictureSchema extends Schema {
  up() {
    this.create('cargo_picture', (table) => {
      table.increments()
      table.integer('cargo_id').unsigned().references('id').inTable('cargos').notNullable()
      table.integer('picture_id').unsigned().references('id').inTable('pictures').notNullable()
    })
  }

  down() {
    this.drop('cargo_picture')
  }
}

module.exports = CreateCargoPictureSchema
