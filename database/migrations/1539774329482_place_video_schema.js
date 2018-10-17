/* eslint-disable newline-per-chained-call */

const Schema = use('Schema')

class VideoPlaceSchema extends Schema {
  up() {
    this.create('place_video', (table) => {
      table.increments()
      table.integer('place_id').unsigned().references('id').inTable('places').notNullable()
      table.integer('video_id').unsigned().references('id').inTable('videos').notNullable()
    })
  }

  down() {
    this.drop('place_video')
  }
}

module.exports = VideoPlaceSchema
