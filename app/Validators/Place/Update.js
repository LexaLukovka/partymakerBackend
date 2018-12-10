/* eslint-disable quote-props */
module.exports = class Create {
  get rules() {
    return {
      title: 'string',
      address: 'object',
      description: 'string',
    }
  }

  // noinspection JSUnusedGlobalSymbols
  get validateAll() {
    return true
  }
}
