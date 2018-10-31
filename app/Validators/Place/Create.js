/* eslint-disable quote-props */
module.exports = class Create {
  get rules() {
    return {
      title: 'required|string',
      address: 'required|object',
      working_day: 'string',
      working_hours: 'string',
      description: 'required|string',
    }
  }

  // noinspection JSUnusedGlobalSymbols
  get messages() {
    return {
      'title.required': 'Имя места обязательно для заполнения',
      'address.required': 'Адресс обязательный для заполнения',
      'description.required': 'Описание обязательно для заполнение',
    }
  }

  // noinspection JSUnusedGlobalSymbols
  get validateAll() {
    return true
  }
}
