const User = use('App/Models/User')
const UserRepository = use('App/Repositories/UserRepository')
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

    const user = this.user.create(request.all())

    return response.created(user)
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
    const fields = request.all()

    const user = await User.findOrFail(params.id)

    if (auth.user.cannot('edit', user)) {
      return response.forbidden()
    }

    await this.user.edit(user, fields)

    const tokens = await auth
      .withRefreshToken()
      .generate(await User.find(params.id), true)

    return response.updated(tokens)
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   */
  async destroy({ params, auth, response }) {

    const user = await User.findOrFail(params.id)

    if (auth.user.cannot('delete', user)) {
      return response.forbidden()
    }
    await user.delete()

    return response.deleted()
  }
}

module.exports = UserController
