const User = use('App/Models/User')

class LoginController {

  /**
   * login user
   * POST /auth/login
   */
  async login({ request, auth }) {
    const { email, password } = request.all()

    return auth.withRefreshToken().attempt(email, password, true)
  }

  /**
   * login user using Oauth
   * POST /auth/social
   */
  async social({ auth, request }) {
    const fields = request.all()

    const existingUser = await User.findBy({ email: fields.email })

    if (existingUser) {
      return auth.withRefreshToken().generate(existingUser, true)
    }

    const createdUser = await User.createFromSocial(fields)

    return auth.withRefreshToken().generate(createdUser, true)
  }
}

module.exports = LoginController
