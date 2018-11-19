'use strict'

const Schema = use('Schema')

class VideoIdeaSchema extends Schema {
  up() {
    this.create('idea_video', (table) => {
      table.increments()
      table.integer('idea_id').unsigned().references('id').inTable('ideas').notNullable()
      table.integer('video_id').unsigned().references('id').inTable('videos').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('idea_video')
  }
}

module.exports = VideoIdeaSchema
