const Room = use('App/Models/Room')

module.exports = class Index {

  async authorize() {
    const { auth, response } = this.ctx
    const canViewAllRooms = auth.user.can('viewAll', Room)
    if (!canViewAllRooms) return response.forbidden()
    return true
  }

}
