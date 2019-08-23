const Entertainment = use('App/Models/Entertainment')

module.exports = class Store {

  async authorize() {
    const { auth, response } = this.ctx
    if (auth.user.cannot('create', Entertainment)) {
      return response.forbidden()
    }

    return true
  }

  get rules() {
    return {
      title: 'required|string',
      address: 'required|string',
    }
  }

  get validateAll() {
    return true
  }
}
