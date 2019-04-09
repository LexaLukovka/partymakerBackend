module.exports = class RestorePassword {

  get rules() {
    return {
      password: 'required',
      password_repeat: 'required|same:password',
    }
  }

  get validateAll() {
    return true
  }
}

