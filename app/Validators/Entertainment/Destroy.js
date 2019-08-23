const Entertainment = use('App/Models/Entertainment')

module.exports = class Destroy {

  async authorize() {
    this.ctx.entertainment = await Entertainment.findOrFail(this.ctx.params.id)
    const { auth, response, entertainment } = this.ctx
    const isRemovable = auth.user.cannot('delete', entertainment)
    if (!isRemovable) return response.forbidden()
    return true
  }

}
