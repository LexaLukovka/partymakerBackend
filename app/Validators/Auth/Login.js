module.exports = class Login {

  get rules() {
    return {
      email: 'required|email ',
      password: 'required',
    }
  }

  get validateAll() {
    return true
  }
}

