const User = use('App/Models/User')
const Hash = use('Hash')
const AuthRepository = use('App/Repositories/Auth')
const autoBind = require('auto-bind')

class AuthController {

  constructor() {
    autoBind(this)
    this.auth = new AuthRepository()
  }

  /**
   * login user
   * POST /auth/login
   */
  async login({ request, auth }) {
    const { email, password } = request.all()

    return auth.withRefreshToken().attempt(email, password, true)
  }

  /**
   * register user
   * POST /auth/register
   */
  async register({ request, auth }) {
    const user = await this.auth.create(request.all())

    return auth.withRefreshToken().generate(user, true)
  }

  /**
   * login user using Oauth
   * POST /auth/social
   */
  async social({ auth, request }) {
    const req = request.all()
    const { email, provider_id } = req

    const existingUser = await User.findBy({ email, provider_id })

    if (existingUser) {
      return auth.withRefreshToken().generate(existingUser, true)
    }

    const createdUser = await this.auth.create({ ...req, active: true })

    return auth.withRefreshToken().generate(createdUser, true)
  }

  /**
   * get current user model
   * GET /auth/user
   */
  async user({ auth }) {
    return auth.user
  }

  /**
   * update current user
   * PUT /auth/settings
   */
  async settings({ request, auth }) {
    const user = this.auth.edit(request.all(), auth.user)

    return auth.withRefreshToken().generate(user, true)
  }

}

module.exports = AuthController
