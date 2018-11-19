'use strict'

const Schema = use('Schema')

class PictureIdeaSchema extends Schema {
  up() {
    this.create('idea_picture', (table) => {
      table.increments()
      table.integer('idea_id').unsigned().references('id').inTable('ideas').notNullable()
      table.integer('picture_id').unsigned().references('id').inTable('pictures').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('idea_picture')
  }
}

module.exports = PictureIdeaSchema
