const User = use('App/Models/User')

class UserController {

  /**
   * get current user model
   * GET /auth/user
   */
  async show({ auth }) {
    return auth.user
  }


  /**
   * get current user model
   * PUT /auth/user
   */
  async update({ auth, request }) {
    const fields = request.all()

    const user = await User.find(auth.user.id)
    user.merge(fields)
    await user.save()

    return auth.withRefreshToken().generate(user, true)
  }
}

module.exports = UserController
