/* eslint-disable newline-per-chained-call */
const Schema = use('Schema')

class GroupSchema extends Schema {
  up() {
    this.create('groups', (table) => {
      table.increments()
      table.string('title')
      table.integer('admin_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('place_id').unsigned().references('id').inTable('places')
      table.integer('event_id').unsigned().references('id').inTable('events')
      table.integer('address_id').unsigned().references('id').inTable('address')
      table.string('invite_url')
      table.string('description')
      table.dateTime('date').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('groups')
  }
}

module.exports = GroupSchema
