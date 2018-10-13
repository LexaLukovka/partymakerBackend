/* eslint-disable quote-props */
module.exports = class Create {
  get rules() {
    return {
      title: 'required|string|max:30',
      date: 'required|date',
      description: 'required|string',
      place_id: 'integer',
      event_id: 'integer',
      district: 'string',
      address: 'object',
      invite_url: 'string',
    }
  }

  // noinspection JSUnusedGlobalSymbols
  get validateAll() {
    return true
  }
}
