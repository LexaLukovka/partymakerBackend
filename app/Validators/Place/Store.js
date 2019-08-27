const Place = use('App/Models/Place')

module.exports = class Store {

  async authorize() {
    const { auth, response } = this.ctx
    if (auth.user.cannot('create', Place)) {
      return response.forbidden()
    }

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
