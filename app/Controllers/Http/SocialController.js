const User = use('App/Models/User')

class SocialController {

  async facebook({ auth, request }) {
    const req = request.all()

    // user details to be saved
    const userDetails = {
      name: req.name,
      email: req.email,
      token: req.accessToken,
      provider: 'facebook',
      avatar_url: req.picture.data.url,
    }

    // search for existing user
    const user = await User.findOrCreate({ email: userDetails.email }, userDetails)
    return auth.withRefreshToken().generate(user, true)
  }

  async google({ auth, request }) {
    const req = request.all()
    // user details to be saved
    const userDetails = {
      name: req.profileObj.name,
      email: req.profileObj.email,
      token: req.accessToken,
      provider: 'google',
      avatar_url: req.profileObj.imageUrl
    }

    // search for existing user
    const user = await User.findOrCreate({ email: userDetails.email }, userDetails)
    return auth.withRefreshToken().generate(user, true)
  }
}

module.exports = SocialController
