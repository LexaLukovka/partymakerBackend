const User = use('App/Models/User')

module.exports = class Update {

  async authorize() {
    const { auth, response, params } = this.ctx
    this.ctx.user = await User.findOrFail(params.id)
    const isEditable = auth.user.can('edit', this.ctx.user)
    if (!isEditable) return response.forbidden()
    return true
  }

  get rules() {
    return {
      name: 'string',
      email: 'string|email|unique:users,email',
      phone: 'string|unique:users,phone',
      password: 'string',
      avatar_url: 'string',
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
