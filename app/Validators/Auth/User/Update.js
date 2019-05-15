module.exports = class UpdateUser {

  get rules() {
    return {
      name: 'string',
      avatar_url: 'string',
      phone: 'string',
    }
  }

  get validateAll() {
    return true
  }
}
