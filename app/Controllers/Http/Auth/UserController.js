class UpdateController {

  /**
   * get current user model
   * GET /auth/user
   */
  async show({ auth }) {
    return auth.user
  }


  /**
   * get current user model
   * PUT /auth/user
   */
  async update({ auth, request }) {
    const fields = request.all()
    await auth.user.update(fields)

    return auth.user
  }
}

module.exports = UpdateController
