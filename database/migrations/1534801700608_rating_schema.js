/* eslint-disable newline-per-chained-call */

const Schema = use('Schema')

class RatingSchema extends Schema {
  up() {
    this.create('place_rating', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('place_id').unsigned().references('id').inTable('pictures').notNullable()
      table.double('rating').unsigned().notNullable()
      table.unique(['user_id', 'place_id'], 'rating_user_place')
      table.timestamps()
    })
  }

  down() {
    this.drop('place_rating')
  }
}

module.exports = RatingSchema
