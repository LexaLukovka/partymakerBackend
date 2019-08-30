const Room = use('App/Models/Room')

module.exports = class Store {

  async authorize() {
    const { auth, response } = this.ctx
    const isCreatable = auth.user.can('create', Room)
    if (!isCreatable) return response.forbidden()
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
