/* eslint-disable newline-per-chained-call */
const Schema = use('Schema')

class PartySchema extends Schema {
  up() {
    this.create('parties', (table) => {
      table.increments()
      table.string('title')
      table.string('status').notNullable()
      table.integer('admin_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('address_id').unsigned().references('id').inTable('address').notNullable()
      table.string('primary_picture')
      table.string('telegram_url')
      table.string('type').notNullable()
      table.string('description')
      table.boolean('private').notNullable()
      table.dateTime('startTime').notNullable()
      table.dateTime('endTime')
      table.timestamps()
    })
  }

  down() {
    this.drop('parties')
  }
}

module.exports = PartySchema
