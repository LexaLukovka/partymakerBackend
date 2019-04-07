const autoBind = require('auto-bind')
const randomString = require('randomstring')
const User = use('App/Models/User')
const Token = use('App/Models/Token')
const ResetToken = use('App/Models/ResetToken')
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
  async activate({ params: { hash }, response }) {
    const token = await Token.findByOrFail({ token: hash })
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
    const { email } = req
    const existingUser = await User.findBy({ email })

    if (existingUser) return auth.withRefreshToken().generate(existingUser, true)

    const createdUser = await this.auth.create({ ...req, active: true })

    return auth.withRefreshToken().generate(createdUser, true)
  }

  /**
   * forgot password
   * POST /auth/forgotPassword
   */
  async forgotPassword({ request, response }) {
    const req = request.all()
    const user = await User.findBy({ email: req.email })

    const token = randomString.generate()
    await user.resetTokens().create({ type: 'email', token })

    ActivationMail.sendForgotPassword({ email: req.email, token })

    return response.accepted()
  }

  /**
   * forgot password
   * POST /auth/restorePassword/:hash
   */
  async restorePassword({ auth, request, params: { hash } }) {
    const { newPassword, repeatPassword } = request.all()

    if (newPassword !== repeatPassword) {
      return { non_field_error: 'Пароли не совпадают' }
    }

    const token = await ResetToken.findBy({ token: hash })
    const user = await User.findBy({ id: token.user_id })
    const updateUser = await this.auth.restorePassword(newPassword, user)

    return auth.withRefreshToken().generate(updateUser, true)
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
