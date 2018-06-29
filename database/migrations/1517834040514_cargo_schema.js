/* eslint-disable newline-per-chained-call */
const Schema = use('Schema')

class CargoSchema extends Schema {
  up() {
    this.create('cargos', (table) => {
      table.increments()
      table.string('title').notNullable()
      table.string('primary_picture')
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable()
      table.integer('from_id').unsigned().references('id').inTable('locations').notNullable()
      table.integer('to_id').unsigned().references('id').inTable('locations').notNullable()
      table.double('payment')
      table.double('volume')
      table.text('description')
      table.string('dimensions')
      table.double('weight')
      table.string('transport_type')
      table.string('distance')
      table.string('crosses_border')
      table.timestamps()

    })
  }

  down() {
    this.drop('cargos')
  }
}

module.exports = CargoSchema
