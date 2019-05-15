module.exports = class UpdateAccount {

  get rules() {
    return {
      facebook: 'string',
      instagram: 'string',
    }
  }

  get validateAll() {
    return true
  }
}
