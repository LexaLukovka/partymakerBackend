const Room = use('App/Models/Room')

module.exports = class Update {

  async authorize() {
    const { auth, response, params } = this.ctx
    this.ctx.room = await Room.findOrFail(params.rooms_id)
    const can = await this.ctx.room.contains(auth.user)
    if (!can) return response.forbidden()
    return true
  }

  get rules() {
    return {
      date: 'date|required',
      time: 'string',
      guests: 'number',
      phone: 'string|required',
    }
  }

  get validateAll() {
    return true
  }
}
