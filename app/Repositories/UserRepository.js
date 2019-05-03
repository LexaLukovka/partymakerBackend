const User = use('App/Models/User')

class UserRepository {

  paginate(params) {
    return User.query().paginate(params.page, params.limit)
  }

  create(fields) {
    return User.create(fields)
  }

  async edit(model, fields) {
    model.merge(fields)
    await model.save()

    return User.find(model.id)
  }
}

module.exports = UserRepository
