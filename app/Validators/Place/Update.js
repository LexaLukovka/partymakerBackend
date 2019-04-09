module.exports = class Update {
  get rules() {
    return {
      title: 'string',
      address: 'string',
    }
  }

  get validateAll() {
    return true
  }
}
