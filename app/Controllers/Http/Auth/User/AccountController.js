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
    const account = await auth.user.account().fetch()

    if (!account) {
      await auth.user.account().create(fields)
    } else {
      await auth.user.account().update(fields)
    }

    return auth.user.account().fetch()
  }
}

module.exports = AccountController
