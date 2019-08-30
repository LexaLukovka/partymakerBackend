const Room = use('App/Models/Room')

module.exports = class Update {

  async authorize() {
    const { auth, response, params } = this.ctx
    this.ctx.room = await Room.findOrFail(params.id)
    const isEditable = auth.user.can('edit', this.ctx.room)
    if (!isEditable) return response.forbidden()
    return true
  }

  get rules() {
    return {
      title: 'string|max:30',
      date: 'date',
      place_id: 'exists:places,id'
    }
  }

  get validateAll() {
    return true
  }
}
