const User = use('App/Models/User')

module.exports = class Destroy {

  async authorize() {
    this.ctx.user = await User.findOrFail(this.ctx.params.id)
    const { auth, response, user } = this.ctx
    const isRemovable = auth.user.can('delete', user)
    if (!isRemovable) return response.forbidden()
    return true
  }

}
