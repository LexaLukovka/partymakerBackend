const autoBind = require('auto-bind')
const randomString = require('randomstring')
const User = use('App/Models/User')
const Token = use('App/Models/Token')
const AuthRepository = use('App/Repositories/Auth')
const ActivationMail = use('App/Services/ActivationMail')

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
    const token = randomString.generate()
    await user.tokens().create({ type: 'email', token })
    ActivationMail.send({ user, token })

    return auth.withRefreshToken().generate(user, true)
  }

  /**
   * activate user
   * GET /auth/activate/:hash
   */
  async activate({ request, auth, params, response }) {
    const token = await Token.findByOrFail({ token: params.hash })
    await token.user().update({ active: true })
    await token.delete()

    return response.accepted()
  }

  /**
   * login user using Oauth
   * POST /auth/social
   */
  async social({ auth, request }) {
    const req = request.all()
    const { email, provider_id } = req
    const existingUser = await User.findBy({ email })

    if (existingUser) return auth.withRefreshToken().generate(existingUser, true)

    const createdUser = await this.auth.create({ ...req, active: true })

    return auth.withRefreshToken().generate(createdUser, true)
  }


  /**
   * forgot password
   * POST /auth/forgotPassword
   */
  async forgotPassword({ auth, request, response }) {
    this.auth.forgotPassword(request.all())

    const req = request.all()
    const user = await User.findBy({ email: req.email })

    if (!user) return response.notFound(user)

    const token = auth.newRefreshToken()
    ActivationMail.sendForgotPassword({ email: req.email, token })

    return response.accepted()
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
