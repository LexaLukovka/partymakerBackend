const User = use('App/Models/User')

class UserController {
  async index({ request, params }) {
    const user = await User.find(params.id)

    return { user }
  }
}

module.exports = UserController
