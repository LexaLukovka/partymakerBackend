const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', table => {
      table.increments()
      table.string('name', 254).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('phone', 60).nullable().unique()
      table.string('password', 60).nullable()
      table.string('avatar_url', 254)
      table.bool('is_active').default(false)
      table.bool('is_superadmin').default(false)
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
