/* eslint-disable quote-props */
module.exports = class Store {
  get rules() {
    return {
      title: 'required|string|max:30',
      type: 'required|string',
      private_party: 'required|boolean',
      start_time: 'required|string',
      // startTime: `required|date|after:${new Date()}`,
      end_time: `date|after:${new Date()}`,
      description: 'required|string',
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
      'title': 'Тусовка с таким названием уже есть',
      'email.unique': 'Пользователь с такой почтой уже есть'
    }
  }

  // noinspection JSUnusedGlobalSymbols
  get validateAll() {
    return true
  }
}
