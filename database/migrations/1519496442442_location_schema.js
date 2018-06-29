const Schema = use('Schema')

class LocationSchema extends Schema {
  up() {
    this.create('locations', (table) => {
      table.increments()
      table.string('address').notNullable()
      table.double('lng').notNullable()
      table.double('lat').notNullable()
      table.string('placeId').notNullable()
      table.dateTime('date')
      table.timestamp('time')
      table.timestamps()
    })
  }

  // noinspection JSUnusedGlobalSymbols
  down() {
    this.drop('locations')
  }
}

module.exports = LocationSchema
