'use strict'

const Schema = use('Schema')

class VideoSchema extends Schema {
  up() {
    this.create('videos', (table) => {
      table.increments()
      table.string('url').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('videos')
  }
}

module.exports = VideoSchema
