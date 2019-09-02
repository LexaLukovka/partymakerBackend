const Message = use('App/Models/Message')

module.exports = class Update {


  async authorize() {
    const { auth, response, params } = this.ctx
    this.ctx.message = await Message.findOrFail(params.id)
    const canEdit = await auth.user.can('edit', this.ctx.message)
    if (!canEdit) return response.forbidden()
    return true
  }

  get rules() {
    return {
      text: 'required|string',
      asset_id: 'exists:assets,id',
    }
  }

  get validateAll() {
    return true
  }
}
