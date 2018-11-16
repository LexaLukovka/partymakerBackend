/* eslint-disable newline-per-chained-call */
const Schema = use('Schema')

class EventSchema extends Schema {
  up() {
    this.create('events', (table) => {
      table.increments()
      table.string('title')
      table.integer('admin_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('address_id').unsigned().references('id').inTable('address').notNullable()
      table.text('description').notNullable()
      table.dateTime('date').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('events')
  }
}

module.exports = EventSchema
