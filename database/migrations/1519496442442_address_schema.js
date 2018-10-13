const Schema = use('Schema')

class LocationSchema extends Schema {
  up() {
    this.create('address', (table) => {
      table.increments()
      table.string('address').notNullable()
      table.double('lng').notNullable()
      table.double('lat').notNullable()
      table.string('placeId')
      table.timestamps()
    })
  }

  // noinspection JSUnusedGlobalSymbols
  down() {
    this.drop('address')
  }
}

module.exports = LocationSchema
