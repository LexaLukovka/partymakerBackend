/* eslint-disable quote-props */
module.exports = class Create {
  get rules() {
    return {
      members: 'required|array',
    }
  }

  // noinspection JSUnusedGlobalSymbols
  get validateAll() {
    return true
  }
}
