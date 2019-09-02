const User = use('App/Models/User')

module.exports = class Create {


  async authorize() {
    const { auth, response } = this.ctx
    const isCreatable = auth.user.can('create', User)
    if (!isCreatable) response.forbidden()
    return true
  }

  get rules() {
    return {
      name: 'required',
      email: 'required|email|unique:users,email',
      phone: 'required|unique:users,phone',
      password: 'required',
      avatar_url: 'string',
      provider_id: 'integer',
      provider: 'in:google,facebook',
      provider_token: 'string',
    }
  }

  get messages() {
    return {
      'name.required': 'Имя и Фамилия пользователя обязательны',
      'email.required': 'Еmail пользователя обязательн',
      'email.email': 'Неправильный формат почты',
      'email.unique': 'Пользователь с такой почтой уже есть',
      'phone.required': 'телефон пользователя обязательн',
      'phone.unique': 'Пользователь с таким телефоном уже есть',
      'password.required': 'Пароль пользователя обязательн',
      'avatar_url.string': 'Фото пользователя должно быть в виде сслыки',
    }
  }

  get validateAll() {
    return true
  }
}
