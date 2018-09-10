/* eslint-disable quote-props */
module.exports = class Store {
  get rules() {
    return {
      title: 'required|string|max:30',
      start_time: 'required|string',
      description: 'required|string',
      place_id: 'integer',
      event_id: 'integer',
      district: 'string',
      address: 'object',
    }
  }

  // noinspection JSUnusedGlobalSymbols
  get messages() {
    return {
      'title': 'Тусовка с таким названием уже есть',
      'email.unique': 'Пользователь с такой почтой уже есть'
    }
  }

  // noinspection JSUnusedGlobalSymbols
  get validateAll() {
    return true
  }
}
