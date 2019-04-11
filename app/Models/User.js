/* eslint-disable no-undef */
const Env = use('Env')
const Hash = use('Hash')
const Model = use('Model')

class User extends Model {

  static get hidden() {
    return [
      'pivot',
      'password',
    ]
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


  static async createFromSocial(fields) {
    const createdUser = await this.create({
      name: fields.name,
      email: fields.email,
      avatar_url: fields.avatar_url,
      phone: fields.phone,
      is_active: true
    })

    await createdUser.socials().create({
      provider: fields.provider,
      provider_id: fields.provider_id
    })


    return createdUser
  }

  tokens() {
    return this.hasMany('App/Models/Token')
  }

  resetTokens() {
    return this.hasMany('App/Models/ResetToken')
  }

  socials() {
    return this.hasMany('App/Models/Social')
  }

  account() {
    return this.hasMany('App/Models/Account')
  }
}

module.exports = User
