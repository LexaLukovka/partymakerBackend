/* eslint-disable quote-props */
module.exports = class Edit {
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
