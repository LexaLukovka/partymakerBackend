/* eslint-disable quote-props */
module.exports = class Store {
  get rules() {
    return {
      name: 'required|string',
      rating: 'required|double',
      types: 'required|array',
      address: 'required|object',
      user_ratings_total: 'required|integer',
    }
  }

  get messages() {
    return {
      'name.required': 'Имя места обязательно для заполнения',
      'rating.required': 'Рейтинг обязательный для заполнения',
      'types.required': 'Типы обязательно для заполнение',
      'address.required': 'Адресс обязательный для заполнения',
      'user_ratings_total.required': 'Количество людей обязательный для заполнения',
    }
  }

  get validateAll() {
    return true
  }
}
