const Message = use('App/Models/Message')

module.exports = class Store {

  async authorize() {
    const { auth, response } = this.ctx
    const isCreatable = auth.user.can('create', Message)
    if (!isCreatable) return response.forbidden()
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
