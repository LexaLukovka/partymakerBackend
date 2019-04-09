module.exports = class ForgotPassword {

  get rules() {
    return {
      email: 'required|email|email_exists',
    }
  }

  get messages() {
    return {
      'email.email_exists': 'Пользователь с такой почтой не найден',
    }
  }

  get validateAll() {
    return true
  }
}

