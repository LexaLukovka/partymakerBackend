'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrdersSchema extends Schema {
  up() {
    this.create('orders', (table) => {
      table.increments()
      table.date('date')
      table.string('time')
      table.string('phone')
      table.integer('guests')
      table.timestamps()
    })
  }

  down() {
    this.drop('orders')
  }
}

module.exports = OrdersSchema
