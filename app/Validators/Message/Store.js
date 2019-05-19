const Message = use('App/Models/Message')

module.exports = class Store {

  async authorize() {
    const { auth, response } = this.ctx
    if (auth.user.cannot('create', Message)) {
      response.forbidden()

      return false
    }

    return true
  }

  get rules() {
    return {
      text: 'string',
      asset_id: 'exists:assets,id',
    }
  }

  get validateAll() {
    return true
  }

  get sanitizationRules() {
    return {
      date: 'to_null',
      time: 'to_null',
    }
  }

}
