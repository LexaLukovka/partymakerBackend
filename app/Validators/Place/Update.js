module.exports = class Update {
  get rules() {
    return {
      title: 'string',
      address: 'object',
      description: 'string',
    }
  }

  get validateAll() {
    return true
  }
}
