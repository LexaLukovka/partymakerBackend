/* eslint-disable quote-props */
module.exports = class Create {
  get rules() {
    return {
      title: 'string|max:30',
      start_time: 'date',
      description: 'string',
      place_id: 'integer',
      event_id: 'integer',
      address: 'object',
    }
  }

  // noinspection JSUnusedGlobalSymbols
  get validateAll() {
    return true
  }
}
