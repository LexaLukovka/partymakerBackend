const Room = use('App/Models/Room')

module.exports = class Store {

  async authorize() {
    const { request, auth, response } = this.ctx
    const { room_id } = request.all()
    this.ctx.room = await Room.findOrFail(room_id)
    const can = await this.ctx.room.contains(auth.user)
    if (!can) return response.forbidden()

    return true
  }

  get rules() {
    return {
      date: 'date|required',
      time: 'string',
      guests: 'number|required',
      phone: 'string|required',
    }
  }

  get validateAll() {
    return true
  }
}
