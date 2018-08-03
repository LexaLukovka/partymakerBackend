const User = use('App/Models/User')

class AuthController {

  async login({ request, auth }) {

    const { email, password } = request.all()

    return auth.withRefreshToken().attempt(email, password, true)
  }

  async register({ request, auth }) {

    const { name, email, password, phone } = request.all()

    const user = await new User()
    user.name = name
    user.email = email
    user.phone = phone
    user.password = password
    await user.save()
    return auth.withRefreshToken().generate(user, true)

  }

  async user({ auth }) {

    return auth.getUser()
  }

}

module.exports = AuthController
