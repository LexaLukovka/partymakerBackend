const User = use('App/Models/User')

class UserRepository {

  userData(user) {
    return {
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar_url: user.avatar_url,
      instagram: user.instagram,
      telegram: user.telegram,
      password: user.password,
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

    return User.find(model.id)
  }
}

module.exports = UserRepository
