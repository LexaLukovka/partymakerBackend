const User = use('App/Models/User')

class UserRepository {

  userData(user) {
    return {
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
      avatar_url: user.avatar_url,
      provider_id: user.provider_id,
      provider: user.provider,
      provider_token: user.provider_token,
    }

  }

  paginate(params) {
    return User.query().paginate(params.page, params.limit)
  }

  create(user) {
    return User.create(this.userData(user))
  }

  async edit(model, user) {
    model.merge(this.userData(user))
    await model.save()

    return model
  }
}

module.exports = UserRepository
