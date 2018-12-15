/* eslint-disable quote-props */
module.exports = class Store {
  get rules() {
    return {
      title: 'required|string',
      address: 'required|object',
      description: 'required|string',
    }
  }

  get messages() {
    return {
      'title.required': 'Имя места обязательно для заполнения',
      'address.required': 'Адресс обязательный для заполнения',
      'description.required': 'Описание обязательно для заполнение',
    }
  }

  get validateAll() {
    return true
  }
}
