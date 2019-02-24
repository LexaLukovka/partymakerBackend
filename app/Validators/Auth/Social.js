module.exports = class Social {

  get rules() {
    return {
      name: 'required',
      email: 'required|email',
      provider_id: 'required',
      provider: 'required|string',
      avatar_url: 'string',
      phone: 'string',
    }
  }

  get messages() {
    return {
      'email.notEmpty': 'Пользователь с таким email адресом уже зарегистрирован c использованием пароля'
    }
  }

  get validateAll() {
    return true
  }
}
