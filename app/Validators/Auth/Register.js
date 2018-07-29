module.exports = class Register {

  // noinspection JSUnusedGlobalSymbols
  get rules() {
    return {
      name: 'required',
      phone: 'required|unique:users,phone',
      email: 'required|email|unique:users,email',
      password: 'required'
    }
  }

  // noinspection JSUnusedGlobalSymbols
  get messages() {
    return {
      'phone.unique': 'Пользователь с таким телефоном уже есть',
      'email.unique': 'Пользователь с такой почтой уже есть'
    }
  }

  // noinspection JSUnusedGlobalSymbols
  get validateAll() {
    return true
  }
}
