const randomString = require('randomstring')

const User = use('App/Models/User')
const ResetToken = use('App/Models/ResetToken')
const PasswordResetMail = use('App/Services/PasswordResetMail')
const Hash = use('Hash')

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
    return response.accepted(`Ссслыка для восстановления пароля выслана на ${fields.email}`)
  }

  /**
   * reset password
   * POST /auth/password/reset/:hash
   */
  async reset({ auth, request, response, params: { hash } }) {
    const { password } = request.all()
    const token = await ResetToken.findBy({ token: hash })
    if (!token) return response.notFound('Токен для восстановления пароля не найден!')
    await User.query()
      .where('id', token.user_id)
      .update({ password: await Hash.make(password) })
    const updatedUser = await User.find(token.user_id)
    return auth.withRefreshToken().generate(updatedUser, true)
  }

  /**
   * update password
   * PUT /auth/password/update
   */

  async update({ auth, request, response }) {
    const { password, password_new } = request.all()
    const isPasswordValid = await Hash.verify(password, auth.user.password)
    if (!isPasswordValid) {
      return response.forbidden('Старый пароль не верный!')
    }
    auth.user.merge({ password: password_new })
    await auth.user.save()
    return auth.withRefreshToken().generate(auth.user, true)
  }

}

module.exports = PasswordController
