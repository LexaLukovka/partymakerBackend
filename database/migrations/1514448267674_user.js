const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', table => {
      table.increments()
      table.string('name', 254).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('phone', 60).nullable().unique()
      table.string('password', 60).notNullable()
      table.string('avatar_url', 254)
      table.string('provider_id').nullable()
      table.string('provider').nullable()
      table.string('token').nullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
