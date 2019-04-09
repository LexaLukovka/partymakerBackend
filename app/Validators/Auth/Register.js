module.exports = class Register {

  get rules() {
    return {
      name: 'required',
      email: 'required|email|unique:users,email',
      phone: 'required|unique:users,phone',
      password: 'required'
    }
  }

  get messages() {
    return {
      'email.unique': 'Пользователь с такой почтой уже есть',
      'phone.unique': 'Пользователь с таким номером телефона уже есть'
    }
  }

  get validateAll() {
    return true
  }
}
