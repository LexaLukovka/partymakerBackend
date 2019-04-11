const randomString = require('randomstring')

const User = use('App/Models/User')
const ResetToken = use('App/Models/ResetToken')
const PasswordResetMail = use('App/Services/PasswordResetMail')

class PasswordController {

  /**
   * forgot password
   * POST /auth/password/forgot
   */
  async forgot({ request, response }) {
    const fields = request.all()
    const user = await User.findBy({ email: fields.email })
    const token = randomString.generate()
    await user.resetTokens().create({ type: 'email', token })
    PasswordResetMail.send({ email: fields.email, token })

    return response.accepted(`Password reset link was sent to ${fields.email}`)
  }

  /**
   * reset password
   * POST /auth/password/reset/:hash
   */
  async reset({ auth, request, response, params: { hash } }) {
    const { password } = request.all()
    const token = await ResetToken.findBy({ token: hash })

    if (!token) {
      return response.notFound('Password reset token was not found!')
    }

    await User.query().where('id', token.user_id).update({ password })

    const updatedUser = await User.find(token.user_id)

    return auth.withRefreshToken().generate(updatedUser, true)
  }

}

module.exports = PasswordController
