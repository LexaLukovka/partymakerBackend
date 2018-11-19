/* eslint-disable quote-props */
module.exports = class Edit {
  get rules() {
    return {
      title: 'string',
      description: 'string',
    }
  }

  // noinspection JSUnusedGlobalSymbols
  get validateAll() {
    return true
  }
}
