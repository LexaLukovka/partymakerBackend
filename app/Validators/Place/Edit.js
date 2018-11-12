/* eslint-disable quote-props */
module.exports = class Create {
  get rules() {
    return {
      title: 'string',
      address: 'object',
      working_day: 'string',
      working_hours: 'string',
      description: 'string',
    }
  }

  // noinspection JSUnusedGlobalSymbols
  get validateAll() {
    return true
  }
}
