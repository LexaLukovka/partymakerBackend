const Place = use('App/Models/Place')

module.exports = class Update {

  async authorize() {
    const { auth, response, params } = this.ctx
    this.ctx.place = await Place.findOrFail(params.id)
    const isEditable = auth.user.can('edit', this.ctx.place)
    if (!isEditable) return response.forbidden()
    return true
  }

  get rules() {
    return {
      title: 'required|string',
      picture_url: 'required|string',
      price: 'required|string',
      phone: 'required|string',
      map_url: 'required|string',
      website_url: 'required|string',
      working_hours: 'required|string',
    }
  }

  get validateAll() {
    return true
  }
}
