module.exports = class Social {

  get rules() {
    return {
      name: 'required',
      email: 'required|email',
      avatar_url: 'string',
      phone: 'string',
    }
  }

  get validateAll() {
    return true
  }
}
