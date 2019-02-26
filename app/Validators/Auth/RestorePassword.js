module.exports = class RestorePassword {

  get rules() {
    return {
      newPassword: 'required',
      repeatPassword: 'required',
    }
  }

  get validateAll() {
    return true
  }
}

