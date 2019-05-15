module.exports = class RestorePassword {

  get rules() {
    return {
      password: 'required',
      password_new: 'required',
      password_repeat: 'required|same:new_password',
    }
  }

  get validateAll() {
    return true
  }
}

