module.exports = class Update {
  get rules() {
    return {
      headline: 'string',
      preposition: 'string',
      title: 'string',
      address: 'string',
      datetime: 'string',
      background_url: 'string',
    }
  }

  get validateAll() {
    return true
  }
}
