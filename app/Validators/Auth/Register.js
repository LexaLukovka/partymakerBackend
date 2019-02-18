module.exports = class Register {

  get rules() {
    return {
      name: 'required',
      email: 'required|email|unique:users,email',
      password: 'required'
    }
  }

  get messages() {
    return {
      'email.unique': 'Пользователь с такой почтой уже есть'
    }
  }

  get validateAll() {
    return true
  }
}
