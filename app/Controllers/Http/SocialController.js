'use strict'

const User = use('App/Models/User')

class SocialController {
  async redirect({ ally, params }) {
    await ally.driver(params.provider).redirect()
  }

  async callback({ ally, auth, params }) {
    try {
      const fbUser = await ally.driver(params.provider)
        .getUser()

      // user details to be saved
      const userDetails = {
        name: fbUser.getName(),
        email: fbUser.getEmail(),
        token: fbUser.getAccessToken(),
        provider: params.provider,
        avatar_url: fbUser.getAvatar()
      }

      // search for existing user
      const whereClause = {
        email: fbUser.getEmail(),
      }

      const user = await User.findOrCreate(whereClause, userDetails)
      return auth.withRefreshToken().generate(user, true)
    } catch (error) {
      console.error(error)
      return 'Unable to authenticate. Try again later'
    }
  }
}

module.exports = SocialController
