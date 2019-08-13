const Place = use('App/Models/Place')

module.exports = class Update {

  async authorize() {
    const { auth, response, params } = this.ctx
    this.ctx.place = await Place.findOrFail(params.id)
    const isEditable = auth.user.cannot('edit', this.ctx.place)
    if (!isEditable) return response.forbidden()
    return true
  }

  get rules() {
    return {
      title: 'string',
      address: 'string',
    }
  }

  get validateAll() {
    return true
  }
}
