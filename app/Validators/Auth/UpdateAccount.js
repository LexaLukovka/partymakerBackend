module.exports = class UpdateAccount {

  get rules() {
    return {
      facebook: 'string|unique:accounts,facebook',
      instagram: 'string|unique:accounts,instagram',
    }
  }

  get messages() {
    return {
      'facebook.unique': 'Пользователь с таким именем уже есть',
      'instagram.unique': 'Пользователь с таким именем уже есть'
    }
  }

  get validateAll() {
    return true
  }
}
