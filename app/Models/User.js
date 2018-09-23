/* eslint-disable no-undef */
const Env = use('Env')
const Hash = use('Hash')
const Model = use('Model')

class User extends Model {
  static get hidden() {
    return ['created_at', 'updated_at', 'password', 'provider_id', 'provider_token', 'address_id', 'admin_id']
  }

  static get policy() {
    return 'App/Policies/User'
  }

  static boot() {
    super.boot()

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  can(action, model) {
    const bindPolicy = (typeof model === 'function') ? model.policy : model.constructor.policy
    if (!bindPolicy) return false
    const ModelPolicy = use(bindPolicy)
    if (ModelPolicy[action] === undefined) return false
    return ModelPolicy[action](this, model)
  }

  cannot(action, model) {
    return !this.can(action, model)
  }

  getAvatarUrl(url) {
    if (!url) return null
    if (url.includes('//')) return url
    return `${Env.get('APP_URL')}${url}`
  }

  tokens() {
    return this.hasMany('App/Models/Token')
  }

  groups() {
    return this.hasMany('App/Models/Group', 'id', 'admin_id')
  }
}

module.exports = User
