module.exports = class UpdateUser {

  get rules() {
    return {
      name: 'required',
      phone: 'required|unique:users,phone',
    }
  }

  get messages() {
    return {
      'phone.unique': 'Пользователь с таким номером телефона уже есть'
    }
  }

  get validateAll() {
    return true
  }
}
