module.exports = class Edit {


  get rules() {
    return {
      name: 'string',
      email: 'string|email|unique:users,email',
      phone: 'string|unique:users,phone',
      password: 'string',
      avatar_url: 'string',
      provider_id: 'integer',
      provider: 'in:google,facebook',
      provider_token: 'string',
    }
  }


  get messages() {
    return {
      'email.email': 'Неправильный формат почты',
      'email.unique': 'Пользователь с такой почтой уже есть',
      'phone.unique': 'Пользователь с таким телефоном уже есть',
      'avatar_url.string': 'фото пользователя должно быть в виде сслыки',
    }
  }


  get validateAll() {
    return true
  }
}
