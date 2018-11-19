'use strict'

const Schema = use('Schema')

class IdeaSchema extends Schema {
  up() {
    this.create('ideas', (table) => {
      table.increments()
      table.string('title')
      table.integer('admin_id').unsigned().references('id').inTable('users').notNullable()
      table.text('description')
      table.timestamps()
    })
  }

  down() {
    this.drop('ideas')
  }
}

module.exports = IdeaSchema
