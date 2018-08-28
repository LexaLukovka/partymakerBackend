const User = use('App/Models/User')
const Hash = use('Hash')

class SettingsController {
  // noinspection JSUnusedGlobalSymbols
  async update({ request, auth }) {

    const req = request.all()

    const updatePassword = async () => {
      if (!(req.password && req.oldPassword)) return undefined
      const isSame = await Hash.verify(req.oldPassword, auth.user.password)
      return isSame ? req.password : undefined
    }

    await User.query()
      .where('id', auth.user.id)
      .update({
        name: req.name,
        email: req.email,
        phone: req.phone,
        password: await updatePassword()
      })


    return auth.withRefreshToken()
      .generate(await User.find(auth.user.id), true)
  }
}

module.exports = SettingsController
