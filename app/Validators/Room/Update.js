const Room = use('App/Models/Room')

module.exports = class Update {

  async authorize() {
    const { auth, response, params } = this.ctx
    this.ctx.room = await Room.findOrFail(params.id)
    const canEdit = await this.ctx.room.contains(auth.user)
    if (!canEdit) return response.forbidden()
    return true
  }

  get rules() {
    return {
      title: 'string',
      date: 'date',
      place_id: 'exists:places,id'
    }
  }

  get validateAll() {
    return true
  }
}
