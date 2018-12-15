const User = use('App/Models/User')
const UserRepository = use('App/Repositories/User')
const autoBind = require('auto-bind')

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   */
  constructor() {
    autoBind(this)
    this.user = new UserRepository()
  }

  async index({ request }) {
    const { page, limit } = request.all()
    return this.user.paginate({ page: page || 1, limit: limit || 10 })
  }

  /**
   * Create/save a new user.
   * POST users
   */
  async store({ request, auth, response }) {
    if (auth.user.cannot('create', User)) {
      return response.forbidden()
    }
    return this.user.create(request.all())
  }

  /**
   * Display a single user.
   * GET users/:id
   */
  async show({ params }) {
    return User.find(params.id)
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   */
  async update({ params, request, auth, response }) {
    const req = request.all()

    let user = await User.find(params.id)
    if (!user) return response.notFound(user)
    if (auth.user.cannot('edit', user)) return response.forbidden()

    await this.user.edit(user, req)

    user = await User.find(params.id)

    return auth.withRefreshToken()
      .generate(user, true)
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   */
  async destroy({ params, auth, response }) {

    const user = await User.find(params.id)

    if (auth.user.cannot('delete', user)) {
      return response.forbidden()
    }
    await user.delete()

    return user
  }
}

module.exports = UserController
