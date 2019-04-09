const User = use('App/Models/User')
const Hash = use('Hash')

class AuthRepository {

  async _updatePassword({ password, oldPassword, passwordFromDB }) {
    if (!(password && oldPassword)) return undefined
    const isSame = await Hash.verify(oldPassword, passwordFromDB)
    return isSame ? password : undefined
  }

  _userData(request) {
    return {
      name: request.name,
      email: request.email,
      phone: request.phone,
      avatar_url: request.avatar_url,
      password: request.password,
      is_active: request.is_active,
    }
  }

  create(request) {
    return User.create(this._userData(request))
  }

  async edit(request, user) {

    const password = await this._updatePassword({
      password: request.password,
      oldPassword: request.oldPassword,
      passwordFromDB: user.password,
    })

    return User.query()
      .where('id', user.id)
      .update({ ...this._userData(request), password })
  }

  async resetPassword(password, user) {

    await User.query()
      .where('id', user.id)
      .update({ password })

    // noinspection UnnecessaryLocalVariableJS
    const updateUser = await User.findBy({ id: user.id })

    return updateUser
  }
}

module.exports = AuthRepository
