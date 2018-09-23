/* eslint-disable quote-props */
module.exports = class Create {
  get rules() {
    return {
      title: 'string',
      address: 'object',
      working_hours: 'string',
      price: 'string',
      description: 'string',
    }
  }

  // noinspection JSUnusedGlobalSymbols
  get validateAll() {
    return true
  }
}
