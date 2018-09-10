'use strict'

const Env = use('Env')
const Hash = use('Hash')
const Model = use('Model')

class User extends Model {
  static boot() {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */

  getAvatarUrl(url) {

    if (!url) return null
    if (url.includes('//')) return url
    return `${Env.get('APP_URL')}${url}`
  }

  static get hidden() {
    return ['created_at', 'updated_at', 'password']
  }

  tokens() {
    return this.hasMany('App/Models/Token')
  }

  groups() {
    return this.hasMany('App/Models/Group', 'id', 'admin_id')
  }
}

module.exports = User
