const Place = use('App/Models/Place')

module.exports = class Destroy {

  async authorize() {
    this.ctx.place = await Place.findOrFail(this.ctx.params.id)
    const { auth, response, place } = this.ctx
    const isRemovable = auth.user.can('delete', place)
    if (!isRemovable) return response.forbidden()
    return true
  }

}
