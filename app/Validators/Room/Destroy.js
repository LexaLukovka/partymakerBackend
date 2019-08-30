const Room = use('App/Models/Room')

module.exports = class Destroy {

  async authorize() {
    this.ctx.room = await Room.findOrFail(this.ctx.params.id)
    const { auth, response, room } = this.ctx
    const isRemovable = room.contains(auth.user)
    if (!isRemovable) return response.forbidden()
    return true
  }

}
