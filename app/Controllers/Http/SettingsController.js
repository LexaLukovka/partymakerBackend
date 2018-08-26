const User = use('App/Models/User')

class SettingsController {
  // noinspection JSUnusedGlobalSymbols
  async update({ request, auth }) {
    await User.query()
      .where('id', auth.user.id)
      .update(request.all())

    const user = await User.find(auth.user.id)

    return auth.withRefreshToken()
      .generate(user, true)
  }
}

module.exports = SettingsController
