const User = use('App/Models/User')
const Hash = use('Hash')

class AuthController {

  async login({ request, auth }) {

    const { email, password } = request.all()

    return auth.withRefreshToken().attempt(email, password, true)
  }

  async register({ request, auth }) {

    const { name, email, password, phone } = request.all()

    const user = await new User()
    user.name = name
    user.email = email
    user.phone = phone
    user.password = password
    await user.save()
    return auth.withRefreshToken().generate(user, true)

  }

  async user({ auth }) {
    return auth.user
  }

  // noinspection JSUnusedGlobalSymbols
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

  async facebook({ auth, request }) {
    const req = request.all()

    const userDetails = {
      name: req.name,
      email: req.email,
      provider_token: req.accessToken,
      provider: 'facebook',
      avatar_url: req.picture.data.url,
    }

    const user = await User.findOrCreate({ email: userDetails.email }, userDetails)
    return auth.withRefreshToken().generate(user, true)
  }

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
