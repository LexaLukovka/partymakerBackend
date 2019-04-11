const randomString = require('randomstring')
const Token = use('App/Models/Token')
const ActivationMail = use('App/Services/ActivationMail')
const User = use('App/Models/User')

class RegisterController {

  /**
   * register user
   * POST /auth/register
   */
  async register({ request, auth }) {
    const fields = request.all()
    const user = await User.create(fields)
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
    await token.user().update({ is_active: true })
    await token.delete()

    return response.accepted('User account has been activated!')
  }

}

module.exports = RegisterController
