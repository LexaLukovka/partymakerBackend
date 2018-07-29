/* eslint-disable quote-props */
module.exports = class Store {
  get rules() {
    return {
      title: 'required|string|max:30',
      type: 'required|string',
      private: 'required|boolean',
      startTime: `required|date|after:${new Date()}`,
      endTime: `date|after:${new Date()}`,
      description: 'required|string|min:10',
      people_max: 'required|integer',
      people_min: 'required|integer',
      pictures: 'array',
      district: 'string',
      address: 'required|object',
    }
  }

  // noinspection JSUnusedGlobalSymbols
  get messages() {
    return {
      'title': 'Пользователь с таким телефоном уже есть',
      'email.unique': 'Пользователь с такой почтой уже есть'
    }
  }

  // noinspection JSUnusedGlobalSymbols
  get validateAll() {
    return true
  }
}
