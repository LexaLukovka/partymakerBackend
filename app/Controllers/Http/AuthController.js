const User = use('App/Models/User')
const Hash = use('Hash')

class AuthController {

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
    const user = await User.create(request.all())
    return auth.withRefreshToken().generate(user, true)
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
        avatar_url: req.avatar_url,
        instagram: req.instagram,
        telegram: req.telegram,
        password: await updatePassword(),
      })

    return auth.withRefreshToken()
      .generate(await User.find(auth.user.id), true)
  }

  /**
   * login user using facebook data
   * POST /auth/login/facebook
   */
  async facebook({ auth, request }) {
    const req = request.all()

    const userDetails = {
      name: req.name,
      email: req.email,
      provider_token: req.accessToken,
      provider: 'facebook',
      avatar_url: req.pictures.data.url,
    }

    const user = await User.findOrCreate({ email: userDetails.email }, userDetails)
    return auth.withRefreshToken().generate(user, true)
  }

  /**
   * login user using google data
   * POST /auth/login/google
   */
  async google({ auth, request }) {
    const req = request.all()

    const userDetails = {
      name: req.profileObj.name,
      email: req.profileObj.email,
      provider_token: req.accessToken,
      provider: 'google',
      avatar_url: req.profileObj.imageUrl,
    }

    const user = await User.findOrCreate({ email: userDetails.email }, userDetails)
    return auth.withRefreshToken().generate(user, true)
  }
}

module.exports = AuthController
