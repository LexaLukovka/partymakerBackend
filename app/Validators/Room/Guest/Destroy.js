const Message = use('App/Models/Message')

module.exports = class Destroy {

  async authorize() {
    this.ctx.message = await Message.findOrFail(this.ctx.params.id)
    const { auth, response, message } = this.ctx
    const isRemovable = auth.user.can('delete', message)
    if (!isRemovable) return response.forbidden()
    return true
  }

}
