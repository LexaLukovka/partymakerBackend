/* eslint-disable quote-props */
module.exports = class Update {
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
