const User = use('App/Models/User')

class SettingsController {
  // noinspection JSUnusedGlobalSymbols
  async update({ request, auth }) {
    await User.query()
      .where('id', auth.user.id)
      .update(request.all())

    return {
      status: 200,
      success: true
    }
  }
}

module.exports = SettingsController
