class AccountController {

  /**
   * update current user
   * GET /auth/user/account
   */
  async show({ auth }) {
    return auth.user.account().fetch()
  }

  /**
   * update current user
   * PUT /auth/user/account
   */
  async update({ request, auth }) {
    const fields = request.all()

    await auth.user.account().update(fields)

    return auth.user.account().fetch()
  }
}

module.exports = AccountController
